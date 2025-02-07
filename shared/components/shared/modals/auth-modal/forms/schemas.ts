import { z } from 'zod';
import { HabitTracker } from '@/shared/constants/types';
export const passwordSchema = z.string().min(4, { message: 'Enter a correct password' });

export const formLoginSchema = z.object({
  email: z.string().email({ message: 'Please enter the correct password' }),
  password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema
  .merge(
    z.object({
      firstName: z.string().min(2, { message: 'Enter your First Name' }),
      lastName: z.string().min(2, { message: 'Enter your Last Name' }),
      confirmPassword: passwordSchema,
    }),
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const formProfileSchema = z.object({
  email: z.string().email({ message: 'Please enter the correct Email' }),
  firstName: z.string().min(2, { message: 'Enter your First Name' }),
  lastName: z.string().min(2, { message: 'Enter your Last Name' }),
  password: passwordSchema.optional(),
  confirmPassword: passwordSchema.optional(),
  dateOfBirth: z.string().min(1, { message: 'Enter your birth date' }).optional(),
  gender: z.string().min(1, { message: 'Enter your gender' }).optional(),
})
.refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
  });

export const formNewHabitSchema = z.object({
  habitName: z.string().min(1, { message: 'Enter your habit name' }).max(20, { message: 'Habit name must be less than 30 characters' }),
  goal: z.coerce.number().min(1, { message: 'Enter your goal' }).max(31, { message: 'Goal must be less than 31 days' }),
  priority: z.string().refine((value) => HabitTracker.priorityOptions.includes(value as HabitTracker.PriorityType), { message: 'Select a priority' }),
  color: z.string().refine((value) => HabitTracker.colorOptions.includes(value as HabitTracker.ColorType), { message: 'Select a color' }),
})

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
export type TFormProfileValues = z.infer<typeof formProfileSchema>;
export type TFormNewHabitValues = z.infer<typeof formNewHabitSchema>;