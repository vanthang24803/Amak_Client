"use client";

import { Photo } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import Image from "next/image";
import { X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Fragment, useState } from "react";
import { CreateMedia } from "./create-media";
import { useParams } from "next/navigation";
import _http from "@/utils/http";
import { mutate } from "swr";

type Props = {
  photos: Photo[] | undefined;
  open: boolean;
  handleClose: () => void;
};

export const UpdateMedia = ({ photos, open, handleClose }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const params = useParams<{ id: string }>();

  const handleActive = () => setIsActive(!isActive);

  const handleRemoveImage = (id: string) => {
    try {
      const removePhoto = _http.delete(`/Products/${params.id}/Photos/${id}`);

      toast.promise(removePhoto, {
        loading: "Đang xử lý...",
        success: () => {
          mutate(`/Products/${params.id}`);
          handleClose();
          return "Xóa ảnh thành công!";
        },
        error: () => "Có lỗi xảy ra",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isActive ? "Thêm mới" : "Cập nhật"}</DialogTitle>
          <DialogDescription className="text-[13px]">
            {isActive
              ? "Hãy tải lên các hình ảnh mới và nhấn nút xác nhận để hoàn thành"
              : "Thực hiện thay đổi cho danh sách hình ảnh ở đây. Nhấp vào lưu khi bạn hoàn tất."}
          </DialogDescription>
        </DialogHeader>
        {isActive ? (
          <CreateMedia handleClose={handleActive} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {photos?.map((item, index) => (
              <div key={index} className="relative aspect-square">
                <Image
                  src={item.url}
                  width={400}
                  height={200}
                  alt="images"
                  className="object-fill rounded-md"
                />
                <button
                  onClick={() => handleRemoveImage(item.id)}
                  className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ))}
          </div>
        )}
        <DialogFooter>
          {isActive ? (
            <Fragment>
              <Button className="h-8" variant="outline" onClick={handleActive}>
                Thoát
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <Button className="h-8" variant="mix" onClick={handleActive}>
                Thêm mới
              </Button>
              <Button className="h-8" variant="outline" onClick={handleClose}>
                Xác nhận
              </Button>
            </Fragment>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
