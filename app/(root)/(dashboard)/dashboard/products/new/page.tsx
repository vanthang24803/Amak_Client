"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { StepperIndicator } from "./components/stepper";
import { AttributeForm } from "./components/attribute-form";
import { StepperFormValues } from "@/types/hook-stepper";
import { FormProvider, useForm } from "react-hook-form";
import { ThumbnailForm } from "./components/thumbnail-form";
import { CategoriesForm } from "./components/categories-from";
import { OptionsForm } from "./components/options-from";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import _http from "@/utils/http";
import { mutate } from "swr";

export default function CreateProduct() {
  const [activeStep, setActiveStep] = useState(1);
  const [erroredInputName, setErroredInputName] = useState("");
  const router = useRouter();

  const methods = useForm<StepperFormValues>({
    mode: "onTouched",
  });

  const {
    trigger,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    const erroredInputElement =
      document.getElementsByName(erroredInputName)?.[0];
    if (erroredInputElement instanceof HTMLInputElement) {
      erroredInputElement.focus();
      setErroredInputName("");
    }
  }, [erroredInputName]);

  function getStepContent(step: number) {
    switch (step) {
      case 1:
        return <AttributeForm />;
      case 2:
        return <ThumbnailForm />;
      case 3:
        return <CategoriesForm />;
      case 4:
        return <OptionsForm />;
      default:
        return <AttributeForm />;
    }
  }

  const handleNext = async () => {
    const isStepValid = await trigger(undefined, { shouldFocus: true });
    if (isStepValid) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handlePrev = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmit = async (data: StepperFormValues) => {
    const categoriesData = data.categories.toString().split(",");
    const categories = categoriesData.map((item) => ({ id: item }));

    const options = data.options.map((item) => ({
      ...item,
      isActive: true,
    }));

    const formData = new FormData();

    formData.append("name", data.name || "");
    formData.append("brand", data.brand || "");
    formData.append("thumbnail", data.thumbnail || "");

    categories.forEach((category, index) => {
      formData.append(`categories[${index}].id`, category.id);
    });

    options.forEach((option, index) => {
      formData.append(`options[${index}].name`, option.name);
      formData.append(`options[${index}].price`, option.price.toString());
      formData.append(`options[${index}].quantity`, option.quantity.toString());
      formData.append(`options[${index}].sale`, option.sale.toString());
    });
    formData.append("introduction", data.introduction || "");
    formData.append("specifications", data.specifications || "");

    try {
      const handleUpdate = _http.post(`/Products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.promise(handleUpdate, {
        loading: "Đang xử lý...",
        success: () => {
          mutate(`/Products`);
          router.push(`/dashboard/products`);
          return "Tạo sản phẩm thành công!";
        },
        error: () => "Oops!",
      });
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <Card className="m-4 p-2">
      <CardHeader>
        <CardTitle className="text-lg">Tạo mới sản phẩm</CardTitle>
        <CardDescription className="text-md">
          Hoàn thành các thông tin và xác nhận để tạo mới sản phẩm
        </CardDescription>
      </CardHeader>
      <CardContent>
        <StepperIndicator activeStep={activeStep} />
        <FormProvider {...methods}>
          <form noValidate>{getStepContent(activeStep)}</form>
        </FormProvider>
      </CardContent>
      <CardFooter className="flex items-center justify-end gap-2">
        <Button
          className="h-8 text-[12.5px]"
          variant="outline"
          onClick={handlePrev}
          disabled={activeStep === 1}
        >
          Trở lại
        </Button>
        {activeStep === 4 ? (
          <Button
            className="h-8 text-[12.5px]"
            variant="mix"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            Xác nhận
          </Button>
        ) : (
          <Button
            className="h-8 text-[12.5px]"
            variant="mix"
            onClick={handleNext}
          >
            Tiếp theo
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
