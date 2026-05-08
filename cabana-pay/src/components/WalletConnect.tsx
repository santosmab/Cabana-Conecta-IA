'use client';

import React from 'react';
import { useWallet } from '@/hooks/useWallet';
import { Wallet, LogOut } from 'lucide-react';

export const WalletConnect: React.FC = () => {
  const { wallet, connectWallet, disconnectWallet, displayAddress } = useWallet();

  return (
    <div className="flex items-center gap-2">
      {!wallet.isConnected ? (
        <button
          onClick={connectWallet}
          disabled={wallet.isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          <Wallet size={18} />
          {wallet.isLoading ? 'Conectando...' : 'Conectar Carteira'}
        </button>
      ) : (
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-700">{displayAddress}</span>
            <span className="text-xs text-gray-500">{wallet.balance.toFixed(4)} SOL</span>
          </div>
          <button
            onClick={disconnectWallet}
            className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut size={16} />
            Desconectar
          </button>
        </div>
      )}

      {wallet.error && (
        <div className="text-sm text-red-600 mt-2">
          {wallet.error}
        </div>
      )}
    </div>
  );
};
