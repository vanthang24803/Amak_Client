import * as z from "zod";

const updateProductValidation = z.object({
  name: z
    .string()
    .min(1, { message: "Name must contain at least 1 character(s)" })
    .max(255, { message: "Name must be shorter than 255 characters" }),
  brand: z
    .string()
    .min(1, { message: "Brand must contain at least 1 character(s)" })
    .max(255, { message: "Brand must be shorter than 255 characters" }),
  thumbnail: z
    .string()
    .min(1, { message: "Thumbnail must contain at least 1 character(s)" }),
});

const createProductValidation = z.object({
  name: z
    .string()
    .min(1, { message: "Name must contain at least 1 character(s)" })
    .max(255, { message: "Name must be shorter than 255 characters" }),
  brand: z
    .string()
    .min(1, { message: "Brand must contain at least 1 character(s)" })
    .max(255, { message: "Brand must be shorter than 255 characters" }),
  thumbnail: z
    .string()
    .min(1, { message: "Thumbnail must contain at least 1 character(s)" }),
  category: z
    .string()
    .min(1, { message: "Category must contain at least 1 character(s)" })
    .max(255, { message: "Category must be shorter than 255 characters" }),
  option: z
    .string()
    .min(1, { message: "Option must contain at least 1 character(s)" })
    .max(255, { message: "Option must be shorter than 255 characters" }),
  sale: z.coerce
    .number()
    .min(0, { message: "Sale must be greater than 0" })
    .max(99, { message: "Sale must be less than 0" }),
  quantity: z.coerce
    .number()
    .min(0, { message: "Quantity must be greater than 0" }),
  price: z.coerce.number().min(1, { message: "Price must be greater than 0" }),
});

export { updateProductValidation, createProductValidation };
