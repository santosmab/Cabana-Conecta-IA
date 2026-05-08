import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

// Devnet RPC endpoint
const DEVNET_RPC = 'https://api.devnet.solana.com';

export const connection = new Connection(DEVNET_RPC, 'confirmed');

/**
 * Get wallet balance in SOL
 */
export const getWalletBalance = async (publicKey: string): Promise<number> => {
  try {
    const pubKey = new PublicKey(publicKey);
    const balance = await connection.getBalance(pubKey);
    return balance / LAMPORTS_PER_SOL;
  } catch (error) {
    console.error('Error fetching wallet balance:', error);
    throw new Error('Failed to fetch wallet balance');
  }
};

/**
 * Get transaction history for a wallet
 */
export const getTransactionHistory = async (publicKey: string, limit: number = 10) => {
  try {
    const pubKey = new PublicKey(publicKey);
    const signatures = await connection.getSignaturesForAddress(pubKey, { limit });
    return signatures;
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    throw new Error('Failed to fetch transaction history');
  }
};

/**
 * Verify transaction on blockchain
 */
export const verifyTransaction = async (signature: string) => {
  try {
    const tx = await connection.getTransaction(signature);
    return tx;
  } catch (error) {
    console.error('Error verifying transaction:', error);
    throw new Error('Failed to verify transaction');
  }
};

/**
 * Get token accounts for a wallet
 */
export const getTokenAccounts = async (publicKey: string) => {
  try {
    const pubKey = new PublicKey(publicKey);
    const tokenAccounts = await connection.getTokenAccountsByOwner(pubKey, {
      programId: new PublicKey('TokenkegQfeZyiNwAJsyFbPVwwQQfvrCkg6kuHvx20soP'),
    });
    return tokenAccounts;
  } catch (error) {
    console.error('Error fetching token accounts:', error);
    return null;
  }
};

/**
 * Check if address is valid on devnet
 */
export const verifyAddressOnDevnet = async (address: string): Promise<boolean> => {
  try {
    const pubKey = new PublicKey(address);
    const accountInfo = await connection.getAccountInfo(pubKey);
    return accountInfo !== null;
  } catch {
    return false;
  }
};
