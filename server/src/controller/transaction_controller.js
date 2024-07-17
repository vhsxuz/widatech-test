import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const includeOptions = {
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
};

const capitalizeName = (name) => {
  return name.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export const getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await prisma.transactionHeaders.findMany(includeOptions);
    return res.status(200).json({
      success: true,
      count: transactions.length,
      transactions: transactions
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve transactions"
    });
  }
}

export const getTransactionById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const transaction = await prisma.transactionHeaders.findUnique({
      where: {
        id: parseInt(id)
      },
      ...includeOptions
    });
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found"
      });
    }
    return res.status(200).json({
      success: true,
      transaction: transaction
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve transaction"
    });
  }
}

export const createNewTransaction = async (req, res, next) => {
  const { customer_name, sales_name, payment_method_id, notes } = req.body;

  try {
    const capitalizedCustomerName = capitalizeName(customer_name);

    const customer = await prisma.customers.findFirst({ where: { name: capitalizedCustomerName } });
    const customerId = customer? customer.id : await prisma.customers.create({ data: { name: capitalizedCustomerName } }).then((customer) => customer.id);

    const capitalizedSalesName = capitalizeName(sales_name);

    const sales = await prisma.sales.findFirst({ where: { name: capitalizedSalesName } });
    const salesId = sales? sales.id : await prisma.sales.create({ data: { name: capitalizedSalesName } }).then((sales) => sales.id);

    const transaction = await prisma.transactionHeaders.create({
      data: {
        customer_id: customerId,
        sales_id: salesId,
        payment_method_id,
        notes: notes || null,
        transaction_date: new Date()
      },
    });

    return res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      transaction: transaction,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create transaction",
    });
  }
}