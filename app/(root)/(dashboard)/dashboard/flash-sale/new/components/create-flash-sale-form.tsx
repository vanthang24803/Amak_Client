"use client";

import { StepperFormFlashSaleValue } from "@/types/hook-stepper";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StepperIndicator } from "../../../products/new/components/stepper";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AttributeForm } from "./attribute-form";
import { ProductFrom } from "./product-from";
import { SubmitForm } from "./submit-form";
import { useFlashSale } from "@/hooks/use-flash-sale";
import toast from "react-hot-toast";
import _http from "@/utils/http";
import { useRouter } from "next/navigation";
import { mutate } from "swr";

export const CreateFlashSaleForm = () => {
  const router = useRouter();
  const { data } = useFlashSale();
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
      case 1:
        return <AttributeForm />;
      case 2:
        return <ProductFrom />;
      case 3:
        return <SubmitForm />;
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

  const onSubmit = async (values: StepperFormFlashSaleValue) => {
    const sales = data.map((product) => ({
      productId: product.id,
      optionId: product.optionId,
    }));

    const dataSend = {
      ...values,
      sales,
    };

    try {
      const res = await _http.post(`/FlashSale`, dataSend);

      if (res.status === 201) {
        mutate(`/FlashSale`);
        toast.success("Thành công!");
        router.push(`/dashboard/flash-sale`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra!");
    }
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
