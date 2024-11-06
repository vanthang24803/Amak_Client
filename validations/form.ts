import * as z from "zod";

const validateCreateBlogSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Tiêu đề không được bỏ trống",
    })
    .max(255, {
      message: "Tiêu đề quá dài",
    }),
  content: z.string().min(1, {
    message: "Nội dung không được bỏ trống",
  }),
  thumbnail: z.string(),
});

type CreateBlogSchema = z.infer<typeof validateCreateBlogSchema>;

export { validateCreateBlogSchema, type CreateBlogSchema };
