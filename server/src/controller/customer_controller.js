import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCustomer = async (req, res, next) => {
  const { name } = req.body;

  const customers = await prisma.customers.findMany();
  const index = customers.length + 1;

  const customerData = {
    id: index,
    name: name
  }

  const newCustomer = await prisma.customers.create({
    data: customerData
  })

  if (!newCustomer) {
    return res.status(500).json({
      success: false,
      message: "Customer Failed to Create"
    });
  }

  return res.status(200).json({
    success: true,
    customer: newCustomer
  });

}