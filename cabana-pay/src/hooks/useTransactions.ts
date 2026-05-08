'use client';

import { useState, useCallback } from 'react';
import { Transaction, PaymentRequest } from '@/types';
import { processPayment, createMockTransaction } from '@/services/transactionService';

/**
 * Custom hook to manage transactions
 */
export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load transactions from localStorage
  const loadTransactions = useCallback(() => {
    try {
      const stored = localStorage.getItem('transactions');
      if (stored) {
        const parsed = JSON.parse(stored);
        setTransactions(
          parsed.map((t: any) => ({
            ...t,
            date: new Date(t.date),
          }))
        );
      }
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  }, []);

  // Save transaction
  const addTransaction = useCallback((transaction: Transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
    try {
      const current = JSON.parse(localStorage.getItem('transactions') || '[]');
      localStorage.setItem('transactions', JSON.stringify([transaction, ...current]));
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  }, []);

  // Process payment
  const makePayment = useCallback(
    async (paymentRequest: PaymentRequest, signTransaction?: any) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await processPayment(paymentRequest, signTransaction);

        if (result.status === 'failed') {
          setError(result.error || 'Payment failed');
          setIsLoading(false);
          return { success: false, error: result.error };
        }

        const transaction = createMockTransaction(paymentRequest);
        addTransaction(transaction);

        setIsLoading(false);
        return { success: true, transaction };
      } catch (err: any) {
        const errorMsg = err.message || 'Failed to process payment';
        setError(errorMsg);
        setIsLoading(false);
        return { success: false, error: errorMsg };
      }
    },
    [addTransaction]
  );

  // Add donation
  const addDonation = useCallback(
    (amount: number, walletAddress: string, walletName: string) => {
      const transaction: Transaction = {
        id: Math.random().toString(36).substring(7),
        type: 'donation',
        amount,
        recipient: walletAddress,
        date: new Date(),
        status: 'confirmed',
        signature: `mock_sig_${Math.random().toString(36).substring(7)}`,
        description: `Donation to ${walletName}`,
      };

      addTransaction(transaction);
    },
    [addTransaction]
  );

  // Clear all transactions
  const clearTransactions = useCallback(() => {
    setTransactions([]);
    localStorage.removeItem('transactions');
  }, []);

  return {
    transactions,
    isLoading,
    error,
    loadTransactions,
    addTransaction,
    makePayment,
    addDonation,
    clearTransactions,
  };
};
