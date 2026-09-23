'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { mockProducts } from '@/data/mockData';
import { StoreProduct } from '@/types';
import { 
  ShoppingBag, 
  CheckCircle, 
  Heart, 
  Info, 
  X, 
  Plus, 
  Minus, 
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Sparkles,
  Leaf,
  Layers,
  Filter
} from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';

export default function StorePage() {
  const { playChime, speakText } = useAccessibility();
  const [selectedProduct, setSelectedProduct] = useState<StoreProduct | null>(null);
  const [cart, setCart] = useState<{ product: StoreProduct; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Form states for accessible checkout
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'GCash' | 'Bank Transfer' | 'Cash on Pickup'>('GCash');

  const categories = ['All', 'Upcycled Eco-Bags', 'Fabric Baskets', 'Denim Pouches', 'Upcycled Home Crafts'];

  const filteredProducts = selectedCategory === 'All'
    ? mockProducts
    : mockProducts.filter(p => p.category === selectedCategory);

  const addToCart = (product: StoreProduct) => {
    playChime('success');
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    playChime('click');
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as { product: StoreProduct; quantity: number }[];
    });
  };

  const totalCartPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    playChime('success');
    const orderNum = `BUPCA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderSuccess(orderNum);
    setCart([]);
    setIsCartOpen(false);
    speakText(`Thank you for your purchase! Your order reference is ${orderNum}.`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50 dark:bg-zinc-950 transition-colors">
      <Navbar />

      <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        
        {/* Editorial Header */}
        <div className="relative rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 mb-10 overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-bold text-sky-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Ethical & Circular Craftsmanship</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              PWD BUPCA Artisan Store
            </h1>
            <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed">
              Every creation is sewn by our certified machine operators in Barangay UP Campus, Diliman. 100% of proceeds directly support member piece-rates and organization raw materials.
            </p>
          </div>

          <div className="absolute right-6 top-6 sm:top-1/2 sm:-translate-y-1/2">
            <button
              onClick={() => {
                playChime('click');
                setIsCartOpen(true);
              }}
              className="px-5 py-3.5 rounded-2xl bg-white text-zinc-900 hover:bg-zinc-100 font-black text-xs sm:text-sm shadow-xl flex items-center gap-2 cursor-pointer transition hover:scale-105"
            >
              <ShoppingBag className="w-5 h-5 text-blue-700" />
              <span>Cart ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
              {cart.length > 0 && (
                <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs">
                  ₱{totalCartPrice.toLocaleString()}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playChime('click');
                setSelectedCategory(cat);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap cursor-pointer transition ${
                selectedCategory === cat
                  ? 'bg-blue-700 text-white shadow-md'
                  : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Order Success Banner */}
        {orderSuccess && (
          <div 
            className="mb-8 p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500 text-emerald-900 dark:text-emerald-100 flex items-start gap-4"
            role="alert"
          >
            <CheckCircle className="w-8 h-8 text-emerald-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h2 className="text-xl font-black">Order Placed Successfully!</h2>
              <p className="text-sm mt-1">
                Your order reference is <strong className="underline font-mono">{orderSuccess}</strong>. The workshop team at Barangay UP Campus is preparing your items.
              </p>
              <button
                onClick={() => setOrderSuccess(null)}
                className="mt-3 px-4 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 cursor-pointer"
              >
                Dismiss Notice
              </button>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative h-64 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <span className="absolute top-3 left-3 bg-white/95 dark:bg-zinc-900/95 text-[11px] font-extrabold px-3 py-1 rounded-full shadow-sm text-zinc-800 dark:text-zinc-200">
                  {prod.category}
                </span>
                <span className="absolute bottom-3 right-3 bg-zinc-900/90 dark:bg-white/95 text-white dark:text-zinc-950 text-sm font-black px-3 py-1 rounded-xl shadow-lg">
                  ₱{prod.price}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-base text-zinc-900 dark:text-white leading-snug group-hover:text-blue-600 transition-colors">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-blue-700 dark:text-blue-400 font-bold mt-1">
                    Artisan: {prod.artisanName}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 line-clamp-2">
                    {prod.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-2">
                  <button
                    onClick={() => {
                      playChime('click');
                      setSelectedProduct(prod);
                    }}
                    className="flex-1 py-2.5 px-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => addToCart(prod)}
                    className="py-2.5 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow hover:shadow-md transition cursor-pointer flex items-center justify-center gap-1.5"
                    aria-label={`Add ${prod.name} to cart`}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PRODUCT DETAILS MODAL */}
        {selectedProduct && (
          <div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label={selectedProduct.name}
          >
            <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-zinc-200 dark:border-zinc-700 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold uppercase text-blue-600 dark:text-blue-400">
                    {selectedProduct.category}
                  </span>
                  <h2 className="text-2xl font-black text-zinc-900 dark:text-white mt-1">
                    {selectedProduct.name}
                  </h2>
                </div>
                <button
                  onClick={() => {
                    playChime('click');
                    setSelectedProduct(null);
                  }}
                  className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="rounded-2xl w-full h-64 object-cover shadow"
                />
                <div className="space-y-4">
                  <div>
                    <span className="text-3xl font-black text-blue-700 dark:text-blue-400">
                      ₱{selectedProduct.price}
                    </span>
                    <span className="text-xs text-zinc-500 block">Funds direct piece-rates & subsidized supplies</span>
                  </div>

                  <div className="p-3.5 bg-blue-50/70 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-800 text-xs">
                    <strong className="block font-bold text-blue-900 dark:text-blue-300">Artisan Narrative:</strong>
                    <p className="text-zinc-600 dark:text-zinc-300 mt-1 leading-relaxed">{selectedProduct.artisanStory}</p>
                  </div>

                  <div className="text-xs text-zinc-600 dark:text-zinc-400">
                    <strong>Sustainable Materials:</strong> {selectedProduct.materialsUsed}
                  </div>

                  <button
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="w-full py-3.5 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer focus:ring-4 focus:ring-blue-400"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add to Shopping Cart</span>
                  </button>
                </div>
              </div>

              <div className="mt-6 border-t border-zinc-200 dark:border-zinc-800 pt-4 text-xs text-zinc-500 leading-relaxed">
                {selectedProduct.description}
              </div>
            </div>
          </div>
        )}

        {/* ACCESSIBLE SLIDE-OVER CART */}
        {isCartOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping Cart and Checkout"
          >
            <div className="bg-white dark:bg-zinc-900 w-full max-w-md h-full flex flex-col p-6 shadow-2xl border-l border-zinc-200 dark:border-zinc-800 overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-6 h-6 text-blue-700" />
                  <h2 className="text-xl font-black">Your Shopping Cart</h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full cursor-pointer"
                  aria-label="Close Cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-zinc-500">
                  <ShoppingBag className="w-16 h-16 text-zinc-300 stroke-1 mb-2" />
                  <p className="font-bold text-base">Your cart is empty</p>
                  <p className="text-xs text-zinc-400 mt-1">Select an upcycled artisan product to support our livelihood program.</p>
                </div>
              ) : (
                <div className="flex-1 flex flex-col justify-between mt-4">
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700"
                      >
                        <div className="flex-1 pr-2">
                          <h4 className="font-bold text-xs text-zinc-900 dark:text-zinc-100">
                            {item.product.name}
                          </h4>
                          <span className="text-xs text-blue-700 dark:text-blue-400 font-bold">
                            ₱{item.product.price} each
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, -1)}
                            className="w-8 h-8 rounded-lg bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center font-bold text-zinc-800 dark:text-zinc-100 hover:bg-zinc-300 cursor-pointer min-h-[32px] min-w-[32px]"
                            aria-label={`Decrease ${item.product.name}`}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-bold text-sm w-5 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, 1)}
                            className="w-8 h-8 rounded-lg bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center font-bold text-zinc-800 dark:text-zinc-100 hover:bg-zinc-300 cursor-pointer min-h-[32px] min-w-[32px]"
                            aria-label={`Increase ${item.product.name}`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex justify-between items-center">
                      <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Total Contribution:</span>
                      <span className="text-2xl font-black text-blue-700 dark:text-blue-400">
                        ₱{totalCartPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Form */}
                  <form onSubmit={handleCheckout} className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    <h3 className="font-extrabold text-sm text-zinc-900 dark:text-white flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-blue-600" />
                      <span>Delivery & Payment Details</span>
                    </h3>

                    <div>
                      <label className="block text-xs font-bold mb-1">Customer / Organization Name *</label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Maria Santos / UP College Dept."
                        className="w-full px-3 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1">Contact Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="e.g. +63 917 123 4567"
                        className="w-full px-3 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1">Delivery / Pickup Address *</label>
                      <textarea
                        required
                        rows={2}
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="UP Diliman Campus or Metro Manila Address"
                        className="w-full px-3 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1">Payment Method</label>
                      <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value as 'GCash' | 'Bank Transfer' | 'Cash on Pickup')}
                        className="w-full px-3 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                      >
                        <option value="GCash">GCash (0917-PWD-BUPCA)</option>
                        <option value="Bank Transfer">BPI (UP Campus Branch)</option>
                        <option value="Cash on Pickup">Cash on Pickup (Area 2 / CHE Workshop)</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base shadow-xl flex items-center justify-center gap-2 cursor-pointer focus:ring-4 focus:ring-emerald-400"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>Confirm & Submit Order (₱{totalCartPrice.toLocaleString()})</span>
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
