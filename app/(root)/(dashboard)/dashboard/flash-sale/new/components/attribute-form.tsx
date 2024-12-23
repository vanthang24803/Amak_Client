import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StepperFormFlashSaleValue } from "@/types/hook-stepper";
import { Controller, useFormContext } from "react-hook-form";
import { DateTimePicker } from "./date-picker";

export const AttributeForm = () => {
  const {
    formState: { errors },
    control,
    register,
  } = useFormContext<StepperFormFlashSaleValue>();

  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle className="text-[15px]">Thông tin</CardTitle>
        <CardDescription className="text-[12px]">
          Hoàn thiện các thông tin cần thiết để tạo flash sale
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex gap-4">
          <div className="flex flex-col gap-2 w-full">
            <Label className="text-muted-foreground text-[12px]">Tên</Label>
            <Input
              className="text-[13px] md:rounded"
              {...register("name", { required: "Tên không được bỏ trống" })}
            />
            {errors.name && (
              <p className="text-[12px] font-semibold tracking-tighter text-destructive">
                {errors.name?.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-10">
          <div className="flex flex-col gap-2 w-1/2">
            <Label className="text-muted-foreground text-[12px]">
              Thời gian bắt đầu
            </Label>
            <Controller
              name="startAt"
              control={control}
              rules={{ required: "Thời gian bắt đầu không được bỏ trống" }}
              render={({ field }) => <DateTimePicker {...field} />}
            />
            {errors.startAt && (
              <p className="text-[12px] font-semibold tracking-tighter text-destructive">
                {errors.startAt?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 w-1/2">
            <Label className="text-muted-foreground text-[12px]">
              Thời gian kết thúc
            </Label>
            <Controller
              name="endAt"
              control={control}
              rules={{ required: "Thời gian kết thúc không được bỏ trống" }}
              render={({ field }) => <DateTimePicker {...field} />}
            />
            {errors.endAt && (
              <p className="text-[12px] font-semibold tracking-tighter text-destructive">
                {errors.endAt?.message}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
