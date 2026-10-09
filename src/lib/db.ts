/**
 * Dual-Mode Cloudflare D1 Database Layer
 * Connects to env.DB on Cloudflare Edge; falls back to robust local in-memory store
 * during Next.js build, SSR, or local dev.
 * Source: ORIGINAL_REQUEST.md (R3), survey_integrations.md § 3.2
 */

export interface PreparedStatement {
  bind(...values: any[]): PreparedStatement;
  first<T = any>(): Promise<T | null>;
  all<T = any>(): Promise<{ results: T[] }>;
  run(): Promise<{ success: boolean; meta?: any }>;
}

export interface DatabaseClient {
  prepare(query: string): PreparedStatement;
}

export interface CustomerPayload {
  name: string;
  phone: string;
  village: string;
  mandal?: string;
  district?: string;
  pincode?: string;
}

export interface CartItemPayload {
  productId: string;
  productName: string;
  packSize: '5L' | '2L' | '1L' | '10kg' | '5kg' | '1kg';
  unitPrice: number;
  quantity: number;
}

export interface PendingOrderInput {
  displayOrderId: string;
  razorpayOrderId: string;
  customer: CustomerPayload;
  items: CartItemPayload[];
  totalAmountInr: number;
}

export interface MarkPaidInput {
  displayOrderId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

// In-Memory SQLite Mock Store for Development and Build Runtimes
class InMemoryDatabaseClient implements DatabaseClient {
  private customers: Map<string, any> = new Map();
  private orders: Map<string, any> = new Map();
  private orderItems: Map<string, any[]> = new Map();
  private orderSequence: number = 1000;

