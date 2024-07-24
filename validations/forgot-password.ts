import * as z from "zod";

export const forgotPasswordValidation = z.object({
  email: z
    .string()
    .min(1, { message: "Email không được bỏ trống" })
    .email({ message: "Email của bạn không hợp lệ" })
    .max(255, { message: "Email quá dài hãy sử 1 email khác" }),
});
