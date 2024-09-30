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

export default function CreateProduct() {
  const [activeStep, setActiveStep] = useState(1);
  const [erroredInputName, setErroredInputName] = useState("");
  const methods = useForm<StepperFormValues>({
    mode: "onTouched",
  });

  const {
    trigger,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
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
        <Button
          className="h-8 text-[12.5px]"
          variant="mix"
          onClick={handleNext}
        >
          Tiếp theo
        </Button>
      </CardFooter>
    </Card>
  );
}
