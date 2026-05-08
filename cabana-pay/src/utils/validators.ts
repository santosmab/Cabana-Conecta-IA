/**
 * Validates if a string is a valid Solana public key
 */
export const isValidSolanaAddress = (address: string): boolean => {
  try {
    if (!address || typeof address !== 'string') return false;
    if (address.length !== 44 && address.length !== 43) return false;
    // Basic validation - Solana addresses are base58 encoded
    return /^[1-9A-HJ-NP-Z]{43,44}$/.test(address);
  } catch {
    return false;
  }
};

/**
 * Validates if amount is a positive number
 */
export const isValidAmount = (amount: number | string): boolean => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return !isNaN(num) && num > 0 && num <= 1_000_000; // Max 1M SOL for safety
};

/**
 * Format lamports to SOL
 */
export const lamportsToSol = (lamports: number): number => {
  return lamports / 1_000_000_000;
};

/**
 * Format SOL to lamports
 */
export const solToLamports = (sol: number): number => {
  return Math.floor(sol * 1_000_000_000);
};

/**
 * Format display amount with decimals
 */
export const formatAmount = (amount: number, decimals: number = 4): string => {
  return amount.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: decimals,
  });
};

/**
 * Truncate wallet address for display
 */
export const truncateAddress = (address: string, chars: number = 4): string => {
  if (!address) return '';
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};

/**
 * Format date to Brazilian locale
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};
