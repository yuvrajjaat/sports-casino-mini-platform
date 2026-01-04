import express from "express";
import { getGames } from "../controllers/games.controller.js";

const router = express.Router();

router.get("/", getGames);

export default router;
