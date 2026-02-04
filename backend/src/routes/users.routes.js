import { Router } from "express";
import {
  addToHistory,
  getUserHistory,
  login,
  register,
  logout,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/add-to-activity").post(addToHistory);
router.route("/get-all-activity").get(getUserHistory);
router.route("/logout").post(logout);

export default router;
