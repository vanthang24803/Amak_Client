"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

type Props = {
  isSubmit: boolean;
};

export const SubmitButton = ({ isSubmit }: Props) => {
  return (
    <Button className="h-9" variant="mix" disabled={isSubmit}>
      {isSubmit ? (
        <div className="flex items-center gap-2">
          <LoaderCircle className="w-4 h-4 animate-spin" />
          <p>Đang xử lý</p>
        </div>
      ) : (
        "Xác nhận"
      )}
    </Button>
  );
};
