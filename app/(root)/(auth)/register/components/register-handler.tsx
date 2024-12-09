"use client";

import * as z from "zod";
import { AuthModal } from "@/components/auth-model";
import useAuth from "@/hooks/use-auth";
import { registerValidation } from "@/validations";
import { redirect, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import _http from "@/utils/http";
import toast from "react-hot-toast";
import Turnstile from "react-turnstile";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RegisterSuccess } from "./register-success";
import { Label } from "@/components/ui/label";
import { Mail, X } from "lucide-react";
import { PasswordStrength } from "./password-strength";
import PasswordInput from "@/components/ui/input-password";
import { Roboto } from "next/font/google";

const font = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});
type LoginFormValue = z.infer<typeof registerValidation>;

export const RegisterHandler = () => {
  const router = useRouter();

  const { isLogin } = useAuth();

  const [loading, setLoading] = useState(false);

  const [active, setActive] = useState(false);

  const [token, setToken] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(registerValidation),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: "Ít nhất 8 ký tự" },
      { regex: /[0-9]/, text: "Ít nhất 1 số" },
      { regex: /[a-z]/, text: "Ít nhất 1 chữ cái thường" },
      { regex: /[A-Z]/, text: "Ít nhất 1 chữ cái in hoa" },
      {
        regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/,
        text: "Ít nhất 1 ký tự đặc biệt",
      },
    ];

    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const strength = checkStrength(form.watch("password"));

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

  const onSubmit = async (data: LoginFormValue) => {
    if (token) {
      try {
        toast.loading("Đang xử lý dữ liệu!");
        setLoading(true);
        const response = await _http.post(`/Authentication/Register`, data);

        if (response.status == 201) {
          toast.dismiss();
          toast.success("Check your email !");
          setActive(true);
        }
      } catch (error: any) {
        setLoading(false);
        toast.dismiss();
        if (error.response && error.response.status === 400) {
          if (error.response.data.message == "Email existed!") {
            toast.error("Email đã được sử dụng");
          } else {
            toast.error("Dữ liệu không chính xác !");
          }
        }
      } finally {
        setLoading(false);
      }
    }
  };

  if (isLogin) {
    redirect("/");
  }

  return (
    <AuthModal>
      <div className={`${font.className} flex flex-col justify-center`}>
        <h2 className="text-xl font-bold tracking-tighter">
          Đăng ký tài khoản
        </h2>
        <span className="text-neutral-800 text-[12px]">
          {active
            ? "Xác thực tài khoản của bạn"
            : "Hoàn thiện các thông tin sau"}
        </span>
      </div>
      {active ? (
        <RegisterSuccess setActive={setActive} />
      ) : (
        <>
          <FormProvider {...form}>
            <form
              className="flex flex-col gap-1"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-col space-y-2">
                          <Label>Họ</Label>
                          <Input
                            {...field}
                            autoComplete="off"
                            placeholder="May"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-col space-y-2">
                          <Label>Tên</Label>
                          <Input
                            {...field}
                            autoComplete="off"
                            placeholder="Nguyen"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
                            <Mail
                              size={16}
                              strokeWidth={2}
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div>
                        <PasswordInput
                          className="pe-9"
                          placeholder="Password"
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

              <Turnstile
                className="flex items-center justify-center my-2"
                sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY ?? ""}
                onVerify={(token) => setToken(token)}
              />

              <Button type="submit" variant="mix" disabled={loading}>
                Đăng ký
              </Button>
            </form>
          </FormProvider>

          <div className="flex items-center space-x-2 text-sm">
            <span className="text-neutral-600">Bạn đã có tài khoản?</span>
            <span
              className="text-blue-600 hover:cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Đăng nhập ngay
            </span>
          </div>
        </>
      )}
    </AuthModal>
  );
};
