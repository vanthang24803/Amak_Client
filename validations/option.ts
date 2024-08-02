import * as z from "zod";

const optionValidation = z.object({
  name: z
    .string()
    .min(1, { message: "String must contain at least 1 character(s)" })
    .max(255, { message: "String must be shorter than 255 characters" }),
  sale: z.coerce
    .number()
    .min(0, { message: "Sale must be greater than 0" })
    .max(99, { message: "Sale must be less than 0" }),
  quantity: z.coerce
    .number()
    .min(0, { message: "Quantity must be greater than 0" }),
  price: z.coerce.number().min(1, { message: "Price must be greater than 0" }),
});

export { optionValidation };
