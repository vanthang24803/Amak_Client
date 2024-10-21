import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { CategoryColumn } from "./columns";
import { validateCategorySchema } from "@/validations/category";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import _http from "@/utils/http";
import { mutate } from "swr";

type Props = {
  open: boolean;
  handleToggle: () => void;
  json: CategoryColumn | undefined;
};

type CreateFormValue = z.infer<typeof validateCategorySchema>;

export const UpdateCategory = ({ open, handleToggle, json }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(validateCategorySchema),
    defaultValues: {
      name: json?.name || "",
    },
  });

  const onSubmit = async (data: CreateFormValue) => {
    try {
      setIsLoading(true);

      const handleUpdate = _http.put(`/Categories/${json?.id}`, data);

      toast.promise(handleUpdate, {
        loading: "Đang xử lý...",
        success: () => {
          mutate(`/Categories`);
          handleToggle();
          return "Cập nhật thành công!";
        },
        error: () => "Oops!",
      });
    } catch (error) {
      console.log("Error updating product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleToggle}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cập nhật danh mục</SheetTitle>
          <SheetDescription>
            Hãy hoàn thiện các thông tin cần thiết cập nhật danh mục
          </SheetDescription>
        </SheetHeader>
        <FormProvider {...form}>
          <form
            className="grid gap-4 py-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              disabled={isLoading}
              control={form.control}
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
            <div className="flex my-2 justify-end">
              <Button
                type="submit"
                variant="mix"
                className="w-[100px] h-9"
                disabled={isLoading}
              >
                {isLoading ? (
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
