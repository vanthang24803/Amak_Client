"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PlusCircle, Trash2 } from "lucide-react";
import { StepperFormValues } from "@/types/hook-stepper";

export const OptionsForm = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<StepperFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
    rules: { minLength: 1, maxLength: 5 },
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Phiên bản</CardTitle>
        <CardDescription>Tạo các phiên bản của sản phẩm</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.map((field, index) => (
          <div className="flex items-center gap-x-2" key={field.id}>
            <div className="grid grid-cols-4 gap-2">
              <div className="flex-1">
                <Label
                  htmlFor={`options.${index}.name`}
                  className="text-sm font-medium"
                >
                  Tên
                </Label>
                <Input
                  {...register(`options.${index}.name` as const, {
                    required: "Tên là bắt buộc",
                  })}
                  placeholder="Nhập tên phiên bản"
                  className="mt-1"
                />
                {errors.options?.[index]?.name && (
                  <p className="text-[13px] tracking-tighter font-semibold text-red-500 mt-1">
                    {errors.options[index].name?.message}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <Label
                  htmlFor={`options.${index}.value`}
                  className="text-sm font-medium"
                >
                  Giá
                </Label>
                <Input
                  {...register(`options.${index}.price` as const, {
                    required: "Giá là bắt buộc",
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: "Giá phải lớn hơn hoặc bằng 0",
                    },
                  })}
                  type="number"
                  placeholder="Nhập giá"
                  className="mt-1"
                />
                {errors.options?.[index]?.price && (
                  <p className="text-[13px] tracking-tighter font-semibold text-red-500 mt-1">
                    {errors.options[index].price?.message}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <Label
                  htmlFor={`options.${index}.value`}
                  className="text-sm font-medium"
                >
                  Sale
                </Label>
                <Input
                  {...register(`options.${index}.sale` as const)}
                  type="number"
                  placeholder="Nhập sale"
                  className="mt-1"
                />
                {errors.options?.[index]?.sale && (
                  <p className="text-[13px] tracking-tighter font-semibold text-red-500 mt-1">
                    {errors.options[index].sale?.message}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <Label
                  htmlFor={`options.${index}.value`}
                  className="text-sm font-medium"
                >
                  Số lượng
                </Label>
                <Input
                  {...register(`options.${index}.quantity` as const, {
                    required: "Số lượng là bắt buộc",
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: "Số lượng phải lớn hơn hoặc bằng 0",
                    },
                  })}
                  type="number"
                  placeholder="Nhập Số lượng"
                  className="mt-1"
                />
                {errors.options?.[index]?.quantity && (
                  <p className="text-[13px] tracking-tighter font-semibold text-red-500 mt-1">
                    {errors.options[index].quantity?.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              {index > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  className="flex-shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Xóa phiên bản</span>
                </Button>
              )}
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ name: "", sale: 0, quantity: 0, price: 0 })}
          className="mt-4"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Thêm phiên bản
        </Button>
      </CardContent>
    </Card>
  );
};
