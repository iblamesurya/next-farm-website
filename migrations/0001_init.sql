-- Cloudflare D1 Database Schema Migration
-- Migration: 0001_init.sql
-- Source: ORIGINAL_REQUEST.md (R3), survey_integrations.md § 3.1

-- 1. Customers / Farmer Leads Table
CREATE TABLE IF NOT EXISTS customers (
    id TEXT PRIMARY KEY,                       -- UUID v4
    name TEXT NOT NULL,                        -- Farmer Full Name
    phone TEXT NOT NULL UNIQUE,                -- 10-digit Indian Mobile Number
    village TEXT NOT NULL,                     -- Village / Farm Location
    mandal TEXT,                               -- Mandal / Sub-district
    district TEXT DEFAULT 'Krishna',           -- District
    state TEXT DEFAULT 'Andhra Pradesh',       -- State
    pincode TEXT,                              -- Postal Code
    created_at TEXT NOT NULL DEFAULT (datetime('now', 'utc')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now', 'utc'))
);

-- 2. Atomic Order Sequence Generator (#NF-XXXX)
CREATE TABLE IF NOT EXISTS order_sequences (
    sequence_name TEXT PRIMARY KEY,
    current_value INTEGER NOT NULL DEFAULT 1000
);

-- Seed initial sequence starting at 1000 so first order is #NF-1001
INSERT OR IGNORE INTO order_sequences (sequence_name, current_value) 
VALUES ('orders', 1000);

-- 3. Orders Master Table
CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,                       -- UUID v4
    display_order_id TEXT NOT NULL UNIQUE,     -- #NF-XXXX format (e.g. #NF-1001)
    customer_id TEXT NOT NULL,                 -- References customers(id)
    customer_name TEXT NOT NULL,               -- Denormalized for fast queries
    customer_phone TEXT NOT NULL,              -- Denormalized for rapid lookup
    customer_village TEXT NOT NULL,            -- Denormalized for dispatch
    total_amount_inr REAL NOT NULL,            -- Total in Indian Rupees
    currency TEXT NOT NULL DEFAULT 'INR',
    payment_status TEXT NOT NULL DEFAULT 'PENDING' 
        CHECK (payment_status IN ('PENDING', 'PAID', 'FAILED', 'REFUNDED')),
    payment_gateway TEXT NOT NULL DEFAULT 'RAZORPAY',
    razorpay_order_id TEXT UNIQUE,             -- Razorpay Order ID (order_xxx)
    razorpay_payment_id TEXT UNIQUE,           -- Razorpay Payment ID (pay_xxx)
    razorpay_signature TEXT,                   -- HMAC-SHA256 signature string
    items_summary TEXT NOT NULL,               -- E.g. "Next Gut (5L Can) x 2, Next Converter (1L) x 1"
    notes TEXT,                                -- Farm size, acreage, diagnostic notes
    created_at TEXT NOT NULL DEFAULT (datetime('now', 'utc')),
    paid_at TEXT,                              -- Timestamp when verified
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- 4. Order Line Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id TEXT PRIMARY KEY,                       -- UUID v4
    order_id TEXT NOT NULL,                    -- References orders(id)
    product_id TEXT NOT NULL,                  -- Slug: "next-gut", "next-converter"
    product_name TEXT NOT NULL,                -- "Next Gut", "Next Viro Nill"
    pack_size TEXT NOT NULL,                   -- "5L Can", "1L Bottle", "10kg Bag"
    unit_price_inr REAL NOT NULL,              -- E.g. 5000.00 or 1199.00
    quantity INTEGER NOT NULL CHECK(quantity > 0),
    line_total_inr REAL NOT NULL,              -- unit_price_inr * quantity
    created_at TEXT NOT NULL DEFAULT (datetime('now', 'utc')),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- 5. Performance Indices
CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);
CREATE INDEX IF NOT EXISTS idx_orders_display_id ON orders(display_order_id);
CREATE INDEX IF NOT EXISTS idx_orders_razorpay_order_id ON orders(razorpay_order_id);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
