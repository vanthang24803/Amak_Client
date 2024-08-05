"use client";

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

type Props = {
  isReviewed: boolean;
};

export const ModalReview = ({ isReviewed }: Props) => {
  return (
    <>
      {isReviewed ? (
        // TODO: Create Review
        <>Hello</>
      ) : (
        <Button
          size="sm"
          variant="outline"
          className="border-none uppercase tracking-tighter font-medium text-sky-600 text-[13.5px] hover:text-sky-700/90 hover:bg-transparent"
          onClick={() => toast.success("Hello World")}
        >
          Đánh giá
        </Button>
      )}
    </>
  );
};
