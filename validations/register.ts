import * as z from 'zod';

import {
  textValidation,
  capitalizeValidation,
  specialCharValidation,
  uppercaseCharValidation,
} from './text';

import { digitValidation } from './number';

export const registerValidation = z.object({
  firstName: z
    .string()
    .min(1, { message: 'Hãy nhập họ của bạn' })
    .max(50, 'Họ của bạn quá dài')
    .refine((value) => textValidation.test(value), {
      message: 'Chỉ nhập chữ và nhập in hoa chữ cái đầu',
    })
    .refine((value) => capitalizeValidation.test(value), {
      message: 'Họ của bạn phải bắt đầu bằng chữ cái in hoa',
    }),
  lastName: z
    .string()
    .min(1, { message: 'Tên của bạn' })
    .max(50, 'Tên của bạn quá dài')
    .refine((value) => capitalizeValidation.test(value), {
      message: 'Tên của bạn phải bắt đầu bằng chữ cái in hoa',
    })
    .refine((value) => textValidation.test(value), {
      message: 'Chỉ nhập chữ và nhập in hoa chữ cái đầu',
    }),
  email: z
    .string()
    .min(1, { message: 'Email không được bỏ trống' })
    .email({ message: 'Email của bạn không hợp lệ' })
    .max(60, { message: 'Email quá dài hãy sử 1 email khác' }),
  password: z
    .string()
    .min(6, {
      message:
        'Mật khẩu của bạn quá ngắn ít nhất 6 chữ cái gồm 1 chữ in hoa, 1 số, 1 ký tự đặc biệt',
    })
    .max(50, 'Mật khẩu của bạn quá dài ')
    .refine((value) => specialCharValidation.test(value), {
      message: 'Mật khẩu của bạn chưa có ký tự đặt biệt',
    })
    .refine((value) => uppercaseCharValidation.test(value), {
      message: 'Mật khẩu của bạn chưa có chữ cái in hoa',
    })
    .refine((value) => digitValidation.test(value), {
      message: 'Mật khẩu của bạn chưa có chữ số',
    }),
});
