import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCustomer = async (req, res, next) => {
  const { name } = req.body;

  try {
    const newCustomer = await prisma.customers.create({
      data: {
        name
      }
    });

    return res.status(200).json({
      success: true,
      customer: newCustomer
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Customer failed to create"
    });
  }
}