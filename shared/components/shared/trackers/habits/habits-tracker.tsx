"use client";

import { useState, useEffect } from "react";
import {
  format,
  getDaysInMonth,
  startOfMonth,
  addDays,
  isSameDay,
} from "date-fns";
import { Check, ChevronLeft, ChevronRight, Search } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { cn } from "@/shared/lib/utils";
import { NewHabitModal } from "./new-habit-modal";
import { User } from "@prisma/client";
import { HabitDto } from "@/shared/services/dto/habit.dto";
import { useRouter } from "next/navigation";
interface HabitsTrackerProps {
  user: User;
  habits: HabitDto[];
}

export const HabitsTracker: React.FC<HabitsTrackerProps> = ({
  user,
  habits,
}) => {
  const [openNewHabitModal, setOpenNewHabitModal] = useState(false);
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredHabits, setFilteredHabits] = useState<HabitDto[]>([]);

  const daysInMonth = getDaysInMonth(selectedDate);
  const monthStart = startOfMonth(selectedDate);
  const days = Array.from({ length: daysInMonth }, (_, i) =>
    addDays(monthStart, i)
  );

  // Generate array of months
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(selectedDate.getFullYear(), i);
    return {
      value: i.toString(),
      label: format(date, "MMMM"),
    };
  });

  // Generate array of years (10 years before and after current year)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => {
    const year = currentYear - 10 + i;
    return {
      value: year.toString(),
      label: year.toString(),
    };
  });

  // Filter habits based on search term
  useEffect(() => {
    const filtered = habits.filter((habit) =>
      habit.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredHabits(filtered);
  }, [habits, searchTerm]);

  const navigateMonth = (direction: "prev" | "next") => {
    setSelectedDate((current) => {
      const newDate = new Date(current);
      newDate.setMonth(current.getMonth() + (direction === "next" ? 1 : -1));
      return newDate;
    });
  };

  // Calculate achieved count for each habit
  const getAchievedCount = (habit: HabitDto) => {
    return habit.entries.filter((entry) => entry.completed).length;
  };

  //TODO: Toggle habit entry
  const toggleHabitEntry = async (habitId: number, date: Date) => {};

  const refreshHabits = () => {
    router.refresh();
  };

  return (
    <>
      <NewHabitModal
        user={user}
        open={openNewHabitModal}
        onClose={() => setOpenNewHabitModal(false)}
        onHabitCreated={refreshHabits}
      />
      <Card className="m-2 min-w-[60vw] max-h-[90vh] bg-white shadow-sm">
        <CardHeader className="border-b">
          <div className="flex justify-between items-center gap-4">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search habits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 px-2"
                  onClick={() => setSearchTerm("")}
                >
                  Clear
                </Button>
              )}
            </div>

            {/* Date Controls */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateMonth("prev")}
                className="h-10 w-10"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              {/* Month Selection */}
              <Select
                value={selectedDate.getMonth().toString()}
                onValueChange={(value) => {
                  const newDate = new Date(selectedDate);
                  newDate.setMonth(parseInt(value));
                  setSelectedDate(newDate);
                }}
              >
                <SelectTrigger className="w-[140px] h-10">
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Year Selection */}
              <Select
                value={selectedDate.getFullYear().toString()}
                onValueChange={(value) => {
                  const newDate = new Date(selectedDate);
                  newDate.setFullYear(parseInt(value));
                  setSelectedDate(newDate);
                }}
              >
                <SelectTrigger className="w-[100px] h-10">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year.value} value={year.value}>
                      {year.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateMonth("next")}
                className="h-10 w-10"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>

              {/* Quick Date Reset */}
              <Button
                variant="outline"
                size="lg"
                onClick={() => setSelectedDate(new Date())}
                className="h-10 w-10 whitespace-nowrap"
              >
                Today
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 overflow-auto">
          <div className="h-full flex flex-col min-w-[800px]">
            {/* Weekday headers */}
            <div className="grid grid-cols-[minmax(150px,1fr)_8px_repeat(31,30px)_8px_100px_100px] gap-2 mb-2 shrink-0">
              <div /> {/* Empty space for habits column */}
              <div /> {/* Separator */}
              {days.slice(0, 31).map((day) => (
                <div
                  key={day.getDate()}
                  className="text-center text-xs text-gray-500"
                >
                  {format(day, "EEEEE", { weekStartsOn: 1 })}
                </div>
              ))}
            </div>

            {/* Date numbers */}
            <div className="grid grid-cols-[minmax(150px,1fr)_8px_repeat(31,30px)_8px_100px_100px] gap-2 mb-4 shrink-0">
              <div className="font-medium text-gray-500">
                Habits{" "}
                {filteredHabits.length !== habits.length &&
                  `(${filteredHabits.length}/${habits.length})`}
              </div>
              <div className="border-r border-gray-200" />
              {days.map((day) => (
                <div
                  key={day.getDate()}
                  className={cn(
                    "text-center text-sm font-medium text-gray-500",
                    isSameDay(day, new Date()) &&
                      "bg-gray-800 text-white rounded-md"
                  )}
                >
                  {day.getDate()}
                </div>
              ))}
              <div className="border-r border-gray-200" />
              <div className="font-medium text-gray-500 text-center col-span-2">
                Goal
              </div>
              <div className="font-medium text-gray-500 text-center col-span-2">
                Achieved
              </div>
            </div>

            {/* Habits grid */}
            <div className="flex-1">
              {filteredHabits.length > 0 ? (
                filteredHabits.map((habit, index) => (
                  <div
                    key={habit.id}
                    className="grid grid-cols-[minmax(150px,1fr)_8px_repeat(31,30px)_8px_100px_100px] gap-2 mb-2 items-center"
                  >
                    <div className="font-medium text-gray-600">
                      {habit.name}
                    </div>
                    <div className="border-r border-gray-200" />
                    {days.map((day) => {
                      const entry = habit.entries.find((e) =>
                        isSameDay(new Date(e.date), day)
                      );
                      return (
                        <button
                          key={day.getDate()}
                          onClick={() => toggleHabitEntry(habit.id, day)}
                          className={cn(
                            "w-full h-7 flex items-center justify-center transition-colors rounded-none",
                            entry?.completed
                              ? `${habit.color}`
                              : "hover:bg-gray-200"
                          )}
                        >
                          {entry?.completed && (
                            <Check className="h-4 w-4 text-gray-600" />
                          )}
                        </button>
                      );
                    })}
                    <div className="border-r border-gray-200" />
                    <div className="text-center col-span-2 font-medium text-gray-600">
                      {habit.goal}
                    </div>
                    <div
                      className={cn(
                        "text-center font-medium col-span-2",
                        getAchievedCount(habit) === 0
                          ? "text-red-500"
                          : getAchievedCount(habit) >= habit.goal
                          ? "text-green-500"
                          : "text-yellow-500"
                      )}
                    >
                      {getAchievedCount(habit)}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  {habits.length === 0
                    ? "No habits added yet. Create your first habit!"
                    : "No habits found matching your search."}
                </div>
              )}
            </div>
          </div>

          <Button
            variant="ghost"
            className="mt-4 text-gray-500 hover:text-gray-700"
            onClick={() => {
              setOpenNewHabitModal(true);
            }}
          >
            + New Habit
          </Button>
        </CardContent>
      </Card>
    </>
  );
};
