// Transaction types
export type TransactionType = 'payment' | 'receive' | 'donation';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  recipient?: string;
  sender?: string;
  date: Date;
  signature?: string;
  status: 'pending' | 'confirmed' | 'failed';
  description?: string;
}

// Wallet types
export interface WalletState {
  isConnected: boolean;
  publicKey: string | null;
  balance: number;
  isLoading: boolean;
  error: string | null;
}

// Payment types
export interface PaymentRequest {
  amount: number;
  recipientAddress: string;
  description?: string;
}

export interface PaymentResponse {
  signature: string;
  status: 'success' | 'failed';
  error?: string;
}

// Community Donation types
export interface CommunityWallet {
  id: string;
  name: string;
  address: string;
  description: string;
  totalReceived: number;
  transactionCount: number;
  image?: string;
}

// QR Code types
export interface QRCodeData {
  walletAddress: string;
  amount?: number;
  label?: string;
}
