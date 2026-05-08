'use client';

import React, { useMemo } from 'react';
import QRCode from 'qrcode.react';
import { CommunityWallet } from '@/types';
import { formatAmount, truncateAddress } from '@/utils/validators';
import { Heart } from 'lucide-react';

interface DonationCardProps {
  wallet: CommunityWallet;
  onDonate: (amount: number) => void;
  isLoading?: boolean;
}

export const DonationCard: React.FC<DonationCardProps> = ({ wallet, onDonate, isLoading = false }) => {
  const qrValue = useMemo(() => {
    return JSON.stringify({
      walletAddress: wallet.address,
      label: `Donate to ${wallet.name}`,
      type: 'donation',
    });
  }, [wallet.address, wallet.name]);

  const [selectedAmount, setSelectedAmount] = React.useState<number | null>(null);
  const predefinedAmounts = [0.5, 1, 5, 10];

  const handleDonate = (amount: number) => {
    onDonate(amount);
    setSelectedAmount(null);
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg shadow-lg p-6 space-y-4">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800">{wallet.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{wallet.description}</p>
          <div className="flex gap-4 mt-3 text-sm">
            <span className="text-gray-600">
              Total: <span className="font-semibold text-purple-600">{formatAmount(wallet.totalReceived)} SOL</span>
            </span>
            <span className="text-gray-600">
              Transações: <span className="font-semibold">{wallet.transactionCount}</span>
            </span>
          </div>
        </div>

        {/* QR Code */}
        <div className="bg-white p-2 rounded-lg shadow">
          <QRCode value={qrValue} size={100} level="H" includeMargin={true} />
        </div>
      </div>

      {/* Predefined Amounts */}
      <div className="grid grid-cols-4 gap-2">
        {predefinedAmounts.map((amount) => (
          <button
            key={amount}
            onClick={() => handleDonate(amount)}
            disabled={isLoading}
            className={`px-3 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 ${
              selectedAmount === amount
                ? 'bg-purple-600 text-white'
                : 'bg-white text-purple-600 border border-purple-300 hover:bg-purple-100'
            }`}
          >
            {amount} SOL
          </button>
        ))}
      </div>

      {/* Custom Amount */}
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Outro valor..."
          min="0.1"
          step="0.1"
          className="flex-1 px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors font-semibold flex items-center gap-2">
          <Heart size={18} />
          Doar
        </button>
      </div>

      {/* Address Display */}
      <div className="bg-white p-3 rounded-lg border border-purple-200">
        <p className="text-xs text-gray-600 mb-1">Endereço da Carteira:</p>
        <p className="font-mono text-sm text-gray-800 break-all">{wallet.address}</p>
      </div>
    </div>
  );
};
