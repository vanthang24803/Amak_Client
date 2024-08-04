"use client";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import useAuth from "@/hooks/use-auth";
import { Inter } from "next/font/google";
import { Separator } from "@/components/ui/separator";
import _http from "@/utils/http";
import toast from "react-hot-toast";
import { LoaderCircle, Plus } from "lucide-react";
import { addressValidation } from "@/validations/address";

const font = Inter({
  weight: "400",
  subsets: ["latin"],
});

type CreateFormValue = z.infer<typeof addressValidation>;

export const CreateAddress = () => {
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const { getProfile } = useAuth();

  const form = useForm({
    resolver: zodResolver(addressValidation),
    defaultValues: {
      firstName: "",
      lastName: "",
      numberPhone: "",
      address: "",
      isActive: false,
    },
  });

  const handlerOpen = () => {
    setOpen(!open);
  };

  const onSubmit = async (data: CreateFormValue) => {
    const dataSend = {
      ...data,
      addressName: data.address,
    };

    try {
      setLoading(true);
      toast.loading("Đang xử lý...", {
        className: "text-[14px] tracking  tracking-tighter",
      });

      const response = await _http.post(`/Addresses`, dataSend);
      if (response.status === 201) {
        getProfile();
        toast.dismiss();
        toast.success("Tạo địa chỉ thành công!", {
          className: "text-[14px] tracking font-medium tracking-tighter",
        });
        form.reset();
        handlerOpen();
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
    <Dialog open={open} onOpenChange={handlerOpen}>
      <DialogTrigger>
        <Button variant="mix" className="rounded-none tracking-tighter h-10">
          <Plus className="w-5 h-5 mx-1" />
          <p className="hidden md:block">Thêm địa chỉ mới</p>
        </Button>
      </DialogTrigger>
      <DialogContent className={font.className}>
        <DialogHeader>
          <DialogTitle className="capitalize font-semibold">
            Thêm địa chỉ
          </DialogTitle>
        </DialogHeader>
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
                      <Input
                        {...field}
                        autoComplete="off"
                        placeholder="Họ và tên đệm"
                      />
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
                      <Input {...field} autoComplete="off" placeholder="Tên" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="numberPhone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete="off"
                      placeholder="Số điện thoại"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete="off"
                      placeholder="Địa chỉ của bạn"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        className="rounded-none"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Đặt làm mặc định
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <DialogFooter>
              <div className="flex items-center space-x-3">
                <DialogClose>
                  <Button variant="outline" type="button">
                    Thoát
                  </Button>
                </DialogClose>
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center gap-2">
                      Đang xử lý{" "}
                      <LoaderCircle className="animate-spin w-4 h-4" />
                    </span>
                  ) : (
                    "Hoàn thành"
                  )}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
