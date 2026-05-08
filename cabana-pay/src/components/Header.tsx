'use client';

import React from 'react';
import { Coins, Send, Share2, Heart } from 'lucide-react';
import { formatAmount } from '@/utils/validators';

interface HeaderProps {
  balance: number;
  isConnected: boolean;
}

export const Header: React.FC<HeaderProps> = ({ balance, isConnected }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Logo and Title */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-white p-2 rounded-lg">
            <Coins size={32} className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">CabanaPay</h1>
            <p className="text-blue-100 text-sm">Inclusão Financeira com Solana</p>
          </div>
        </div>

        {/* Balance Section */}
        {isConnected && (
          <div className="bg-blue-500 bg-opacity-50 rounded-lg p-6 mb-6">
            <p className="text-blue-100 text-sm mb-2">Saldo Disponível</p>
            <h2 className="text-4xl font-bold">{formatAmount(balance)} SOL</h2>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <button className="flex items-center justify-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-3 rounded-lg transition-all font-semibold">
            <Send size={20} />
            Pagar
          </button>
          <button className="flex items-center justify-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-3 rounded-lg transition-all font-semibold">
            <Share2 size={20} />
            Receber
          </button>
          <button className="flex items-center justify-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-3 rounded-lg transition-all font-semibold">
            <Heart size={20} />
            Doar
          </button>
          <button className="flex items-center justify-center gap-2 bg-white text-blue-600 px-4 py-3 rounded-lg hover:bg-blue-50 transition-all font-semibold">
            <Coins size={20} />
            Histórico
          </button>
        </div>
      </div>
    </header>
  );
};
