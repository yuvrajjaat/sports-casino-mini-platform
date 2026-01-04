import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import gamesRoutes from "./routes/games.routes.js";
import favoritesRoutes from "./routes/favorites.routes.js";
import { auth } from "./middleware/auth.middleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/games", auth, gamesRoutes);
app.use("/favorites", auth, favoritesRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Casino API is running" });
});

export default app;
