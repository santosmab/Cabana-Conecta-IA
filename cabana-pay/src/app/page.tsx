'use client';

import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

import { Header } from '@/components/Header';
import { WalletConnect } from '@/components/WalletConnect';
import { PaymentForm } from '@/components/PaymentForm';
import { TransactionHistory } from '@/components/TransactionHistory';
import { DonationCard } from '@/components/DonationCard';
import { useWallet } from '@/hooks/useWallet';
import { useTransactions } from '@/hooks/useTransactions';
import { CommunityWallet } from '@/types';

// Mock community wallets for donations
const COMMUNITY_WALLETS: CommunityWallet[] = [
  {
    id: '1',
    name: 'Educação Comunitária',
    address: 'SysvarC1qosKSrCatNjSvqkTQQPoBkSYRcNMb5iMVP',
    description: 'Apoie projetos de educação na comunidade',
    totalReceived: 45.5,
    transactionCount: 23,
  },
  {
    id: '2',
    name: 'Saúde Local',
    address: 'TokenkegQfeZyiNwAJsyFbPVwwQQfvrCkg6kuHvx20soP',
    description: 'Contribua para iniciativas de saúde comunitária',
    totalReceived: 78.3,
    transactionCount: 42,
  },
  {
    id: '3',
    name: 'Desenvolvimento Social',
    address: '11111111111111111111111111111111',
    description: 'Investir no desenvolvimento da comunidade',
    totalReceived: 120.75,
    transactionCount: 67,
  },
];

export default function Home() {
  const { wallet, connectWallet, refreshBalance } = useWallet();
  const { transactions, loadTransactions, makePayment, addDonation, isLoading } = useTransactions();

  // Load transactions on mount
  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  // Handle payment submission
  const handlePayment = async (paymentRequest: any) => {
    const result = await makePayment(paymentRequest);
    if (result.success) {
      toast.success('Pagamento realizado com sucesso!');
      setTimeout(() => refreshBalance(), 1000);
    } else {
      toast.error(result.error || 'Falha ao processar pagamento');
    }
  };

  // Handle donation
  const handleDonation = (walletId: string, amount: number) => {
    const wallet = COMMUNITY_WALLETS.find((w) => w.id === walletId);
    if (wallet) {
      addDonation(amount, wallet.address, wallet.name);
      toast.success(`Doação de ${amount} SOL enviada para ${wallet.name}!`);
      setTimeout(() => refreshBalance(), 1000);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      {/* Header */}
      <Header balance={wallet.balance} isConnected={wallet.isConnected} />

      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
          <WalletConnect />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {!wallet.isConnected ? (
          // Not Connected State
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center space-y-6">
              <div className="text-5xl">🔐</div>
              <h1 className="text-2xl font-bold text-gray-800">Bem-vindo ao CabanaPay</h1>
              <p className="text-gray-600">
                Conecte sua carteira Phantom para começar a fazer pagamentos rápidos e seguros com Solana.
              </p>
              <button
                onClick={connectWallet}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
              >
                Conectar Carteira
              </button>
              <div className="text-sm text-gray-500 space-y-2">
                <p>💡 Precisa de uma carteira? Instale o Phantom em phantom.app</p>
                <p>🧪 Este app usa a rede Devnet do Solana para testes</p>
              </div>
            </div>
          </div>
        ) : (
          // Connected State
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Payment Form */}
              <PaymentForm
                onSubmit={handlePayment}
                isLoading={isLoading}
                disabled={!wallet.isConnected}
              />

              {/* Transaction History */}
              <TransactionHistory transactions={transactions} maxItems={10} />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Donations Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800">Apoie a Comunidade</h3>
                {COMMUNITY_WALLETS.map((communityWallet) => (
                  <DonationCard
                    key={communityWallet.id}
                    wallet={communityWallet}
                    onDonate={(amount) => handleDonation(communityWallet.id, amount)}
                    isLoading={isLoading}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-white mb-4">Sobre CabanaPay</h4>
              <p className="text-sm">
                Plataforma de inclusão financeira baseada na blockchain Solana, proporcionando pagamentos rápidos e seguros.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Links Rápidos</h4>
              <ul className="text-sm space-y-2">
                <li>
                  <a href="#" className="hover:text-white">Documentação</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">GitHub</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">Suporte</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Tecnologias</h4>
              <ul className="text-sm space-y-2">
                <li>Solana Web3</li>
                <li>Next.js + React</li>
                <li>TailwindCSS</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>&copy; 2024 CabanaPay. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
