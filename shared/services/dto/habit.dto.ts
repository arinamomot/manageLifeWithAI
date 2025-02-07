import { Habit, HabitEntry } from "@prisma/client";

export interface HabitDto extends Habit {
    entries: HabitEntry[];
}

