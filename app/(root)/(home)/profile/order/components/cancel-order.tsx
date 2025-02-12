"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import useFetchOrder from "@/hooks/use-fetch-order";
import { Order } from "@/types";
import _http from "@/utils/http";
import { cancelOrderValidation } from "@/validations/update-order";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const font = Inter({ subsets: ["latin"] });

type FormValue = z.infer<typeof cancelOrderValidation>;

type Props = {
  order: Order;
};

export const CancelOrder = ({ order }: Props) => {
  const { reloadData } = useFetchOrder();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(cancelOrderValidation),
    defaultValues: {
      message: "",
    },
  });

  const handleToggle = () => {
    form.reset();
    setOpen(!open);
  };

  const onSubmit = async (form: FormValue) => {
    const jsonSend = {
      orderId: order.id,
      message: form.message,
    };

    try {
      toast.loading("Đang xử lý...", {
        className: "text-[14px] tracking  tracking-tighter",
      });
      const response = await _http.put(`/Orders/Cancel`, jsonSend);
      if (response.status === 200) {
        handleToggle();
        reloadData();
      }
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra", {
        className: "text-[14px] tracking  tracking-tighter",
      });
    } finally {
      toast.dismiss();
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleToggle}>
      <DialogTrigger>
        <Button size="sm" variant="destructive" className="rounded-sm">
          Hủy đơn hàng
        </Button>
      </DialogTrigger>
      <DialogContent className={`${font.className}`}>
        <DialogHeader>
          <DialogTitle>Hủy đơn hàng</DialogTitle>
          <DialogDescription className="text-[12px]">
            Sau nhưng thao tác này đơn hàng của bạn sẽ bị hủy hoàn toàn kèm theo
            các mã giảm giá bạn đã sử dụng!
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <form
            className="flex flex-col space-y-3"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lý do:</FormLabel>
                  <FormControl>
                    <Textarea disabled={loading} {...field} cols={30} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  type="submit"
                  variant="outline"
                  className="rounded"
                  onClick={handleToggle}
                >
                  Thoát
                </Button>
                <Button
                  size="sm"
                  type="submit"
                  variant="primary"
                  disabled={loading}
                  className="rounded"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      Đang xử lý{" "}
                      <LoaderCircle className="animate-spin w-4 h-4" />
                    </span>
                  ) : (
                    "Xác nhận"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
