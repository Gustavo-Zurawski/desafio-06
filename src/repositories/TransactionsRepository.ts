import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    const { transactions } = this;

    return transactions;
  }

  public getBalance(): Balance {
    // TODO
    const incomes = this.transactions.reduce(
      (acumulador: number, transaction: Transaction) => {
        if (transaction.type === 'income') {
          return acumulador + transaction.value;
        }
        return acumulador;
      },
      0,
    );

    const outcomes = this.transactions.reduce(
      (acumulador: number, transaction: Transaction) => {
        if (transaction.type === 'outcome') {
          return acumulador + transaction.value;
        }
        return acumulador;
      },
      0,
    );

    const total = incomes - outcomes;

    return {
      income: incomes,
      outcome: outcomes,
      total,
    };
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
