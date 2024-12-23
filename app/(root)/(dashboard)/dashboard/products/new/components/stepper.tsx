"use client";

import { Separator } from "@/components/ui/separator";
import clsx from "clsx";
import { Check } from "lucide-react";
import { Fragment } from "react";

type Props = {
  activeStep: number;
  numberOfSteps?: number;
};

export const StepperIndicator = ({ activeStep, numberOfSteps = 4 }: Props) => {
  const steps = Array.from({ length: numberOfSteps }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center">
      {steps.map((step) => (
        <Fragment key={step}>
          <div
            className={clsx(
              "w-[40px] h-[40px] flex justify-center items-center m-[5px] border-[2px] rounded-full",
              step < activeStep && "bg-primary text-white",
              step === activeStep && "border-primary text-primary",
            )}
          >
            {step >= activeStep ? (
              step
            ) : (
              <Check className="h-5 w-5 dark:text-green-600" />
            )}
          </div>
          {step !== numberOfSteps && (
            <Separator
              orientation="horizontal"
              className={clsx(
                "w-[100px] h-[2px]",
                step <= activeStep - 1 && "bg-primary",
              )}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
};
