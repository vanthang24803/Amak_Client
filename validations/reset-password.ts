import * as z from "zod";

import { specialCharValidation, uppercaseCharValidation } from "./text";

import { digitValidation } from "./number";

export const resetPasswordValidation = z.object({
  password: z
    .string()
    .min(6, {
      message:
        "Mật khẩu của bạn quá ngắn ít nhất 6 chữ cái gồm 1 chữ in hoa, 1 số, 1 ký tự đặc biệt",
    })
    .max(50, "Mật khẩu của bạn quá dài ")
    .refine((value) => specialCharValidation.test(value), {
      message: "Mật khẩu của bạn chưa có ký tự đặt biệt",
    })
    .refine((value) => uppercaseCharValidation.test(value), {
      message: "Mật khẩu của bạn chưa có chữ cái in hoa",
    })
    .refine((value) => digitValidation.test(value), {
      message: "Mật khẩu của bạn chưa có chữ số",
    }),
});
