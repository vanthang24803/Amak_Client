"use client";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Dispatch, SetStateAction, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import useAuth from "@/hooks/use-auth";
import { updateProfileValidation } from "@/validations";
import { Inter } from "next/font/google";
import { Separator } from "@/components/ui/separator";
import { Password } from "./password";
import _http from "@/utils/http";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";

const font = Inter({
  weight: "400",
  subsets: ["latin"],
});

type Props = {
  setActive: Dispatch<SetStateAction<boolean>>;
};

type CreateFormValue = z.infer<typeof updateProfileValidation>;

export const UpdateInformation = ({ setActive }: Props) => {
  const [loading, setLoading] = useState(false);
  const { profile, getProfile } = useAuth();

  const form = useForm({
    resolver: zodResolver(updateProfileValidation),
    defaultValues: {
      firstName: `${profile?.firstName}`,
      lastName: `${profile?.lastName}`,
      email: `${profile?.email}`,
      numberPhone: `${profile?.numberPhone ? profile.numberPhone : ""}`,
    },
  });

  const onSubmit = async (data: CreateFormValue) => {
    try {
      toast.loading("Đang xử lý...", {
        className: "text-[14px] tracking  tracking-tighter",
      });
      const response = await _http.put(`/Me/Profile`, data);
      if (response.status === 200) {
        getProfile();
        toast.dismiss();
        toast.success("Cập nhập thông tin thành công!", {
          className: "text-[14px] tracking font-medium tracking-tighter",
        });
        setActive(false);
      }
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Có lỗi xảy ra", {
        className: "text-[14px] tracking  tracking-tighter",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className={`flex flex-col space-y-4  ${font.className}`}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col space-y-1">
                    <span className="font-semibold text-sm uppercase">
                      Firstname
                    </span>
                    <Input {...field} autoComplete="off" />
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
                    <span className="font-semibold  uppercase text-sm">
                      Lastname
                    </span>
                    <Input {...field} autoComplete="off" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex flex-col space-y-1">
                  <span className="font-semibold  uppercase text-sm">
                    Email
                  </span>
                  <Input {...field} autoComplete="off" disabled />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />

        <FormField
          control={form.control}
          name="numberPhone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex flex-col space-y-1">
                  <span className="font-semibold  uppercase text-sm">
                    Numberphone
                  </span>
                  <Input {...field} autoComplete="off" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col space-y-1">
          <span className="font-semibold  uppercase text-sm">Password</span>
          <div className="flex justify-between items-center">
            <span className="text-[14px] text-neutral-600">
              Cập nhật mật khẩu cho tài khoản của bạn
            </span>
            <Password />
          </div>
        </div>

        <Button type="submit" disabled={loading} className="rounded-none">
          {loading ? (
            <span className="flex items-center gap-2">
              Đang xử lý <LoaderCircle className="animate-spin w-4 h-4" />
            </span>
          ) : (
            "Xác nhận"
          )}
        </Button>
      </form>
    </FormProvider>
  );
};
