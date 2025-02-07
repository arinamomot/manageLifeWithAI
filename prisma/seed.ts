import { prisma } from './prisma-client';
import { hashSync } from 'bcrypt';

async function up() {
  await prisma.user.createMany({
    data: [
      {
        firstName: 'User',
        lastName: 'Test',
        email: 'user@test.com',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
      },
      {
        firstName: 'Admin',
        lastName: 'Admin',
        email: 'admin@test.com',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'ADMIN',
      },
    ],
  });

  // First, get the test user's ID
  const testUser = await prisma.user.findUnique({
    where: {
      email: 'user@test.com'
    }
  });

  if (!testUser) {
    throw new Error('Test user not found');
  }

  // Add habits with the actual user ID
  await prisma.habit.createMany({
    data: [
      {
        name: 'Exercise',
        priority: 'Low',
        color: 'bg-blue-100',
        userId: testUser.id,
        goal: 3,
        achieved: 0,
      },
      {
        name: 'Read',
        priority: 'Medium',
        color: 'bg-green-100',
        userId: testUser.id,
        goal: 4,
        achieved: 2,
      },
      {
        name: 'Meditate',
        priority: 'High',
        color: 'bg-purple-100',
        userId: testUser.id,
        goal: 5,
        achieved: 5,
      },
    ],
  });

  // Get only the habits for the test user
  const userHabits = await prisma.habit.findMany({
    where: {
      userId: testUser.id
    }
  });

  // Create some habit entries for the last 7 days
  const today = new Date();
  
  for (const habit of userHabits) {
    const entries = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      return {
        habitId: habit.id,
        date: date,
        completed: Math.random() > 0.5, // Randomly set as completed or not
      };
    });

    await prisma.habitEntry.createMany({
      data: entries,
    });
  }
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "HabitEntry" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Habit" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
