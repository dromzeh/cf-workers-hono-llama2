import { z } from 'zod';

export const formDataSchema = z.object({
    prompt: z
        .string({
            required_error: 'prompt is required',
            invalid_type_error: 'prompt must be a string',
        })
        .min(10)
        .max(100),
});
