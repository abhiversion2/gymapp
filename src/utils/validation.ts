import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const signupSchema = z
  .object({
    fullName: z
      .string()
      .min(2, 'Full name must be at least 2 characters')
      .max(60, 'Full name must not exceed 60 characters')
      .trim(),
    email: z
      .string()
      .email('Please enter a valid email address')
      .trim()
      .toLowerCase(),
    mobileNumber: z
      .string()
      .min(8, 'Please enter a valid mobile number (min 8 digits)')
      .regex(/^[+0-9\s\-()]+$/, 'Mobile number contains invalid characters')
      .trim(),
    dateOfBirth: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val) return true;
          const date = new Date(val);
          return !isNaN(date.getTime()) && date < new Date();
        },
        { message: 'Date of birth must be a valid date in the past' }
      ),
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: 'You must accept the Terms and Privacy Policy to continue',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignupFormData = z.infer<typeof signupSchema>;
export type SignupInput = SignupFormData;

export const loginSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .trim()
    .toLowerCase(),
  password: z.string().min(1, 'Password is required'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type LoginInput = LoginFormData;

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .trim()
    .toLowerCase(),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ForgotPasswordInput = ForgotPasswordFormData;

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type ResetPasswordInput = ResetPasswordFormData;

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'New passwords do not match',
    path: ['confirmPassword'],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'New password must be different from current password',
    path: ['newPassword'],
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
export type ChangePasswordInput = ChangePasswordFormData;

export const profileUpdateSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(60, 'Full name must not exceed 60 characters')
    .trim(),
  mobileNumber: z
    .string()
    .min(8, 'Please enter a valid mobile number')
    .regex(/^[+0-9\s\-()]+$/, 'Mobile number contains invalid characters')
    .trim(),
  dateOfBirth: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const date = new Date(val);
        return !isNaN(date.getTime()) && date < new Date();
      },
      { message: 'Date of birth must be in the past' }
    ),
  avatarUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;
export type ProfileUpdateInput = ProfileUpdateFormData;
