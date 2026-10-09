'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, ArrowRight, Lock } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { formatInr } from '@/lib/catalog';
import { CheckoutModal } from '@/components/checkout-modal';

export function CartDrawer() {
  const {
    isOpen,
    closeCart,
    items,
    removeItem,
    updateQuantity,
    totalItems,
    totalAmount,
    clearCart
  } = useCart();

  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="px-5 py-4 bg-[#002B5B] text-white flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#FFD200]" />
              <h2 className="font-heading font-bold text-lg text-white">Your Cart</h2>
              <span className="text-xs bg-[#004B50] text-[#FFD200] font-bold px-2 py-0.5 rounded-full">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={closeCart}
              type="button"
              className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              aria-label="Close cart"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Delivery & Pre-Paid Guarantee Banner */}
          <div className="bg-[#FFD200]/15 border-b border-[#FFD200]/30 px-5 py-2.5 flex items-center gap-2 text-xs text-[#002B5B] font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#004B50] flex-shrink-0" />
            <span>Free Express Delivery Across India | Pre-Paid Only</span>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-5 py-4 divide-y divide-slate-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4 space-y-4">
                <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-10 h-10 text-slate-300" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-[#002B5B]">
                    Your Cart is Empty
                  </h3>
                  <p className="text-sm text-slate-500 mt-1 max-w-xs">
                    Explore our 11 biotechnology formulations formulated for shrimp and prawn aquaculture.
                  </p>
                </div>
                <button
                  onClick={closeCart}
                  className="mt-2 px-6 py-2.5 bg-[#004B50] text-white text-sm font-bold rounded-lg hover:bg-[#002B5B] transition-colors"
                >
                  Browse 11 Formulations
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={`${item.productId}-${item.packSize}`} className="py-4 flex gap-4">
                  <div className="relative w-20 h-20 bg-slate-50 rounded-lg p-1.5 flex-shrink-0 border border-slate-200">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="80px"
                      className="object-contain"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <Link
                          href={`/products/${item.slug}`}
                          onClick={closeCart}
                          className="font-heading font-bold text-sm text-[#002B5B] hover:text-[#004B50] transition-colors line-clamp-1"
                        >
                          {item.title}
                        </Link>
                        <button
                          onClick={() => removeItem(item.productId, item.packSize)}
                          className="text-slate-400 hover:text-red-500 transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="inline-block text-[11px] font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded">
                          {item.packSize === '5L'
                            ? '5-Liter Industrial Can'
                            : item.packSize === '2L'
                            ? '2-Liter Twin Pack'
                            : '1-Liter Precision Bottle'}
                        </span>
                        {item.formatLabel && (
                          <span className="text-[10px] text-slate-500 hidden sm:inline">
                            ({item.formatLabel})
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-slate-300 rounded-md overflow-hidden bg-slate-50">
                        <button
                          onClick={() => updateQuantity(item.productId, item.packSize, item.quantity - 1)}
                          className="p-1 hover:bg-slate-200 text-slate-600 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.packSize, item.quantity + 1)}
                          className="p-1 hover:bg-slate-200 text-slate-600 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <div className="text-right">
                        <div className="text-sm font-extrabold text-[#002B5B]">
                          {formatInr(item.unitPrice * item.quantity)}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {formatInr(item.unitPrice)} each
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Trigger */}
          {items.length > 0 && (
            <div className="p-5 bg-slate-50 border-t border-slate-200 space-y-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-medium">{formatInr(totalAmount)}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Delivery to Farm / Village</span>
                  <span>FREE</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-[#002B5B] pt-2 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span className="text-xl text-[#004B50]">{formatInr(totalAmount)}</span>
                </div>
              </div>

              {/* Pre-paid Strict Warning */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 flex items-start gap-2 text-xs text-amber-900">
                <Lock className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Strict Pre-Paid Policy:</strong> Orders processed only via Razorpay (UPI, GPay, PhonePe, Cards). Cash on Delivery (COD) is strictly unavailable.
                </span>
              </div>

              {/* Checkout Action */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full py-3.5 px-4 bg-[#FFD200] hover:bg-[#e6bd00] text-[#002B5B] font-heading font-extrabold text-sm uppercase tracking-wider rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Proceed to Pre-Paid Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex justify-between items-center text-xs text-slate-500 pt-1">
                  <button
                    onClick={clearCart}
                    className="hover:text-red-600 transition-colors"
                  >
                    Clear cart
                  </button>
                  <span>Dispatched from Vijayawada HQ</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
}
