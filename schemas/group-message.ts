import { z } from 'zod';

export const PostGroupMessage = z.object({
  message: z.string().min(1, 'Se necesita un mensaje')
})