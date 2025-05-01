import { z } from "zod";

export const ChangePassSchema = z
  .object({
    password: z.string().min(8, "Mật khẩu phải ít nhất 8 ký tự."),
    confirmPassword: z.string(),
    code: z.string().regex(/^\d{6}$/, "OTP phải gồm đúng 6 chữ số"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"], // Xác định lỗi nằm ở trường nào
        message: "Mật khẩu xác nhận không trùng khớp.",
      });
    }
  });
