"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { AuthModal } from "@/components/auth-model";
import { Roboto } from "next/font/google";
import { z } from "zod";
import { resetPasswordValidation } from "@/validations/reset-password";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { checkStrength } from "../../register/components/register-handler";
import PasswordInput from "@/components/ui/input-password";
import { PasswordStrength } from "../../register/components/password-strength";
import _http from "@/utils/http";
import toast from "react-hot-toast";
import { decodeURIToken } from "@/utils/decode";

const font = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export type ResetPasswordForm = z.infer<typeof resetPasswordValidation>;

export const ResetPasswordHandler = () => {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token") ?? "";
  const userId = searchParams.get("userId");

  const form = useForm({
    resolver: zodResolver(resetPasswordValidation),
    defaultValues: {
      password: "",
    },
  });

  const strength = checkStrength(form.watch("password"));

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

  const encodedToken = decodeURIToken(token);

  const onSubmit = async (data: ResetPasswordForm) => {
    try {
      const res = await _http.post(
        `/Authentication/ResetPassword?userId=${userId}&token=${encodedToken}`,
        {
          newPassword: data.password,
        },
      );

      if (res.status === 200) {
        toast.success("Đặt lại mật hàng thành công!");
        router.push("/login");
      }
    } catch (error) {
      toast.error("Vui lòng thử lại!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthModal>
      <div className={`${font.className} flex flex-col`}>
        <h2 className="text-xl font-bold capitalize tracking-tight">
          Đặt lại mật khẩu
        </h2>
        <span className="text-neutral-800 text-sm">
          Hãy đổi lại mật khẩu mới của bạn
        </span>
      </div>

      <FormProvider {...form}>
        <form
          className="flex flex-col space-y-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div>
                    <PasswordInput
                      label="Mật khẩu mới"
                      className="pe-9"
                      placeholder="Mật khẩu mới"
                      {...field}
                      autoComplete="off"
                      aria-invalid={strengthScore < 4}
                      aria-describedby="password-strength"
                    />
                    <PasswordStrength
                      strength={strength}
                      strengthScore={strengthScore}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading} variant="primary">
            Xác nhận
          </Button>
        </form>
      </FormProvider>
    </AuthModal>
  );
};
