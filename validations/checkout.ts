import * as z from 'zod';
import { phoneNumberValidation } from './number';

const checkOutValidation = z.object({
  email: z
    .string()
    .min(1, { message: 'Email không được bỏ trống' })
    .email({ message: 'Email của bạn không hợp lệ' })
    .max(255, { message: 'Email quá dài hãy sử 1 email khác' }),
  name: z
    .string()
    .min(1, { message: 'Tên của bạn không được bỏ trống' })
    .max(50, 'Tên của bạn quá dài'),

  address: z
    .string()
    .min(1, { message: 'Địa chỉ của bạn không được bỏ trống' }),
  numberPhone: z
    .string()
    .min(1, { message: 'Hãy nhập vào số điện thoại của bạn' })
    .max(12, { message: 'Số điện thoại của bạn quá dài' })
    .refine((value) => phoneNumberValidation.test(value), {
      message: 'Số điện thoại của bạn không hợp lệ',
    }),
});

export { checkOutValidation };
