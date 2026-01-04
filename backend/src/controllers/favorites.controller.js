import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const toggleFavorite = async (req, res) => {
  try {
    const { gameId } = req.params;
    const userId = req.user.id;

    const exists = await prisma.favorite.findFirst({
      where: { userId, gameId: Number(gameId) }
    });

    if (exists) {
      await prisma.favorite.delete({ where: { id: exists.id } });
      return res.json({ removed: true, message: "Removed from favorites" });
    }

    await prisma.favorite.create({
      data: { userId, gameId: Number(gameId) }
    });

    res.json({ added: true, message: "Added to favorites" });
  } catch (error) {
    res.status(500).json({ message: "Error toggling favorite", error: error.message });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: {
        game: true
      }
    });
    
    const games = favorites.map(fav => ({
      ...fav.game,
      isFavorite: true
    }));
    
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: "Error fetching favorites", error: error.message });
  }
};
