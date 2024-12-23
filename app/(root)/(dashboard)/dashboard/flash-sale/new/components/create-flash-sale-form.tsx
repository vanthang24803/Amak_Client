"use client";

import { StepperFormFlashSaleValue } from "@/types/hook-stepper";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StepperIndicator } from "../../../products/new/components/stepper";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AttributeForm } from "./attribute-form";
import { ProductFrom } from "./product-from";

export const CreateFlashSaleForm = () => {
  const [activeStep, setActiveStep] = useState(1);

  const methods = useForm<StepperFormFlashSaleValue>({
    mode: "onTouched",
  });

  const {
    trigger,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  function getStepContent(step: number) {
    switch (step) {
      case 2:
        return <AttributeForm />;
      case 1:
        return <ProductFrom />;

      default:
        return null;
    }
  }

  const handleNext = async () => {
    const isStepValid = await trigger(undefined, { shouldFocus: true });
    if (isStepValid) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handlePrev = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmit = async (data: StepperFormFlashSaleValue) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col gap-4">
      <StepperIndicator activeStep={activeStep} numberOfSteps={3} />
      <FormProvider {...methods}>
        <form noValidate>{getStepContent(activeStep)}</form>
      </FormProvider>
      <CardFooter className="flex items-center justify-end gap-2">
        <Button
          className="h-8 text-[12.5px]"
          variant="outline"
          type="button"
          onClick={handlePrev}
          disabled={activeStep === 1}
        >
          Trở lại
        </Button>
        {activeStep === 3 ? (
          <Button
            type="submit"
            className="h-8 text-[12.5px]"
            variant="mix"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            Xác nhận
          </Button>
        ) : (
          <Button
            type="button"
            className="h-8 text-[12.5px]"
            variant="mix"
            onClick={handleNext}
          >
            Tiếp theo
          </Button>
        )}
      </CardFooter>
    </div>
  );
};
