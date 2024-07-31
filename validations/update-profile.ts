import * as z from "zod";

import { capitalizeValidation } from "./text";

export const updateProfileValidation = z.object({
  firstName: z
    .string()
    .min(1, { message: "Hãy nhập họ của bạn" })
    .max(50, "Họ của bạn quá dài")
    .refine((value) => capitalizeValidation.test(value), {
      message: "Họ của bạn phải bắt đầu bằng chữ cái in hoa",
    }),
  lastName: z
    .string()
    .min(1, { message: "Tên của bạn" })
    .max(50, "Tên của bạn quá dài")
    .refine((value) => capitalizeValidation.test(value), {
      message: "Tên của bạn phải bắt đầu bằng chữ cái in hoa",
    }),
  email: z
    .string()
    .min(1, { message: "Email không được bỏ trống" })
    .email({ message: "Email của bạn không hợp lệ" })
    .max(255, { message: "Email quá dài hãy sử 1 email khác" }),
});
