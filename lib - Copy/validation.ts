import { z } from 'zod';

export const leadSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(60),
  lastName: z.string().trim().min(1, 'Last name is required').max(60),
  email: z.string().trim().email('Please enter a valid email address').max(120),
  phone: z
    .string()
    .trim()
    .min(7, 'Please enter a valid phone number')
    .max(30)
    .regex(/^[0-9+\-\s()]+$/, 'Digits, spaces, + - ( ) only'),
  company: z.string().trim().max(120).optional().or(z.literal('')),
  service: z.string().trim().max(60).optional().or(z.literal('')),
  message: z.string().trim().max(2000).optional().or(z.literal('')),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Please confirm you agree to be contacted' }),
  }),
  // honeypot — real users leave empty
  website: z.string().max(0).optional().or(z.literal('')),
  // source tracking (filled automatically)
  pageSource: z.string().max(200).optional().or(z.literal('')),
});

export type LeadInput = z.infer<typeof leadSchema>;
