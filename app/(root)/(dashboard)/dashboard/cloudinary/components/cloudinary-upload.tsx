"use client";

import { Loader, UploadCloud, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import _http from "@/utils/http";
import { useQueryClient } from "@tanstack/react-query";

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

export type CreteMediaType = z.infer<typeof schema>;

export const UploadCloudinary = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleToggle = () => setOpen(!open);

  const form = useForm<CreteMediaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      images: [],
    },
  });

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

  const onSubmit = async (_: CreteMediaType) => {
    const formData = new FormData();

    const images = (document.getElementById("file-upload") as HTMLInputElement)
      ?.files;

    if (images) {
      Array.from(images).forEach((file) => {
        formData.append("files", file);
      });
    }

    try {
      setLoading(true);
      const handleUpdate = _http.post(`/Cloudinary`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.promise(handleUpdate, {
        loading: "Đang xử lý...",
        success: () => {
          queryClient.invalidateQueries({
            queryKey: [`dashboard-cloudinary-photos`],
          });
          handleToggle();
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

  return (
    <Dialog open={open} onOpenChange={handleToggle}>
      <DialogTrigger>
        <Button
          variant="outline"
          className="flex items-center space-x-2 text-[12px] h-9"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Tải lên</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm mới</DialogTitle>
          <DialogDescription className="text-[13px]">
            Hãy tải lên các hình ảnh mới và nhấn nút xác nhận để hoàn thành
          </DialogDescription>
        </DialogHeader>
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
                      Tải lên tối đa 5 hình ảnh (mỗi hình tối đa 5MB). Các định
                      dạng được chấp nhận: .jpg, .jpeg, .png, .webp
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

            <Button
              type="submit"
              className="h-8"
              variant="mix"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Đang xử lý</span>
                </div>
              ) : (
                "Xác nhận"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
