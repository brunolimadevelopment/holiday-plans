import { z } from 'zod';

export const VacationSchema = z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    startDate: z.string().trim().min(1),
    endDate: z.string().trim().min(1),
    location: z.string().trim().min(1),
    participants: z.string().min(1),
});

export type dataFormSchema =  z.infer<typeof VacationSchema>