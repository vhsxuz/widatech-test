import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllTransactions = async (req, res, next) => {
  const transactions = await prisma.transactionHeaders.findMany({
    include: {
      customers: true,
      sales: true,
      payment_methods: true,
      transaction_details: {
        include: {
          products: true
        }
      }
    }
  })

  if (!transactions) {
    return res.status(500).json({
      success: false,
      message: "Transaction not found"
    });
  }

  return res.status(200).json({
    success: true,
    count: transactions.length,
    transactions: transactions
  });
}

export const getTransactionById = async (req, res, next) => {
  const { id } = req.params;
  const transaction = await prisma.transactionHeaders.findUnique({
    where: {
      id: parseInt(id)
    },
    include: {
      customers: true,
      sales: true,
      payment_methods: true,
      transaction_details: {
        include: {
          products: true
        }
      }
    }
  })

  if (!transaction) {
    return res.status(500).json({
      success: false,
      message: "Transaction not found"
    });
  }

  return res.status(200).json({
    success: true,
    transaction: transaction
  });
}