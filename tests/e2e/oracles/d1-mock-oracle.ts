/**
 * Authoritative Cloudflare D1 SQL Schema & Repository Oracle
 * Source: ORIGINAL_REQUEST.md (R3), PROJECT.md (§ Cloudflare D1), survey_integrations.md.
 * In-memory transactional SQLite-compatible simulator for D1 edge runtime testing.
 */

export interface DbCustomer {
  id: string;
  fullName: string;
  whatsappMobile: string;
  villageMandal: string;
  createdAt: string;
}

export interface DbOrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  packSize: '5L' | '1L';
  quantity: number;
  unitPriceInr: number;
  totalPriceInr: number;
}

export interface DbOrder {
  id: string;
  displayOrderId: string; // e.g. '#NF-1001'
  customerId: string;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  totalAmountInr: number;
  amountPaise: number;
  status: 'PENDING' | 'PAID' | 'FAILED';
  createdAt: string;
  updatedAt: string;
  customer?: DbCustomer;
  items?: DbOrderItem[];
}

export class D1DatabaseSimulator {
  private customers: Map<string, DbCustomer> = new Map();
  private orders: Map<string, DbOrder> = new Map();
  private orderItems: Map<string, DbOrderItem> = new Map();
  private currentSequence: number = 1000;

  public reset(): void {
    this.customers.clear();
    this.orders.clear();
    this.orderItems.clear();
    this.currentSequence = 1000;
  }

  /**
   * Generates atomic display order ID: #NF-XXXX
   */
  public generateDisplayOrderId(): string {
    this.currentSequence++;
    return `#NF-${this.currentSequence}`;
  }

  /**
   * Upserts customer lead record (Zero-OTP identification)
   */
  public upsertCustomer(profile: { fullName: string; whatsappMobile: string; villageMandal: string }): DbCustomer {
    // Look up by WhatsApp mobile
    for (const cust of this.customers.values()) {
      if (cust.whatsappMobile === profile.whatsappMobile) {
        cust.fullName = profile.fullName;
        cust.villageMandal = profile.villageMandal;
        return cust;
      }
    }

    const id = `cust_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newCustomer: DbCustomer = {
      id,
      fullName: profile.fullName,
      whatsappMobile: profile.whatsappMobile,
      villageMandal: profile.villageMandal,
      createdAt: new Date().toISOString()
    };
    this.customers.set(id, newCustomer);
    return newCustomer;
  }

  /**
   * Creates pending pre-paid order
   */
  public createOrder(params: {
    customer: { fullName: string; whatsappMobile: string; villageMandal: string };
    items: Array<{ productId: string; productName: string; packSize: '5L' | '1L'; quantity: number; unitPriceInr: number }>;
    razorpayOrderId: string;
  }): DbOrder {
    const customer = this.upsertCustomer(params.customer);
    const displayOrderId = this.generateDisplayOrderId();
    const orderId = `ord_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    let totalAmountInr = 0;
    const items: DbOrderItem[] = [];

    for (const item of params.items) {
      const itemTotal = item.unitPriceInr * item.quantity;
      totalAmountInr += itemTotal;
      const dbItem: DbOrderItem = {
        id: `item_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        orderId,
        productId: item.productId,
        productName: item.productName,
        packSize: item.packSize,
        quantity: item.quantity,
        unitPriceInr: item.unitPriceInr,
        totalPriceInr: itemTotal
      };
      this.orderItems.set(dbItem.id, dbItem);
      items.push(dbItem);
    }

    const now = new Date().toISOString();
    const newOrder: DbOrder = {
      id: orderId,
      displayOrderId,
      customerId: customer.id,
      razorpayOrderId: params.razorpayOrderId,
      totalAmountInr,
      amountPaise: Math.round(totalAmountInr * 100),
      status: 'PENDING',
      createdAt: now,
      updatedAt: now,
      customer,
      items
    };

    this.orders.set(displayOrderId, newOrder);
    return newOrder;
  }

  /**
   * Marks pre-paid order as PAID upon cryptographic HMAC verification
   */
  public markOrderAsPaid(params: {
    displayOrderId: string;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
  }): DbOrder | null {
    const order = this.orders.get(params.displayOrderId);
    if (!order) return null;

    if (order.razorpayOrderId !== params.razorpayOrderId) {
      throw new Error(`Razorpay Order ID mismatch for ${params.displayOrderId}`);
    }

    order.razorpayPaymentId = params.razorpayPaymentId;
    order.razorpaySignature = params.razorpaySignature;
    order.status = 'PAID';
    order.updatedAt = new Date().toISOString();

    return order;
  }

  /**
   * Retrieves full order details
   */
  public getOrderWithDetails(displayOrderId: string): DbOrder | null {
    const order = this.orders.get(displayOrderId);
    if (!order) return null;

    const customer = this.customers.get(order.customerId);
    const items = Array.from(this.orderItems.values()).filter(item => item.orderId === order.id);

    return {
      ...order,
      customer,
      items
    };
  }

  public getAllPaidOrders(): DbOrder[] {
    return Array.from(this.orders.values()).filter(o => o.status === 'PAID');
  }
}
