"use client";

import useFetch from "@/hooks/use-fetch";
import { Product } from "@/types/product";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { Spinner } from "../spinner";
import PhotoModal from "./photo-modal";
import InformationModal from "./information-modal";

type Props = {
  id: string;
};

export const ProductModal = ({ id }: Props) => {
  const { data } = useFetch<Product>({
    url: `/Products/${id}`,
  });

  return (
    <Dialog>
      <DialogTrigger>
        <div className="w-8 h-8 rounded-full items-center justify-center absolute top-[30%] left-[45%] bg-white text-neutral-600  hidden group-hover:flex hover:bg-black hover:text-white ">
          <Eye />
        </div>
      </DialogTrigger>  

      <DialogContent>
        {data ? (
          <div className="flex items-start justify-between">
            <div className="basis-1/2">
              <PhotoModal photos={data?.photos} />
            </div>

            <div className="basis-1/2">
              <InformationModal product={data} />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[30vh]">
            <Spinner />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
