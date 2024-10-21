"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { X } from "lucide-react";
import _http from "@/utils/http";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { mutate } from "swr";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const schema = z.object({
  images: z
    .array(
      z.object({
        name: z.string(),
        size: z
          .number()
          .max(MAX_FILE_SIZE, "File hình ảnh phải có size <= 5mb"),
      })
    )
    .min(1, "Hãy tải lên ít nhất 1 hình ảnh")
    .max(5, "Bạn chỉ có thể upload tối đa 5 hình ảnh"),
});

type Props = {
  handleClose: () => void;
};

export type CreteMediaType = z.infer<typeof schema>;

export const CreateMedia = ({ handleClose }: Props) => {
  const params = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);

  const form = useForm<CreteMediaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      images: [],
    },
  });

  const onSubmit = async (_: CreteMediaType) => {
    const formData = new FormData();

    const images = (document.getElementById("file-upload") as HTMLInputElement)
      ?.files;

    if (images) {
      Array.from(images).forEach((file) => {
        formData.append("photos", file);
      });
    }

    try {
      setLoading(true);
      const handleUpdate = _http.post(
        `/Products/${params.id}/Photos`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.promise(handleUpdate, {
        loading: "Đang xử lý...",
        success: () => {
          mutate(`/Products/${params.id}`);
          handleClose();
          return "Tải lên hình ảnh thành công!";
        },
        error: () => "Định dạng file không hợp lệ",
      });
    } catch (error) {
      console.log("Error uploading photos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const fileObjects = files.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
    }));

    form.setValue("images", fileObjects, { shouldValidate: true });

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    const fileObjects = files.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
    }));

    form.setValue("images", fileObjects, { shouldValidate: true });

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    const currentImages = form.getValues("images");
    const updatedImages = [
      ...currentImages.slice(0, index),
      ...currentImages.slice(index + 1),
    ];
    form.setValue("images", updatedImages, { shouldValidate: true });

    setPreviews((prevPreviews) => [
      ...prevPreviews.slice(0, index),
      ...prevPreviews.slice(index + 1),
    ]);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {previews.length < 5 && (
          <FormField
            control={form.control}
            name="images"
            disabled={loading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hình ảnh</FormLabel>
                <FormControl>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer h-32 flex items-center justify-center"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer text-[13px]"
                    >
                      Kéo thả hình ảnh hoặc tải lên hình ảnh tại đây
                    </label>
                  </div>
                </FormControl>
                <FormDescription className="text-[13px] tracking-tight">
                  Tải lên tối đa 5 hình ảnh (mỗi hình tối đa 5MB). Các định dạng
                  được chấp nhận: .jpg, .jpeg, .png, .webp
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {previews.length > 0 && (
          <div className="grid grid-cols-5 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative">
                <Image
                  src={preview}
                  width={400}
                  height={200}
                  alt={`Preview ${index + 1}`}
                  className="object-fill rounded-md"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ))}
          </div>
        )}

        <Button type="submit" className="h-8" variant="mix" disabled={loading}>
          Xác nhận
        </Button>
      </form>
    </Form>
  );
};
