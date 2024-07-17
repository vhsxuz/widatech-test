import { Router } from "express";
import { getAllTransactions, getTransactionById } from "../controller/transaction_controller.js";

const router = Router();

router.route("/")
  .get(getAllTransactions)

  router.route("/:id")
  .get(getTransactionById)

export default router;
