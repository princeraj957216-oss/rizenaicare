import React, { useState } from 'react';
import { ShoppingBag, Search, Pill, ShieldAlert, Check, ShoppingCart, Plus, Minus, X } from 'lucide-react';
import { initialMedicines } from '../data/mockMedicines';
import { MedicalDisclaimerBadge } from '../components/common/MedicalDisclaimerBadge';
import confetti from 'canvas-confetti';

export function MedicinesPharmacy() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState({});
  const [selectedMed, setSelectedMed] = useState(null);
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);

  const filteredMedicines = initialMedicines.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (medId) => {
    setCart(prev => ({ ...prev, [medId]: (prev[medId] || 0) + 1 }));
  };

  const removeFromCart = (medId) => {
    setCart(prev => {
      const updated = { ...prev };
      if (updated[medId] > 1) updated[medId] -= 1;
      else delete updated[medId];
      return updated;
    });
  };

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    const med = initialMedicines.find(m => m.id === id);
    return sum + (med ? med.price * qty : 0);
  }, 0);

  const handleCheckout = () => {
    if (totalItems === 0) return;
    setIsCheckoutSuccess(true);
    confetti({ particleCount: 70, spread: 60 });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0D111A] border border-[#1E2638] rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/40 text-pink-400 flex items-center justify-center shadow-[0_0_15px_rgba(236,72,153,0.3)]">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Medicines & Wellness Pharmacy</h2>
            <p className="text-xs text-slate-400">Genuine OTC remedies, wellness essentials & fast delivery</p>
          </div>
        </div>

        {totalItems > 0 && (
          <div className="flex items-center gap-2 bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-purple-500/40 px-3 py-1.5 rounded-xl text-xs text-purple-200">
            <ShoppingCart className="w-4 h-4 text-cyan-400" />
            <span>{totalItems} items (₹{totalPrice})</span>
            <button
              onClick={handleCheckout}
              className="ml-2 px-2.5 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-[10px] font-bold"
            >
              Order
            </button>
          </div>
        )}
      </div>

      <MedicalDisclaimerBadge text="Only genuine Over-The-Counter (OTC) wellness essentials are listed. Prescription medications require a verified doctor prescription." />

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Search by medicine name, symptom category (e.g., Fever, Acidity, Pain)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#0D111A] border border-[#1E2638] rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-pink-500"
        />
      </div>

      {/* Medicine Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMedicines.map((med) => (
          <div
            key={med.id}
            className="bg-[#0D111A] border border-[#1E2638] hover:border-pink-500/30 rounded-3xl p-5 flex flex-col justify-between transition-all group shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold text-pink-400 bg-pink-500/10 border border-pink-500/20 px-2 py-0.5 rounded-full">
                  {med.category}
                </span>
                <span className="text-[11px] text-slate-400">{med.packSize}</span>
              </div>

              <h3 className="text-sm font-bold text-white group-hover:text-pink-300 transition-colors">{med.name}</h3>
              <p className="text-xs text-purple-300">{med.brand}</p>
              <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">{med.description}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#1C2436] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500">Price</span>
                <p className="text-sm font-bold text-white">₹{med.price}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedMed(med)}
                  className="px-2.5 py-1.5 rounded-xl bg-[#141A28] border border-[#1E2638] text-[11px] text-slate-300 hover:text-cyan-300 transition-colors"
                >
                  Details
                </button>

                {cart[med.id] ? (
                  <div className="flex items-center gap-2 bg-pink-600/30 border border-pink-500 rounded-xl px-2 py-1 text-xs text-pink-200">
                    <button onClick={() => removeFromCart(med.id)} className="p-0.5 hover:text-white"><Minus className="w-3 h-3" /></button>
                    <span className="font-bold">{cart[med.id]}</span>
                    <button onClick={() => addToCart(med.id)} className="p-0.5 hover:text-white"><Plus className="w-3 h-3" /></button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(med.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-semibold shadow-[0_0_10px_rgba(236,72,153,0.3)] transition-all"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {selectedMed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0D111A] border border-[#1E2638] rounded-3xl p-6 max-w-md w-full space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-bold text-white">{selectedMed.name}</h3>
                <p className="text-xs text-purple-300">{selectedMed.brand} • {selectedMed.category}</p>
              </div>
              <button onClick={() => setSelectedMed(null)} className="p-1 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="bg-[#121622] rounded-xl p-3 space-y-1">
                <span className="font-semibold text-cyan-300">Standard Usage / Dosage:</span>
                <p>{selectedMed.dosage}</p>
              </div>
              <div className="bg-[#121622] rounded-xl p-3 space-y-1">
                <span className="font-semibold text-amber-300">Precautions & Side Effects:</span>
                <p>{selectedMed.sideEffects}</p>
              </div>
            </div>

            <button
              onClick={() => { addToCart(selectedMed.id); setSelectedMed(null); }}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold text-xs shadow-glow-purple"
            >
              Add {selectedMed.name} to Cart (₹{selectedMed.price})
            </button>
          </div>
        </div>
      )}

      {/* Checkout Success Modal */}
      {isCheckoutSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0D111A] border border-[#1E2638] rounded-3xl p-6 max-w-sm w-full text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Order Placed Successfully!</h3>
            <p className="text-xs text-slate-400">Your wellness order for {totalItems} items (₹{totalPrice}) is being prepared for fast delivery.</p>
            <button
              onClick={() => { setIsCheckoutSuccess(false); setCart({}); }}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-xs font-semibold"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
