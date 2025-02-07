import { prisma } from "@/prisma/prisma-client";

export const getHabits = async (userId: number) => {
  const habits = await prisma.habit.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      userId,
    },
    include: {
      entries: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const habitsWithEntries = habits.map((habit) => ({
    ...habit,
    entries: habit.entries.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()),
  }));

  console.log("Habits with entries:", habitsWithEntries);

  return habitsWithEntries;
};
