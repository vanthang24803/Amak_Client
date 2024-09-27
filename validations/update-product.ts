import * as z from "zod";

export const updateAttributeProductValidation = z.object({
  name: z
    .string()
    .min(1, { message: "Tên sản phẩm không đc bỏ trống" })
    .max(255, "Tên sản phẩm quá dài"),
  brand: z
    .string()
    .min(1, { message: "Nhà xuất bản không đc bỏ trống" })
    .max(255, "Nhà xuất bản quá dài"),
  introduction: z.string().optional(),
  specifications: z.string().optional(),
});

export const updateOptionProductValidation = z.object({
  name: z
    .string()
    .min(1, { message: "Tên không đc bỏ trống" })
    .max(255, { message: "Tên quá dài" }),
  sale: z.string().min(1, { message: "Sale không đc bỏ trống" }),
  price: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Giá không đc bỏ trống" }),
  quantity: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Số lượng không đc bỏ trống" }),
});
