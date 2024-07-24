import * as z from "zod";

export const loginValidation = z.object({
    email: z
      .string()
      .min(1, { message: "Email không được bỏ trống" })
      .email({ message: "Email của bạn không hợp lệ" })
      .max(255, { message: "Email quá dài hãy sử 1 email khác" }),
    password: z
      .string()
      .min(1, { message: "Mật khẩu của bạn quá ngắn" })
      .max(50, { message: "Mật khẩu của bạn quá dài" }),
  });