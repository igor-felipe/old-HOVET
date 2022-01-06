import express from "express";
import HealthController from "../controllers/health";

const router = express.Router();

router.get("/health", async (_req, res) => {
  const controller = new HealthController();
  const response = await controller.getMessage();
  return res.send(response);
});

export default router;
