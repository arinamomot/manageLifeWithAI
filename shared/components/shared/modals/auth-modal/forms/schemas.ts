import { z } from 'zod';

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

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
export type TFormProfileValues = z.infer<typeof formProfileSchema>;
