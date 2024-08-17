"use client";

import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Order } from "@/types";
import { LoaderCircle, Settings } from "lucide-react";
import { Inter } from "next/font/google";
import * as z from "zod";

import { FormProvider, useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { updateOrderValidation } from "@/validations/update-order";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import _http from "@/utils/http";
import useFetchOrder from "@/hooks/use-fetch-order";

const font = Inter({ subsets: ["latin"] });

type Props = {
  data: Order;
};

type FormValue = z.infer<typeof updateOrderValidation>;

export const SettingOrder = ({ data }: Props) => {
  const { fetchData } = useFetchOrder();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(updateOrderValidation),
    defaultValues: {
      name: "",
      numberPhone: "",
      address: "",
    },
  });

  useEffect(() => {
    form.setValue("name", data.customer);
    form.setValue("numberPhone", data.numberPhone);
    form.setValue("address", data.address);
  }, [data.address, data.customer, data.numberPhone, form]);

  const onSubmit = async (fromData: FormValue) => {
    const dataSend = {
      customer: fromData.name,
      ...fromData,
    };

    try {
      toast.loading("Đang xử lý...", {
        className: "text-[14px] tracking  tracking-tighter",
      });
      const response = await _http.put(`/Orders/${data.id}`, dataSend);
      if (response.status === 200) {
        toast.dismiss();
        handlerOpen();
        toast.success("Cập nhập thông tin thành công!", {
          className: "text-[14px] tracking font-medium tracking-tighter",
        });
        fetchData();
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

  const handlerOpen = () => {
    setOpen(!open);
  };

  return (
    <Dialog open={open} onOpenChange={handlerOpen}>
      <DialogTrigger>
        <Settings className="w-4 h-4" />
      </DialogTrigger>
      <DialogContent className={font.className}>
        <DialogHeader>
          <DialogTitle>Cập nhật thông tin đơn hàng</DialogTitle>
        </DialogHeader>

        <FormProvider {...form}>
          <form
            className="flex flex-col space-y-3"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <Input value={data.id} disabled />

            <Input
              placeholder="Email"
              type="email"
              value={data.email}
              disabled
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Họ và tên"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="numberPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Số điện thoại"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Địa chỉ"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
      </DialogContent>
    </Dialog>
  );
};
