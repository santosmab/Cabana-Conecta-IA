'use client';

import React, { useMemo } from 'react';
import { Transaction } from '@/types';
import { formatAmount, formatDate, truncateAddress } from '@/utils/validators';
import { ArrowDownLeft, ArrowUpRight, Gift, TrendingUp } from 'lucide-react';

interface TransactionHistoryProps {
  transactions: Transaction[];
  maxItems?: number;
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions, maxItems = 5 }) => {
  const displayTransactions = useMemo(
    () => transactions.slice(0, maxItems),
    [transactions, maxItems]
  );

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return <ArrowUpRight className="text-red-500" size={20} />;
      case 'receive':
        return <ArrowDownLeft className="text-green-500" size={20} />;
      case 'donation':
        return <Gift className="text-purple-500" size={20} />;
      default:
        return <TrendingUp className="text-gray-500" size={20} />;
    }
  };

  const getTransactionLabel = (type: string) => {
    switch (type) {
      case 'payment':
        return 'Pagamento Enviado';
      case 'receive':
        return 'Pagamento Recebido';
      case 'donation':
        return 'Doação Enviada';
      default:
        return 'Transação';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Histórico de Transações</h2>

      {displayTransactions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>Nenhuma transação encontrada</p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-4">
                {getTransactionIcon(transaction.type)}
                <div>
                  <p className="font-medium text-gray-800">{getTransactionLabel(transaction.type)}</p>
                  <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
                  {transaction.description && (
                    <p className="text-sm text-gray-600">{transaction.description}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className={`font-bold ${transaction.type === 'payment' ? 'text-red-600' : 'text-green-600'}`}>
                    {transaction.type === 'payment' ? '-' : '+'} {formatAmount(transaction.amount)} SOL
                  </p>
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getStatusColor(transaction.status)}`}>
                    {transaction.status === 'confirmed' ? 'Confirmado' : transaction.status === 'pending' ? 'Pendente' : 'Falhou'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {transactions.length > maxItems && (
        <button className="w-full mt-4 text-blue-600 hover:text-blue-700 font-semibold py-2">
          Ver Todos ({transactions.length})
        </button>
      )}
    </div>
  );
};
