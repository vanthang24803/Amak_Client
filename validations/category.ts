import { z } from "zod";

const validateCategorySchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Tên khôn được bỏ trống",
    })
    .max(255, {
      message: "Tên quá dài",
    }),
});

export { validateCategorySchema };
