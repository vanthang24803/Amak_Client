"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Option } from "@/types";
import { LoaderCircle, Plus } from "lucide-react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FormProvider, useForm } from "react-hook-form";
import { updateOptionProductValidation } from "@/validations";
import { useState } from "react";
import _http from "@/utils/http";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

type CreateFormValue = z.infer<typeof updateOptionProductValidation>;

type Props = {
  option: Option;
};

export const UpdateOption = ({ option }: Props) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(updateOptionProductValidation),
    defaultValues: {
      name: "",
      sale: "0",
      quantity: 0,
      price: 0,
    },
  });

  const onSubmit = async (data: CreateFormValue) => {
    const jsonSend = {
      ...data,
      sale: Number(data.sale),
      isActive: true,
    };

    // try {
    //   setLoading(true);

    //   const handleUpdate = _http.post(
    //     `/Products/${product?.id}/Options`,
    //     jsonSend
    //   );

    //   toast.promise(handleUpdate, {
    //     loading: "Đang xử lý...",
    //     success: () => {
    //       queryClient.invalidateQueries({
    //         queryKey: [`dashboard-product-${product?.id}`],
    //       });
    //       handleClose();
    //       return "Tạo mới thành công!";
    //     },
    //     error: () => "Oops!",
    //   });
    // } catch (error) {
    //   console.log("Error updating product:", error);
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleClose = () => {
    form.reset();
    setOpen(!open);
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Plus className="w-3 h-4" />
          <span className="text-[13px] font-semibold tracking-tighter">
            Thêm mới
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Tạo phiên bản</SheetTitle>
          <SheetDescription>
            Hãy hoàn thiện các thông tin cần thiết khởi tạo một phiên bản mới
          </SheetDescription>
        </SheetHeader>
        <FormProvider {...form}>
          <form
            className="grid gap-4 py-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              disabled={loading}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Tên
                      </Label>
                      <Input id="name" {...field} className="col-span-3" />
                    </div>
                  </FormControl>
                  <FormMessage className="flex justify-end" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              disabled={loading}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="price" className="text-right">
                        Giá thành
                      </Label>
                      <Input
                        id="price"
                        {...field}
                        className="col-span-3"
                        type="number"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="flex justify-end" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              disabled={loading}
              name="sale"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="sale" className="text-right">
                        Sale
                      </Label>
                      <Input id="sale" {...field} className="col-span-3" />
                    </div>
                  </FormControl>
                  <FormMessage className="flex justify-end" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              disabled={loading}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="quantity" className="text-right">
                        Số lượng
                      </Label>
                      <Input
                        id="quantity"
                        {...field}
                        className="col-span-3"
                        type="number"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="flex justify-end" />
                </FormItem>
              )}
            />
            <div className="flex my-2 justify-end">
              <Button
                type="submit"
                variant="mix"
                className="w-[100px]"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <LoaderCircle className="w-4 h-4 animate-spin" />
                    <p>Đang xử lý</p>
                  </div>
                ) : (
                  "Xác nhận"
                )}
              </Button>
            </div>
          </form>
        </FormProvider>
      </SheetContent>
    </Sheet>
  );
};
