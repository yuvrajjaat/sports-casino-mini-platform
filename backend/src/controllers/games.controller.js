import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getGames = async (req, res) => {
  try {
    const { sport } = req.query;
    const games = await prisma.game.findMany({
      where: sport ? { sport } : {},
      include: {
        favorites: {
          where: { userId: req.user.id }
        }
      }
    });
    
    const gamesWithFavorites = games.map(game => ({
      ...game,
      isFavorite: game.favorites.length > 0,
      favorites: undefined
    }));
    
    res.json(gamesWithFavorites);
  } catch (error) {
    res.status(500).json({ message: "Error fetching games", error: error.message });
  }
};
