"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { FormInput } from "../../form/form-input";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  formNewHabitSchema,
  TFormNewHabitValues,
} from "../../modals/auth-modal/forms/schemas";
import toast from "react-hot-toast";
import { createHabit } from "@/app/actions";
import { User } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { HabitTracker } from "@/shared/constants/types";
import { useState } from "react";
import { RequiredSymbol } from "../../required-symbol";

interface NewHabitModalProps {
  user: User;
  open: boolean;
  onClose: () => void;
  onHabitCreated: () => void;
}

export const NewHabitModal: React.FC<NewHabitModalProps> = ({
  user,
  open,
  onClose,
  onHabitCreated,
}) => {
  const [priority, setPriority] = useState<HabitTracker.PriorityType>(
    HabitTracker.priorityOptions[0]
  );
  const [color, setColor] = useState<HabitTracker.ColorType>(
    HabitTracker.colorOptions[0]
  );

  const form = useForm<TFormNewHabitValues>({
    resolver: zodResolver(formNewHabitSchema),
    mode: "onChange",
    defaultValues: {
      habitName: "",
      goal: undefined,
      priority: HabitTracker.priorityOptions[0],
      color: HabitTracker.colorOptions[0],
    },
  });

  const handleClose = () => {
    form.reset();
    setPriority(HabitTracker.priorityOptions[0]);
    setColor(HabitTracker.colorOptions[0]);
    onClose();
  };

  const onSubmit = async (data: TFormNewHabitValues) => {
    try {
      await createHabit({
        name: data.habitName,
        goal: data.goal,
        priority: data.priority,
        color: data.color,
        user: {
          connect: {
            id: user.id,
          },
        },
      });

      toast.success("Habit created successfully 📝", {
        icon: "✅",
      });

      onHabitCreated?.();
      handleClose();
    } catch (error) {
      console.log("error", error);
      return toast.error("Failed to create habit", {
        icon: "❌",
      });
    }
  };

  const handleColorSelect = (selectedColor: HabitTracker.ColorType) => {
    setColor(selectedColor);
    form.setValue("color", selectedColor);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        aria-describedby="new-habit-modal"
        className="w-[750px] bg-white px-8 py-6 max-h-[100%] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle>Create New Habit</DialogTitle>
        </DialogHeader>
        <DialogDescription className="hidden" />
        <FormProvider {...form}>
          <form
            id="new-habit-form"
            className="flex flex-col gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormInput
              type="text"
              label="Habit Name"
              name="habitName"
              placeholder="Eg. Exercise"
              required
              className="mb-2"
            />
            <div className="flex gap-4">
              <div className="flex-1">
                <FormInput
                  type="number"
                  label="Goal"
                  name="goal"
                  min={1}
                  placeholder="Number of times per month"
                  required
                />
              </div>
              <div className="flex-1">
                <p className="font-medium mb-2">
                  Priority <RequiredSymbol />
                </p>
                <Select
                  name="priority"
                  value={priority}
                  onValueChange={(value: HabitTracker.PriorityType) =>
                    setPriority(value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {HabitTracker.priorityOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4">
              <p className="font-medium mb-2">
                Color <RequiredSymbol />
              </p>
              <div className="flex gap-2">
                {HabitTracker.colorOptions.map((colorOption) => (
                  <button
                    key={colorOption}
                    type="button"
                    onClick={() => handleColorSelect(colorOption)}
                    className={`w-8 h-8 rounded-full transition-all ${colorOption} ${
                      color === colorOption
                        ? "ring-2 ring-gray-600 scale-110"
                        : ""
                    }`}
                  />
                ))}
              </div>
            </div>
          </form>
        </FormProvider>
        <DialogFooter>
          <Button variant="default" type="submit" form="new-habit-form">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
