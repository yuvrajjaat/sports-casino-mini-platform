import express from "express";
import { toggleFavorite, getFavorites } from "../controllers/favorites.controller.js";

const router = express.Router();

router.post("/:gameId", toggleFavorite);
router.delete("/:gameId", toggleFavorite);
router.get("/", getFavorites);

export default router;
