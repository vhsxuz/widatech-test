import { Router } from "express";
import { getRevenue } from "../controller/revenue_controller.js";

const router = Router();

router.route("/")
  .get(getRevenue)

export default router;
