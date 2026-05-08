'use client';

import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { PaymentRequest } from '@/types';
import { isValidSolanaAddress, isValidAmount } from '@/utils/validators';
import toast from 'react-hot-toast';

interface PaymentFormProps {
  onSubmit: (paymentRequest: PaymentRequest) => Promise<void>;
  isLoading?: boolean;
  disabled?: boolean;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit, isLoading = false, disabled = false }) => {
  const [formData, setFormData] = useState({
    amount: '',
    recipientAddress: '',
    description: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (!isValidAmount(formData.amount)) {
      newErrors.amount = 'Invalid amount';
    }

    if (!formData.recipientAddress) {
      newErrors.recipientAddress = 'Recipient address is required';
    } else if (!isValidSolanaAddress(formData.recipientAddress)) {
      newErrors.recipientAddress = 'Invalid Solana address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors above');
      return;
    }

    try {
      await onSubmit({
        amount: parseFloat(formData.amount),
        recipientAddress: formData.recipientAddress,
        description: formData.description,
      });

      setFormData({ amount: '', recipientAddress: '', description: '' });
    } catch (error: any) {
      toast.error(error.message || 'Failed to process payment');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Enviar Pagamento</h2>

      {/* Amount */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Valor (SOL)
        </label>
        <input
          type="number"
          step="0.01"
          placeholder="0.00"
          value={formData.amount}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, amount: e.target.value }));
            setErrors((prev) => ({ ...prev, amount: '' }));
          }}
          disabled={disabled || isLoading}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 ${
            errors.amount ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
      </div>

      {/* Recipient Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Endereço do Destinatário
        </label>
        <input
          type="text"
          placeholder="Endereço Solana..."
          value={formData.recipientAddress}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, recipientAddress: e.target.value }));
            setErrors((prev) => ({ ...prev, recipientAddress: '' }));
          }}
          disabled={disabled || isLoading}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 font-mono text-sm ${
            errors.recipientAddress ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.recipientAddress && (
          <p className="text-red-500 text-sm mt-1">{errors.recipientAddress}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Descrição (opcional)
        </label>
        <input
          type="text"
          placeholder="O que é este pagamento?"
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          disabled={disabled || isLoading}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={disabled || isLoading}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-semibold"
      >
        <Send size={18} />
        {isLoading ? 'Processando...' : 'Enviar Pagamento'}
      </button>
    </form>
  );
};
