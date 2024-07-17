import { customers } from "./customers.js";
import { sales } from "./sales.js";
import { payment_method } from "./payment_method.js";
import { products } from "./products.js";
import { transaction_headers } from "./transaction_header.js";
import { transaction_details } from "./transaction_detail.js";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  for (let customer of customers) {
    await prisma.customers.create({
      data: customer
    })
  }

  for (let sale of sales) {
    await prisma.sales.create({
      data: sale
    })
  }

  for (let method of payment_method) {
    await prisma.paymentMethods.create({
      data: method
    })
  }

  for (let product of products) {
    await prisma.products.create({
      data: product
    })
  }

  for (let transaction of transaction_headers) {
    await prisma.transactionHeaders.create({
      data: transaction
    })
  }

  for (let details of transaction_details) {
    await prisma.transactionDetails.create({
      data: details
    })
  }

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })