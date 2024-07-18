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

export const getRevenue = async (req, res, next) => {
  try {
    const transactions = await prisma.transactionHeaders.findMany({
      include: {
        transaction_details: {
          include: {
            products: true,
          },
        },
      },
    });

    const dailyRevenue = {};
    const weeklyRevenue = {};
    const monthlyRevenue = {};

    transactions.forEach((transaction) => {
      const date = new Date(transaction.transaction_date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      const dailyKey = `${year}-${month}-${day}`;
      let dailyTotal = 0;
      transaction.transaction_details.forEach((detail) => {
        dailyTotal += detail.quantity * detail.products.price;
      });
      dailyRevenue[dailyKey] = (dailyRevenue[dailyKey] || 0) + dailyTotal;

      const week = getWeek(date);
      let weeklyTotal = 0;
      transaction.transaction_details.forEach((detail) => {
        weeklyTotal += detail.quantity * detail.products.price;
      });
      weeklyRevenue[week] = (weeklyRevenue[week] || 0) + weeklyTotal;

      const monthlyKey = `${year}-${month}`;
      let monthlyTotal = 0;
      transaction.transaction_details.forEach((detail) => {
        monthlyTotal += detail.quantity * detail.products.price;
      });
      monthlyRevenue[monthlyKey] = (monthlyRevenue[monthlyKey] || 0) + monthlyTotal;
    });

    return res.status(200).json({
      success: true,
      count: transactions.length,
      revenue: {
        daily: dailyRevenue,
        weekly: weeklyRevenue,
        monthly: monthlyRevenue,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve revenue"
    });
  }
};

function getWeek(date) {
  const onejan = new Date(date.getFullYear(), 0, 1);
  return Math.ceil((((date - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}