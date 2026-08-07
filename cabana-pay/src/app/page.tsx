'use client';

import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

import { Header } from '@/components/Header';
import { PaymentForm } from '@/components/PaymentForm';
import { TransactionHistory } from '@/components/TransactionHistory';
import { DonationCard } from '@/components/DonationCard';
import { useWallet } from '@/hooks/useWallet';
import { useTransactions } from '@/hooks/useTransactions';
import { CommunityWallet } from '@/types';

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

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const handlePayment = async (paymentRequest: any) => {
    const result = await makePayment(paymentRequest);
    if (result.success) {
      toast.success('Pagamento realizado com sucesso!');
      setTimeout(() => refreshBalance(), 1000);
    } else {
      toast.error(result.error || 'Falha ao processar pagamento');
    }
  };

  const handleDonation = (walletId: string, amount: number) => {
    const communityWallet = COMMUNITY_WALLETS.find((w) => w.id === walletId);
    if (communityWallet) {
      addDonation(amount, communityWallet.address, communityWallet.name);
      toast.success(`Doação de ${amount} SOL enviada para ${communityWallet.name}!`);
      setTimeout(() => refreshBalance(), 1000);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Toaster position="top-right" />

      <Header balance={wallet.balance} isConnected={wallet.isConnected} />

      <section className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_0.9fr] items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-2 text-sm font-semibold text-blue-100">
                Terceiro lugar no Ideaton Solana
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
                CabanaPay: inclusão financeira local com Solana
              </h1>
              <p className="max-w-2xl text-lg text-slate-300">
                Projeto em andamento vinculado ao Minas Negras do CGRAI/CEFET-MG. Plataforma Web3 para pagamentos, doações e histórico transparente na rede Solana.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href="#app-demo"
                  className="inline-flex items-center justify-center rounded-full bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-400 transition"
                >
                  Conheça o protótipo
                </a>
                <a
                  href="https://www.cgrai.cefetmg.br/2025/08/12/projeto-minas-negras/?utm_source=chatgpt.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition"
                >
                  Projeto Minas Negras
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur-sm">
              <div className="rounded-3xl bg-slate-900/90 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Status do projeto</p>
                <h2 className="mt-4 text-3xl font-semibold text-white">Em andamento</h2>
                <p className="mt-3 text-slate-300">
                  MVP em desenvolvimento com foco em pagamentos comunitários, integração Phantom e doações transparentes para a comunidade local.
                </p>
              </div>
              <div className="grid gap-4 mt-6 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-4">
                  <p className="text-sm text-slate-400">Blockchain</p>
                  <p className="mt-3 text-xl font-semibold text-white">Solana</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-4">
                  <p className="text-sm text-slate-400">Competição</p>
                  <p className="mt-3 text-xl font-semibold text-white">Ideaton Solana</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-4">
                  <p className="text-sm text-slate-400">Vantagem</p>
                  <p className="mt-3 text-xl font-semibold text-white">Baixo custo</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-4">
                  <p className="text-sm text-slate-400">Impacto</p>
                  <p className="mt-3 text-xl font-semibold text-white">Transparência</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">Contexto</h3>
              <p className="mt-4 text-slate-600">
                O CabanaPay nasceu para atender comunidades com pouco acesso a serviços financeiros formais. O projeto está ligado ao programa Minas Negras e teve reconhecimento no Ideaton Solana.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">Problema</h3>
              <p className="mt-4 text-slate-600">
                Pequenos comerciantes e moradores enfrentam pagamentos informais, falta de transparência e dificuldade para realizar doações seguras. O CabanaPay busca resolver isso com tecnologia blockchain.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">Proposta</h3>
              <p className="mt-4 text-slate-600">
                Plataforma acessível que une usuários, comerciantes e iniciativas sociais por meio de pagamentos rápidos, doações transparentes e histórico verificável na Solana.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.32em] text-blue-600">Funcionalidades</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">O que o CabanaPay entrega</h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">Carteira Phantom</h3>
              <p className="mt-4 text-slate-600">Conexão direta com Phantom para pagamentos e doações na rede Solana.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">Pagamentos rápidos</h3>
              <p className="mt-4 text-slate-600">Transações com baixo custo e confirmação em segundos, ideal para comércio local.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">Doações transparentes</h3>
              <p className="mt-4 text-slate-600">Apoie causas comunitárias com registros claros e acessíveis.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="app-demo" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-10 text-center">
            <p className="text-sm uppercase tracking-[0.24em] text-blue-600">Demonstração</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900">Experimente o protótipo</h2>
            <p className="mt-3 max-w-2xl mx-auto text-slate-600">
              Conecte sua carteira Phantom e acompanhe pagamentos, doações e o histórico de transações no MVP em desenvolvimento.
            </p>
          </div>

          <div className="grid gap-8 xl:grid-cols-[1.4fr_0.9fr]">
            <div className="space-y-8">
              {!wallet.isConnected ? (
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center shadow-sm">
                  <p className="text-sm font-semibold text-blue-600">Conecte sua carteira</p>
                  <h3 className="mt-4 text-2xl font-bold text-slate-900">Teste o fluxo com Phantom Wallet</h3>
                  <p className="mt-4 text-slate-600">A carteira é necessária para criar uma experiência real de pagamento e doação no ambiente Devnet Solana.</p>
                  <button
                    onClick={connectWallet}
                    disabled={wallet.isLoading}
                    className="mt-8 inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white hover:bg-blue-500 transition disabled:opacity-50"
                  >
                    {wallet.isLoading ? 'Conectando...' : 'Conectar Phantom'}
                  </button>
                </div>
              ) : (
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 shadow-sm">
                  <p className="text-sm font-semibold text-slate-500">Carteira conectada</p>
                  <h3 className="mt-4 text-2xl font-bold text-slate-900">Saldo disponível</h3>
                  <p className="mt-4 text-4xl font-extrabold text-slate-900">{wallet.balance.toFixed(4)} SOL</p>
                  <p className="mt-3 text-slate-600">Use o painel abaixo para enviar pagamentos e apoiar causas da comunidade.</p>
                </div>
              )}

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">Doações em destaque</h3>
                <div className="mt-6 space-y-4">
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

            <div className="space-y-8">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
                <PaymentForm
                  onSubmit={handlePayment}
                  isLoading={isLoading}
                  disabled={!wallet.isConnected}
                />
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
                <TransactionHistory transactions={transactions} maxItems={10} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-3">
            <div>
              <h4 className="text-lg font-semibold text-white">CabanaPay</h4>
              <p className="mt-4 text-slate-400">Iniciativa de inclusão financeira local com tecnologia blockchain para fortalecer o comércio e o apoio social na comunidade.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">Links</h4>
              <ul className="mt-4 space-y-3 text-slate-400">
                <li>
                  <a href="#app-demo" className="hover:text-white">Demonstração</a>
                </li>
                <li>
                  <a href="https://www.cgrai.cefetmg.br/2025/08/12/projeto-minas-negras/?utm_source=chatgpt.com" target="_blank" rel="noreferrer" className="hover:text-white">
                    Minas Negras
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">Tecnologias</h4>
              <ul className="mt-4 space-y-3 text-slate-400">
                <li>Next.js + React</li>
                <li>Solana Web3</li>
                <li>Phantom Wallet</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-slate-800 pt-6 text-sm text-slate-500 text-center">
            <p>Projeto em andamento — terceira colocação no Ideaton Solana.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
