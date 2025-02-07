import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";

export async function GET() {
  try {
    const habits = await prisma.habit.findMany({
      include: {
        entries: true,
      },
    });
    return NextResponse.json(habits);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch habits" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, priority, color } = await req.json();
    const habit = await prisma.habit.create({
      data: {
        name,
        priority,
        color,
        userId: 1,
      },
    });
    return NextResponse.json(habit);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create habit" }, { status: 500 });
  }
}