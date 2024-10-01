"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import _http from "@/utils/http";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Upload, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const schema = z.object({
  image: z
    .any()
    .refine(
      (file) => file && file.size <= MAX_FILE_SIZE,
      "File hình ảnh phải có size nhỏ hơn 5MB"
    )
    .refine(
      (file) => file && ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Các định dạng được chấp nhận: .jpg, .jpeg, .png, .webp"
    ),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  reload: () => void;
};

export const CreateBillboard = ({ reload }: Props) => {
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen(!open);

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setValue("image", file, { shouldValidate: true });
        setPreview(URL.createObjectURL(file));
      }
    },
    [setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxFiles: 1,
  });

  const onSubmit = (data: FormValues) => {
    const formData = new FormData();
    formData.append("billboard", data.image);
    formData.append("url", "/");

    try {
      setLoading(true);
      const handleUpdate = _http.post(`Billboards`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.promise(handleUpdate, {
        loading: "Đang xử lý...",
        success: () => {
          reload();
          handleToggle();
          reset();
          setPreview(null);
          return "Tải lên hình ảnh thành công!";
        },
        error: () => "Định dạng file không hợp lệ",
      });
    } catch (error) {
      console.log("Error uploading photos:", error);
    } finally {
      setLoading(false);
    }

    console.log(data);
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    setValue("image", undefined, { shouldValidate: true });
    reset({ image: undefined });
  };

  return (
    <Dialog open={open} onOpenChange={handleToggle}>
      <DialogTrigger>
        <Button
          variant="outline"
          className="flex items-center space-x-2 text-[12px] h-9"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm mới</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Cập nhật</DialogTitle>
          <DialogDescription className="text-[13px]">
            Hãy tải lên hình ảnh mới và nhấn nút xác nhận để hoàn thành
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${
              isDragActive ? "border-primary" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} {...register("image")} />
            {preview ? (
              <div className="relative w-full h-48">
                <Image
                  src={preview}
                  alt="Preview"
                  layout="fill"
                  objectFit="contain"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 text-muted-foreground rounded-full p-1"
                >
                  <X
                    size={22}
                    className="hover:scale-110 transition-all ease-in-out"
                  />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48">
                <Upload className="w-12 h-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  Kéo và thả hình ảnh vào đây hoặc click để chọn file
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  (Chấp nhận các định dạng .jpg, .jpeg, .png, .webp)
                </p>
              </div>
            )}
          </div>
          {errors.image && (
            <p className="text-red-500 text-[13px] tracking-tighter font-semibold">
              {errors.image.message as string}
            </p>
          )}
          <Button
            type="submit"
            className="w-full"
            variant="mix"
            disabled={!preview || loading}
          >
            Xác nhận
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
