import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { StepperFormValues } from "@/types/hook-stepper";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

export const ThumbnailForm = () => {
  const [preview, setPreview] = useState<string | null>(null);

  const {
    formState: { errors },
    register,
    reset,
    setValue,
    clearErrors,
  } = useFormContext<StepperFormValues>();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setValue("thumbnail", file, { shouldValidate: true });
        setPreview(URL.createObjectURL(file));
        clearErrors("thumbnail");
      }
    },
    [setValue, clearErrors]
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

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    setValue("thumbnail", undefined, { shouldValidate: true });
    reset({ thumbnail: undefined });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[15px]">Thumbnail</CardTitle>
        <CardDescription className="text-[12px]">
          Tải lên thumbnail của sản phẩm
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${
            isDragActive ? "border-primary" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} {...register("thumbnail")} />
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
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5"
              >
                <X size={16} />
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
        {errors.thumbnail && (
          <p className="text-red-500 text-[13px] tracking-tighter font-semibold">
            {errors.thumbnail.message as string}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
