"use client";

import Tiptap from "@/components/tiptap";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProductDetail } from "@/types";
import _http from "@/utils/http";
import { updateAttributeProductValidation } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Props = {
  product: ProductDetail | undefined;
  handleClose: () => void;
};

type FromSchema = z.infer<typeof updateAttributeProductValidation>;

export const AttributeForm = ({ product, handleClose }: Props) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(updateAttributeProductValidation),
    defaultValues: {
      name: "",
      brand: "",
      introduction: "",
      specifications: "",
    },
  });

  useEffect(() => {
    form.setValue("name", product?.name || "");
    form.setValue("brand", product?.brand || "");
    form.setValue("introduction", product?.introduction || "");
    form.setValue("specifications", product?.specifications || "");
  }, [product, form]);

  const onSubmit = async (data: FromSchema) => {
    try {
      setLoading(true);

      const handleUpdate = _http.put(`/Products/${product?.id}`, data);

      toast.promise(handleUpdate, {
        loading: "Đang xử lý...",
        success: () => {
          queryClient.invalidateQueries({
            queryKey: [`dashboard-product-${product?.id}`],
          });
          handleClose();
          return "Cập nhật thành công!";
        },
        error: () => "Oops!",
      });
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          disabled={loading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <p className="text-sm font-medium  leading-none text-muted-foreground tracking-tighter">
                  Tên sản phẩm
                </p>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          disabled={loading}
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <p className="text-sm font-medium  leading-none text-muted-foreground tracking-tighter">
                  Nhà xuất bản
                </p>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          disabled={loading}
          control={form.control}
          name="introduction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <p className="text-sm font-medium  leading-none text-muted-foreground tracking-tighter">
                  Mô tả sản phẩm
                </p>
              </FormLabel>
              <FormControl>
                <Tiptap
                  {...field}
                  description={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          disabled={loading}
          control={form.control}
          name="specifications"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <p className="text-sm font-medium  leading-none text-muted-foreground tracking-tighter">
                  Thông tin sản phẩm
                </p>
              </FormLabel>
              <FormControl>
                <Tiptap
                  {...field}
                  description={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-[120px] h-8 text-[13px]"
          variant="mix"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <LoaderCircle className="w-4 h-4 animate-spin" />
              <p>Đang xử lý</p>
            </div>
          ) : (
            "Cập nhật"
          )}
        </Button>
      </form>
    </FormProvider>
  );
};
