"use client";

import { Button } from "@/components/ui/button";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoaderCircle } from "lucide-react";
import { Inter } from "next/font/google";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { updatePasswordValidation } from "@/validations";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import _http from "@/utils/http";
import toast from "react-hot-toast";

const font = Inter({
  weight: "400",
  subsets: ["latin"],
});

type CreateFormValue = z.infer<typeof updatePasswordValidation>;

export const Password = () => {
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const handlerOpen = () => {
    setOpen(!open);
  };

  const form = useForm({
    resolver: zodResolver(updatePasswordValidation),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: CreateFormValue) => {
    const dataSend = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };

    try {
      setLoading(true);
      toast.loading("Đang xử lý...", {
        className: "text-[14px] tracking  tracking-tighter",
      });
      const response = await _http.put(`/Me/Password`, dataSend);

      if (response.status == 200) {
        form.reset();
        toast.dismiss();
        toast.success("Cập nhập mật khẩu thành công!", {
          className: "text-[14px] tracking font-medium tracking-tighter",
        });
        handlerOpen();
      }
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Mật khẩu của bạn không chính xác!", {
        className: "text-[14px] tracking  tracking-tighter",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handlerOpen}>
      <DialogTrigger>
        <Button
          variant="outline"
          type="reset"
          size="icon"
          className="w-14 text-[12px] rounded-none uppercase"
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className={font.className}>
        <DialogHeader>
          <DialogTitle className="text-lg">Đổi mật khẩu</DialogTitle>
          <DialogDescription className="text-[14px] py-2">
            Mật khẩu của bạn phải có tối thiểu 8 ký tự, bao gồm cả chữ số, chữ
            cái và ký tự đặc biệt (!$@%...).
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...form}>
          <form
            className={`flex flex-col space-y-4 `}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col space-y-2">
                      <span className="font-semibold  capitalize text-sm">
                        Mật khẩu hiện tại
                      </span>
                      <Input {...field} autoComplete="off" type="password" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col space-y-2">
                      <span className="font-semibold  capitalize text-sm">
                        Mật khẩu mới
                      </span>
                      <Input {...field} autoComplete="off" type="password" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col space-y-2">
                      <span className="font-semibold  capitalize text-sm">
                        Xác nhận mật khẩu
                      </span>
                      <Input {...field} autoComplete="off" type="password" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button className="rounded-none" disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    Đang xử lý <LoaderCircle className="animate-spin w-4 h-4" />
                  </span>
                ) : (
                  "Xác nhận"
                )}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
