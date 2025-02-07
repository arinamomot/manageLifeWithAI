import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";

export async function POST(
  req: Request,
  { params }: { params: { habitId: string } }
) {
  try {
    const { date } = await req.json();
    const habitId = parseInt(params.habitId);

    // Find existing entry
    const existingEntry = await prisma.habitEntry.findFirst({
      where: {
        habitId,
        date: new Date(date),
      },
    });

    if (existingEntry) {
      // Toggle existing entry
      const updatedEntry = await prisma.habitEntry.update({
        where: { id: existingEntry.id },
        data: { completed: !existingEntry.completed },
      });
      return NextResponse.json(updatedEntry);
    }

    // Create new entry
    const entry = await prisma.habitEntry.create({
      data: {
        habitId,
        date: new Date(date),
        completed: true,
      },
    });
    return NextResponse.json(entry);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to toggle habit entry" },
      { status: 500 }
    );
  }
}