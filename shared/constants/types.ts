export type LoginType = "login" | "register";

export type DeleteActionType = "delete" | "reset";

export type AccountType = "email" | "google" | "github";

export namespace HabitTracker  {
    export const priorityOptions = ["Low", "Medium", "High"] as const;
    export type PriorityType = typeof priorityOptions[number];

    export const colorOptions = ["bg-blue-100", "bg-green-100", "bg-red-100", "bg-yellow-100", "bg-purple-100"] as const;
    export type ColorType = typeof colorOptions[number];
   }