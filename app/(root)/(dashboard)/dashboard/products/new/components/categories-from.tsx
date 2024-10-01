"use client";

import { MultiSelect } from "@/components/multi-select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchCategories } from "@/services/api/category";
import { StepperFormValues } from "@/types/hook-stepper";
import { useQuery } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";

export const CategoriesForm = () => {
  const {
    formState: { errors },
    register,
    setValue,
  } = useFormContext<StepperFormValues>();

  const { data } = useQuery({
    queryKey: [`dashboard-categories`],
    queryFn: () => fetchCategories(),
  });

  const categorySelect = data?.data.result.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const handleValueChange = (value: string[]) => {
    setValue("categories", value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[15px]">Thể loại</CardTitle>
        <CardDescription className="text-[12px]">
          Lựa chọn các thể loại của sản phẩm
        </CardDescription>
      </CardHeader>
      <CardContent>
        <MultiSelect
          options={categorySelect || []}
          onValueChange={(value: string[]) => handleValueChange(value)}
          {...register("categories", {
            required: "Thể loại không được bỏ trống",
          })}
          placeholder="Select options"
          variant="inverted"
          animation={2}
          maxCount={4}
          defaultValue={[]}
        />
        {errors.categories && (
          <p className="text-red-500 text-sm mt-1">
            {errors.categories.message}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
