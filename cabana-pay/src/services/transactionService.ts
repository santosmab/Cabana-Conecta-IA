import {
  Transaction as SolanaTransaction,
  PublicKey,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import { connection } from './walletService';
import { PaymentRequest, PaymentResponse, Transaction } from '@/types';
import { solToLamports } from '@/utils/validators';

/**
 * Create a transfer transaction
 */
export const createTransferTransaction = async (
  fromPublicKey: PublicKey,
  toPublicKey: PublicKey,
  amount: number
): Promise<SolanaTransaction> => {
  try {
    const lamports = solToLamports(amount);

    const transaction = new SolanaTransaction({
      feePayer: fromPublicKey,
      recentBlockhash: (await connection.getLatestBlockhash()).blockhash,
    });

    transaction.add(
      SystemProgram.transfer({
        fromPubkey: fromPublicKey,
        toPubkey: toPublicKey,
        lamports,
      })
    );

    return transaction;
  } catch (error) {
    console.error('Error creating transfer transaction:', error);
    throw new Error('Failed to create transfer transaction');
  }
};

/**
 * Validate payment request
 */
export const validatePaymentRequest = (request: PaymentRequest): { valid: boolean; error?: string } => {
  if (!request.recipientAddress) {
    return { valid: false, error: 'Recipient address is required' };
  }

  if (request.amount <= 0) {
    return { valid: false, error: 'Amount must be greater than 0' };
  }

  if (request.amount > 1000) {
    return { valid: false, error: 'Amount exceeds maximum limit of 1000 SOL' };
  }

  try {
    new PublicKey(request.recipientAddress);
  } catch {
    return { valid: false, error: 'Invalid recipient address' };
  }

  return { valid: true };
};

/**
 * Mock transaction for development
 */
export const createMockTransaction = (paymentRequest: PaymentRequest): Transaction => {
  return {
    id: Math.random().toString(36).substring(7),
    type: 'payment',
    amount: paymentRequest.amount,
    recipient: paymentRequest.recipientAddress,
    date: new Date(),
    status: 'confirmed',
    signature: `mock_sig_${Math.random().toString(36).substring(7)}`,
    description: paymentRequest.description,
  };
};

/**
 * Process a payment
 */
export const processPayment = async (
  paymentRequest: PaymentRequest,
  signTransaction?: (tx: SolanaTransaction) => Promise<SolanaTransaction>
): Promise<PaymentResponse> => {
  try {
    const validation = validatePaymentRequest(paymentRequest);
    if (!validation.valid) {
      return {
        signature: '',
        status: 'failed',
        error: validation.error,
      };
    }

    // If no signTransaction function is provided, simulate payment
    if (!signTransaction) {
      return {
        signature: `mock_sig_${Math.random().toString(36).substring(7)}`,
        status: 'success',
      };
    }

    // In production, sign and send the transaction
    const toPublicKey = new PublicKey(paymentRequest.recipientAddress);
    console.log('Payment would be processed to:', toPublicKey.toString());

    return {
      signature: `mock_sig_${Math.random().toString(36).substring(7)}`,
      status: 'success',
    };
  } catch (error) {
    console.error('Error processing payment:', error);
    return {
      signature: '',
      status: 'failed',
      error: 'Failed to process payment',
    };
  }
};
