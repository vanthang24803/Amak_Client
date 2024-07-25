"use client";

import * as z from "zod";
import { AuthModal } from "@/components/auth-model";
import useAuth from "@/hooks/use-auth";
import { registerValidation } from "@/validations";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import _http from "@/utils/http";
import toast from "react-hot-toast";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RegisterSuccess } from "./register-success";
import { Step } from "./Step";

type LoginFormValue = z.infer<typeof registerValidation>;

export const RegisterHandler = () => {
  const router = useRouter();

  const { isLogin } = useAuth();
  let [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);

  const [active, setActive] = useState(false);

  const form = useForm({
    resolver: zodResolver(registerValidation),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValue) => {
    try {
      toast.loading("Đang xử lý dữ liệu!");
      setLoading(true);
      const response = await _http.post(`/Authentication/Register`, data);

      if (response.status == 200) {
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
  };

  if (isLogin) {
    redirect("/");
  }

  return (
    <AuthModal>
      <div className="flex flex-col justify-center ">
        <h2 className="text-xl font-semibold tracking-tighter">
          Đăng ký tài khoản
        </h2>
         <Step isActive={active} />
        <span className="text-neutral-800 text-[12px]">
          {active ? "Xác thực tài khoản của bạn" : "Hoàn thiện các thông tin sau"}
        </span>
      </div>
      {active ? (
        <RegisterSuccess setActive={setActive} />
      ) : (
        <>
          <FormProvider {...form}>
            <form
              className="flex flex-col space-y-3"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-col space-y-1">
                          <span className="font-medium text-sm">Họ</span>
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
                        <div className="flex flex-col space-y-1">
                          <span className="font-medium text-sm">Tên</span>
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
                      <div className="flex flex-col space-y-1">
                        <span className="font-medium text-sm">Email</span>
                        <Input
                          {...field}
                          autoComplete="off"
                          placeholder="mail@example.com"
                        />
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
                      <div className="flex flex-col space-y-1">
                        <span className="font-medium text-sm">Password</span>
                        <Input
                          type="password"
                          {...field}
                          autoComplete="off"
                          placeholder="Password"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={loading}>
                Submit
              </Button>
            </form>
          </FormProvider>

          <div className="flex items-center space-x-2 text-sm">
            <span className="mt-4 text-neutral-600">Have account?</span>
            <span
              className="mt-4 text-blue-600 hover:cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Login now
            </span>
          </div>
        </>
      )}
    </AuthModal>
  );
};
