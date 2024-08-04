import * as z from "zod";

export const addressValidation = z.object({
  firstName: z
    .string()
    .min(1, { message: "Hãy nhập họ của bạn" })
    .max(50, "Họ của bạn quá dài"),
  lastName: z
    .string()
    .min(1, { message: "Tên của bạn" })
    .max(50, "Tên của bạn quá dài"),
  numberPhone: z
    .string()
    .min(1, { message: "Số điện không được bỏ trống" })
    .max(12, {
      message: "Số điện thoại của bạn không hợp lệ",
    }),
  address: z.string().min(1, { message: "Địa chỉ của bạn" }),
  isActive: z.boolean().default(false).optional(),
});
