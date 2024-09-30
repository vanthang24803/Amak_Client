"use client";

import Tiptap from "@/components/tiptap";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StepperFormValues } from "@/types/hook-stepper";
import { useFormContext } from "react-hook-form";

export const AttributeForm = () => {
  const {
    formState: { errors },
    register,
  } = useFormContext<StepperFormValues>();

  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle className="text-[15px]">Thông tin sản phẩm</CardTitle>
        <CardDescription className="text-[12px]">
          Hoàn thiện các thông tin cần thiết để tạo sản phẩm
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex gap-4">
          <div className="flex flex-col gap-1 w-2/3">
            <Label className="text-muted-foreground text-[12px]">
              Tên sản phẩm
            </Label>
            <Input
              placeholder="Nguời là ai giữa tinh không này ?"
              className="text-[13px]"
              {...register("name", { required: "Tên không được bỏ trống" })}
            />
            {errors.name && (
              <p className="text-[12px] font-semibold tracking-tighter text-destructive">
                {errors.name?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1 w-1/3">
            <Label className="text-muted-foreground text-[12px]">
              Nhà xuất bản
            </Label>
            <Input
              placeholder="XYZ"
              className="text-[13px]"
              {...register("brand", {
                required: "Nhà xuất bản không được bỏ trống",
              })}
            />
            {errors.brand && (
              <p className="text-[12px] font-semibold tracking-tighter text-destructive">
                {errors.brand.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Label className="text-muted-foreground text-[12px]">
            Mô tả sản phẩm
          </Label>
          <Textarea
            className="text-[13px]"
            {...register("introduction")}
            rows={4}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label className="text-muted-foreground text-[12px]">
            Thông tin sản phẩm
          </Label>
          <Textarea
            className="text-[13px]"
            {...register("specifications")}
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  );
};
