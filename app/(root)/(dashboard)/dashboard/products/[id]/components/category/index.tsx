"use client";

import { MultiSelect } from "@/components/multi-select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { fetchCategories } from "@/services/dashboard/category";
import { ProductDetail } from "@/types";
import _http from "@/utils/http";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle, Pencil, X } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Props = {
  product: ProductDetail | undefined;
};

const FormSchema = z.object({
  categories: z
    .array(z.string().min(1))
    .min(1, "Hãy chọn ít nhất 1 thể loại")
    .nonempty("Hãy chọn ít nhất 1 thể loại"),
});

export const CategoryProduct = ({ product }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: [`dashboard-categories`],
    queryFn: () => fetchCategories(),
  });

  const defaultValueSelect = product?.categories.map((item) => item.id);

  const categorySelect = data?.data.result.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      categories: defaultValueSelect,
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const jsonSend = data.categories.map((item) => ({
      id: item,
    }));

    try {
      setLoading(true);

      const handleUpdate = _http.put(`/Products/${product?.id}/Categories`, {
        categories: jsonSend,
      });

      toast.promise(handleUpdate, {
        loading: "Đang xử lý...",
        success: () => {
          queryClient.invalidateQueries({
            queryKey: [`dashboard-product-${product?.id}`],
          });
          handleClose();
          return "Cập nhật thể loại thành công!";
        },
        error: () => "Oops!",
      });
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => setOpen(!open);

  return (
    <Card className="h-auto w-full bg-white dark:bg-black rounded pt-5">
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h4 className="scroll-m-20 text-lg font-bold tracking-tighter w-1/2 line-clamp-1">
            {open ? "Cập nhật thể loại" : "Thể loại"}
          </h4>
          <div className="flex items-center space-x-3">
            <div onClick={handleClose} className="transition ease-in-out">
              {open ? (
                <X className="w-4 h-4 hover:cursor-pointer transition ease-in-out" />
              ) : (
                <Pencil className="w-4 h-4 hover:cursor-pointer transition ease-in-out" />
              )}
            </div>
          </div>
        </div>

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 p-2"
          >
            <FormField
              control={form.control}
              name="categories"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <MultiSelect
                      options={categorySelect || []}
                      onValueChange={field.onChange}
                      placeholder="Select options"
                      variant="inverted"
                      animation={2}
                      maxCount={4}
                      disabled={!open || loading}
                      defaultValue={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {open && (
              <Button
                type="submit"
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
            )}
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};
