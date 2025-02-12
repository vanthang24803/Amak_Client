import * as z from "zod";
import { phoneNumberValidation } from "./number";

const updateOrderValidation = z.object({
  name: z
    .string()
    .min(1, { message: "Tên của bạn không được bỏ trống" })
    .max(50, "Tên của bạn quá dài"),
  address: z
    .string()
    .min(1, { message: "Địa chỉ của bạn không được bỏ trống" }),
  numberPhone: z
    .string()
    .min(1, { message: "Hãy nhập vào số điện thoại của bạn" })
    .max(12, { message: "Số điện thoại của bạn quá dài" })
    .refine((value) => phoneNumberValidation.test(value), {
      message: "Số điện thoại của bạn không hợp lệ",
    }),
});

const cancelOrderValidation = z.object({
  message: z.string().min(1, { message: "Không được bỏ trống!" }),
});

export { updateOrderValidation, cancelOrderValidation };
