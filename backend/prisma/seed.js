import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.favorite.deleteMany({});
  await prisma.game.deleteMany({});
  await prisma.user.deleteMany({});

  // Seed games
  await prisma.game.createMany({
    data: [
      // Cricket
      { name: "MI vs CSK", sport: "Cricket", league: "IPL" },
      { name: "RCB vs KKR", sport: "Cricket", league: "IPL" },
      { name: "India vs Australia", sport: "Cricket", league: "Test Series" },
      { name: "England vs Pakistan", sport: "Cricket", league: "ODI Series" },
      
      // Football
      { name: "Real Madrid vs Barcelona", sport: "Football", league: "La Liga" },
      { name: "Man City vs Arsenal", sport: "Football", league: "EPL" },
      { name: "Liverpool vs Man United", sport: "Football", league: "EPL" },
      { name: "Bayern vs Dortmund", sport: "Football", league: "Bundesliga" },
      { name: "PSG vs Marseille", sport: "Football", league: "Ligue 1" },
      
      // Tennis
      { name: "Djokovic vs Alcaraz", sport: "Tennis", league: "Wimbledon" },
      { name: "Nadal vs Federer", sport: "Tennis", league: "French Open" },
      { name: "Serena vs Venus", sport: "Tennis", league: "US Open" },
    ]
  });

  console.log("✅ Seeded games successfully");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

