import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createSales = async (req, res, next) => {
  const { name } = req.body;

  try {
    const newSales = await prisma.sales.create({
      data: {
        name
      }
    });

    return res.status(200).json({
      success: true,
      customer: newSales
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Sales failed to create"
    });
  }
}