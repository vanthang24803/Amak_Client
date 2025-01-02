"use client";

import { AuthModal } from "@/components/auth-model";
import { redirect, useRouter } from "next/navigation";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { forgotPasswordValidation } from "@/validations";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import _http from "@/utils/http";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { Roboto } from "next/font/google";
import toast from "react-hot-toast";

const font = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export type ForgotPasswordForm = z.infer<typeof forgotPasswordValidation>;

export const Wrapper = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(forgotPasswordValidation),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    setLoading(true);

    try {
      console.log(data);
      toast.success("OK");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthModal>
      <div className={`${font.className} flex flex-col`}>
        <h2 className="text-xl font-bold capitalize tracking-tight">
          Quên mật khẩu ?
        </h2>
        <span className="text-neutral-800 text-sm">
          Nhập email để đổi lại mật khẩu của bạn.
        </span>
      </div>
      <FormProvider {...form}>
        <form
          className="flex flex-col space-y-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col space-y-2">
                    <Label>Email</Label>
                    <div className="relative">
                      <Input
                        className="peer pe-9"
                        {...field}
                        autoComplete="off"
                        placeholder="mail@example.com"
                      />
                      <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                        <Mail size={16} strokeWidth={2} aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading} variant="primary">
            Gửi mã xác nhận
          </Button>
        </form>
      </FormProvider>

      <div className="flex items-center space-x-2 text-sm">
        <span className="mt-4 text-neutral-600 text-[13px]">
          Đã có tài khoản?
        </span>
        <span
          className="mt-4 text-blue-600 hover:cursor-pointer"
          onClick={() => router.push("/login")}
        >
          Đăng nhập
        </span>
      </div>
    </AuthModal>
  );
};
