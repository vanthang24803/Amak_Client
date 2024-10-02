import { z } from "zod";

const validationTicketSchema = z
  .object({
    name: z.string().min(1, "Tên không được để trống"),
    code: z
      .string()
      .min(1, "Mã giảm giá không được để trống")
      .max(10, "Mã giảm giá không được dài quá 10 ký tự"),
    quantity: z.preprocess(
      (val) => Number(val),
      z.number().min(1, "Số lượng phải lớn hơn 0")
    ),
    discount: z.preprocess(
      (val) => Number(val),
      z.number().min(0, "Giảm giá phải là số dương"),
      z.number().max(100, "Giảm giá k được vượt quá 100%")
    ),
    startDate: z.date(),
    endDate: z.date(),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "Ngày kết thúc phải sau ngày khởi tạo",
    path: ["endDate"],
  });

export { validationTicketSchema };