  prepare(query: string): PreparedStatement {
    const normalized = query.trim();

    const executeFirst = async <T = any>(values: any[] = []): Promise<T | null> => {
      if (normalized.includes('UPDATE order_sequences') || normalized.includes('order_sequences')) {
        this.orderSequence += 1;
        return {
          current_value: this.orderSequence,
          display_order_id: `#NF-${this.orderSequence}`
        } as any;
      }
      if (normalized.includes('FROM orders WHERE display_order_id =')) {
        const displayId = values[0];
        for (const order of this.orders.values()) {
          if (order.display_order_id === displayId) return order as T;
        }
        return null;
      }
      if (normalized.includes('FROM customers WHERE phone =')) {
        return this.customers.get(values[0]) || null;
      }
      return null;
    };

    const executeAll = async <T = any>(values: any[] = []): Promise<{ results: T[] }> => {
      if (normalized.includes('FROM order_items WHERE order_id =')) {
        const orderId = values[0];
        return { results: (this.orderItems.get(orderId) || []) as T[] };
      }
      return { results: [] };
    };

    const executeRun = async (values: any[] = []): Promise<{ success: boolean; meta?: any }> => {
      if (normalized.includes('INSERT INTO customers')) {
        const [id, name, phone, village] = values;
        this.customers.set(phone, { id, name, phone, village, created_at: new Date().toISOString() });
      } else if (normalized.includes('INSERT INTO orders')) {
        const [id, displayId, custId, custName, custPhone, custVillage, total] = values;
        let curr = 'INR';
        let status = 'PENDING';
        let gw = 'RAZORPAY';
        let rzpOrderId = values[7];
        let itemsSummary = values[8];
        let createdAt = values[9] || new Date().toISOString();

        if (values.length >= 13) {
          curr = values[7] || 'INR';
          status = values[8] || 'PENDING';
          gw = values[9] || 'RAZORPAY';
          rzpOrderId = values[10];
          itemsSummary = values[11];
          createdAt = values[12] || new Date().toISOString();
        }

        this.orders.set(displayId, {
          id,
          display_order_id: displayId,
          customer_id: custId,
          customer_name: custName,
          customer_phone: custPhone,
          customer_village: custVillage,
          total_amount_inr: total,
          currency: curr,
          payment_status: status,
          payment_gateway: gw,
          razorpay_order_id: rzpOrderId,
          items_summary: itemsSummary,
          created_at: createdAt
        });
      } else if (normalized.includes('INSERT INTO order_items')) {
        const [id, orderId, prodId, prodName, packSize, price, qty, lineTotal, createdAt] = values;
        const existing = this.orderItems.get(orderId) || [];
        existing.push({
          id,
          order_id: orderId,
          product_id: prodId,
          product_name: prodName,
          pack_size: packSize,
          unit_price_inr: price,
          quantity: qty,
          line_total_inr: lineTotal,
          created_at: createdAt || new Date().toISOString()
        });
        this.orderItems.set(orderId, existing);
      } else if (normalized.includes("UPDATE orders") && normalized.includes("payment_status = 'PAID'")) {
        const [rzpPaymentId, rzpSig, paidAt, displayId, rzpOrderId] = values;
        for (const order of this.orders.values()) {
          if (order.display_order_id === displayId) {
            order.payment_status = 'PAID';
            order.razorpay_payment_id = rzpPaymentId;
            order.razorpay_signature = rzpSig;
            order.paid_at = paidAt;
          }
        }
      }
      return { success: true };
    };

    const makeStatement = (boundValues: any[] = []): PreparedStatement => ({
      bind: (...newValues: any[]) => makeStatement(newValues),
      first: <T = any>() => executeFirst<T>(boundValues),
      all: <T = any>() => executeAll<T>(boundValues),
      run: () => executeRun(boundValues)
    });

    return makeStatement([]);
  }
}

const fallbackClient = new InMemoryDatabaseClient();

export function getDatabase(): DatabaseClient {
  const processDb = (process.env as any)?.DB;
  if (processDb && typeof processDb.prepare === 'function') {
    return processDb;
  }
  return fallbackClient;
}

/**
 * Generates an atomic #NF-XXXX Order ID using D1 sequence table.
 */
export async function generateDisplayOrderId(db: DatabaseClient): Promise<string> {
  const updateQuery = `
    UPDATE order_sequences 
    SET current_value = current_value + 1 
    WHERE sequence_name = 'orders' 
    RETURNING current_value;
  `;
  try {
    const stmt = db.prepare(updateQuery);
    const row = typeof stmt.first === 'function'
      ? await stmt.first<{ current_value: number }>()
      : await stmt.bind().first<{ current_value: number }>();
    if (row && typeof row.current_value === 'number') {
      return `#NF-${row.current_value}`;
    }
  } catch (err) {
    console.warn('[D1 Sequence Warning]', err);
  }
  // Fallback random sequence if table RETURNING unsupported in local mock
  const fallbackNum = Math.floor(1001 + Math.random() * 8999);
  return `#NF-${fallbackNum}`;
}

/**
 * Creates customer record (or updates existing) and inserts pending order with line items.
 */
export async function createPendingOrder(db: DatabaseClient, input: PendingOrderInput): Promise<string> {
  const customerId = `cust_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const orderId = `ord_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();

  // 1. Upsert Customer
  try {
    await db
      .prepare(`
        INSERT INTO customers (id, name, phone, village, mandal, district, pincode, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(phone) DO UPDATE SET
          name = excluded.name,
          village = excluded.village,
          updated_at = excluded.updated_at;
      `)
      .bind(
        customerId,
        input.customer.name,
        input.customer.phone,
        input.customer.village,
        input.customer.mandal || '',
        input.customer.district || 'Krishna',
        input.customer.pincode || '',
        now,
        now
      )
      .run();
  } catch (err) {
    console.warn('[D1 Customer Upsert Warning]', err);
  }

  // 2. Format Items Summary
  const itemsSummary = input.items
    .map((item) => `${item.productName} (${item.packSize}) x ${item.quantity}`)
    .join(', ');

  // 3. Insert Order Master (PENDING)
  await db
    .prepare(`
      INSERT INTO orders (
        id, display_order_id, customer_id, customer_name, customer_phone, customer_village,
        total_amount_inr, currency, payment_status, payment_gateway, razorpay_order_id,
        items_summary, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 'INR', 'PENDING', 'RAZORPAY', ?, ?, ?);
    `)
    .bind(
      orderId,
      input.displayOrderId,
      customerId,
      input.customer.name,
      input.customer.phone,
      input.customer.village,
      input.totalAmountInr,
      input.razorpayOrderId,
      itemsSummary,
      now
    )
    .run();

  // 4. Insert Line Items
  for (const item of input.items) {
    const itemId = `item_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const lineTotal = item.unitPrice * item.quantity;
    await db
      .prepare(`
        INSERT INTO order_items (
          id, order_id, product_id, product_name, pack_size, unit_price_inr, quantity, line_total_inr, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
      `)
      .bind(
        itemId,
        orderId,
        item.productId,
        item.productName,
        item.packSize,
        item.unitPrice,
        item.quantity,
        lineTotal,
        now
      )
      .run();
  }

  return orderId;
}

/**
 * Transitions order status to PAID upon verified HMAC signature.
 */
export async function markOrderAsPaid(db: DatabaseClient, input: MarkPaidInput): Promise<boolean> {
  const paidAt = new Date().toISOString();
  try {
    const res = await db
      .prepare(`
        UPDATE orders 
        SET payment_status = 'PAID',
            razorpay_payment_id = ?,
            razorpay_signature = ?,
            paid_at = ?
        WHERE display_order_id = ? AND razorpay_order_id = ?;
      `)
      .bind(
        input.razorpayPaymentId,
        input.razorpaySignature,
        paidAt,
        input.displayOrderId,
        input.razorpayOrderId
      )
      .run();

    return res.success;
  } catch (err) {
    console.error('[D1 Mark Paid Error]', err);
    return false;
  }
}

/**
 * Fetches order with customer info and line items.
 */
export async function getOrderWithDetails(db: DatabaseClient, displayOrderId: string) {
  try {
    const order = await db
      .prepare(`SELECT * FROM orders WHERE display_order_id = ?;`)
      .bind(displayOrderId)
      .first<any>();

    if (!order) return null;

    const itemsRes = await db
      .prepare(`SELECT * FROM order_items WHERE order_id = ?;`)
      .bind(order.id)
      .all<any>();

    return {
      ...order,
      items: itemsRes.results || []
    };
  } catch (err) {
    console.warn('[D1 Get Order Details Warning]', err);
    return null;
  }
}
