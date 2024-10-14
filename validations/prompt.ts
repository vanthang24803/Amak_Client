import { z } from "zod";

export const validatePrompt = z.object({
  prompt: z.string().min(1, {
    message: "Không được bỏ trống",
  }),
});

export type PromptSchema = z.infer<typeof validatePrompt>;
