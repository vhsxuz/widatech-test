import { Router } from "express";
import { createNewTransaction, getAllTransactions, getTransactionById } from "../controller/transaction_controller.js";

const router = Router();

router.route("/")
  .get(getAllTransactions)
  .post(createNewTransaction)

  router.route("/:id")
  .get(getTransactionById)

export default router;
