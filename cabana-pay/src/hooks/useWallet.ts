'use client';

import { useState, useEffect, useCallback } from 'react';
import { WalletState } from '@/types';
import { getWalletBalance } from '@/services/walletService';
import { truncateAddress } from '@/utils/validators';

/**
 * Custom hook to manage wallet connection state
 */
export const useWallet = () => {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    publicKey: null,
    balance: 0,
    isLoading: false,
    error: null,
  });

  // Check for Phantom wallet on mount
  useEffect(() => {
    const checkPhantomWallet = () => {
      const isPhantomInstalled = () => {
        const { solana } = window as any;
        return solana && solana.isPhantom;
      };

      if (!isPhantomInstalled()) {
        setWallet((prev) => ({
          ...prev,
          error: 'Phantom Wallet not installed',
        }));
      }
    };

    checkPhantomWallet();
  }, []);

  // Connect wallet
  const connectWallet = useCallback(async () => {
    setWallet((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const { solana } = window as any;

      if (!solana?.isPhantom) {
        throw new Error('Phantom Wallet not installed');
      }

      const response = await solana.connect();
      const publicKey = response.publicKey.toString();

      // Fetch balance
      const balance = await getWalletBalance(publicKey);

      setWallet({
        isConnected: true,
        publicKey,
        balance,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      setWallet((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Failed to connect wallet',
      }));
    }
  }, []);

  // Disconnect wallet
  const disconnectWallet = useCallback(async () => {
    try {
      const { solana } = window as any;
      if (solana?.isPhantom) {
        await solana.disconnect();
      }

      setWallet({
        isConnected: false,
        publicKey: null,
        balance: 0,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      setWallet((prev) => ({
        ...prev,
        error: error.message || 'Failed to disconnect wallet',
      }));
    }
  }, []);

  // Refresh balance
  const refreshBalance = useCallback(async () => {
    if (!wallet.publicKey) return;

    try {
      const balance = await getWalletBalance(wallet.publicKey);
      setWallet((prev) => ({ ...prev, balance }));
    } catch (error: any) {
      setWallet((prev) => ({
        ...prev,
        error: error.message || 'Failed to refresh balance',
      }));
    }
  }, [wallet.publicKey]);

  // Get display address
  const displayAddress = wallet.publicKey ? truncateAddress(wallet.publicKey) : null;

  return {
    wallet,
    connectWallet,
    disconnectWallet,
    refreshBalance,
    displayAddress,
  };
};
