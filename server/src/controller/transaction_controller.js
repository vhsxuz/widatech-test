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

const countTotal = (item) => {
  let total = 0;
  for (const details of item.transaction_details) {
    total += details.quantity * details.products.price;
  }
  return total;
};

export const getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await prisma.transactionHeaders.findMany(includeOptions);

    const formattedTransactions = transactions.map((transaction) => {
      const total = transaction.transaction_details.reduce((acc, detail) => {
        return acc + detail.quantity * detail.products.price;
      }, 0);

      return {
       ...transaction,
        total_price: total,
      };
    });

    return res.status(200).json({
      success: true,
      count: formattedTransactions.length,
      transactions: formattedTransactions,
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
  console.log(id)
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

    const total = transaction.transaction_details.reduce((acc, detail) => {
      return acc + detail.quantity * detail.products.price;
    }, 0);

    return res.status(200).json({
      success: true,
      transaction: {
        ...transaction,
        total_price: total,
      }
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

    // Find or create customer
    let customer = await prisma.customers.findFirst({ where: { name: capitalizedCustomerName } });
    if (!customer) {
      customer = await prisma.customers.create({ data: { name: capitalizedCustomerName } });
    }

    const customerId = customer.id;

    const capitalizedSalesName = capitalizeName(sales_name);

    // Find or create sales
    let sales = await prisma.sales.findFirst({ where: { name: capitalizedSalesName } });
    if (!sales) {
      sales = await prisma.sales.create({ data: { name: capitalizedSalesName } });
    }

    const salesId = sales.id;

    // Create transaction
    const transaction = await prisma.transactionHeaders.create({
      data: {
        customer_id: customerId,
        sales_id: salesId,
        payment_method_id: payment_method_id || null, // Handle undefined payment_method_id
        notes: notes || null,
        transaction_date: new Date(),
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