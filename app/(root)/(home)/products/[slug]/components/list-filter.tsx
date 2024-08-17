"use client";

import { Button } from "@/components/ui/button";
import { starReview, statusReview } from "@/constants";
import { useRef, useState } from "react";

type Props = {
  onChangeStatus: (status: string) => void;
  onChangeStar: (star: number | null) => void;
};

export const ListFilterReview = ({ onChangeStatus, onChangeStar }: Props) => {
  const statusRef = useRef<(HTMLButtonElement | null)[]>([]);
  const starRef = useRef<(HTMLButtonElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeStar, setActiveStar] = useState<number | null>(null);

  const selectStar = (index: number | null) => {
    let newActiveStar;
    if (activeStar === index) {
      newActiveStar = null;
      onChangeStar(null);
    } else {
      newActiveStar = index;
      onChangeStar(index !== null ? starReview[index]?.value : null);
    }
    setActiveStar(newActiveStar);
  };

  const selectStatus = (index: number) => {
    setActiveIndex(index);

    onChangeStatus(statusReview[index].value);
  };

  return (
    <div className="mt-3 flex items-center space-x-2 overflow-scroll md:overflow-hidden">
      <div className="flex items-center space-x-2">
        {statusReview.map((item, index) => (
          <Button
            ref={(e) => {
              statusRef.current[index] = e;
              return undefined;
            }}
            onClick={() => selectStatus(index)}
            variant={activeIndex === index ? "primary" : "outline"}
            key={index}
          >
            {item.name}
          </Button>
        ))}
      </div>
      <div className="flex items-center space-x-2">
        {starReview.map((item, index) => (
          <Button
            ref={(e) => {
              starRef.current[index] = e;
              return undefined;
            }}
            onClick={() => selectStar(index)}
            variant={activeStar === index ? "primary" : "outline"}
            key={index}
          >
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
};
