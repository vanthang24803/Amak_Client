/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { X } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreateBlogSchema, validateCreateBlogSchema } from "@/validations/form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Tiptap from "@/components/tiptap";
import useAuth from "@/hooks/use-auth";
import _http from "@/utils/http";
import { mutate } from "swr";
import toast from "react-hot-toast";
import { Blog } from "@/types/blog";
import { generateSlug } from "@/utils/slug";
import { DeletePostFrom } from "./delete-post-form";

type Props = {
  post: Blog | undefined;
  isLoading: boolean;
};

export const UpdateBlogForm = ({ post, isLoading }: Props) => {
  const router = useRouter();
  const { profile } = useAuth();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm({
    resolver: zodResolver(validateCreateBlogSchema),
    defaultValues: {
      title: "",
      content: "",
      thumbnail: "",
    },
  });

  useEffect(() => {
    form.setValue("title", post?.title || "");
    form.setValue("content", post?.content || "");
    form.setValue("thumbnail", post?.thumbnail || "");
    setImage(post?.thumbnail || "");
  }, [form, post]);

  const onSubmit = async (data: CreateBlogSchema) => {
    const formData = new FormData();

    formData.set("title", data.title);
    formData.set("content", data.content);

    if (selectedFile) {
      formData.set("thumbnail", selectedFile!);
    }

    try {
      setLoading(true);
      const res = await _http.put(`/Blogs/${post?.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        mutate(`/Blogs/${post?.id}`);
        toast.success("Cập nhật bài viết thành công!");
        router.push(
          `/blogs/${generateSlug(post?.title ?? "", post?.id ?? "")}`,
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleted = async () => {
    try {
      const res = await _http.delete(`/Blogs/${post?.id}`);

      if (res.status === 200) {
        toast.success("Xóa thành công");
        mutate(`/Blogs`);
        router.push(`/profile/blogs`);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra!");
      console.log(error);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setSelectedFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  if (isLoading) {
    return (
      <div className="px-8 bg-white">
        <div className="flex flex-col space-y-4 py-2 pb-20">
          <Skeleton className="h-20 w-full" />
          <div className="flex md:flex-row flex-col justify-between w-full min-h-[400px]">
            <div className="md:basis-1/2 md:mx-4">
              <Skeleton className="h-[400px] w-full" />
            </div>
            <div className="md:basis-1/2 md:border-l md:border-neutral-200 md:px-8 flex flex-col space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <div className="flex items-center space-x-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex flex-col space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
              <Skeleton className="h-[300px] w-full" />
              <Skeleton className="h-40 w-full" />
            </div>
          </div>
          <Skeleton className="h-10 w-40" />
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 bg-white">
      <FormProvider {...form}>
        <form
          className="flex flex-col space-y-4 py-2 pb-20"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="relative">
            <FormField
              disabled={loading}
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <textarea
                      placeholder="Tiêu đề"
                      className="text-3xl w-full mt-6 font-medium h-20 outline-none leading-tight placeholder:opacity-90 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DeletePostFrom handleDelete={handleDeleted} />
          </div>

          <div className="flex md:flex-row flex-col justify-between w-full min-h-[400px]">
            <div className="md:basis-1/2 md:mx-4">
              <FormField
                disabled={loading}
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Tiptap
                        {...field}
                        description={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="md:basis-1/2 md:border-l md:border-neutral-200 md:px-8 flex flex-col space-y-4">
              <h1 className="text-2xl font-bold">{form.watch("title")}</h1>
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={profile?.avatar} className="w-10 h-10" />
                  <AvatarFallback>
                    {profile?.firstName?.[0]}
                    {profile?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium text-sm">
                    {profile?.firstName} {profile?.lastName}
                  </span>
                  <p className="text-xs text-neutral-400">
                    {format(Date.now(), "dd/MM/yyyy HH:mm")}
                  </p>
                </div>
              </div>

              {image ? (
                <div className="relative">
                  <img
                    src={image}
                    alt="blog thumbnail"
                    className="w-full object-cover md:h-[300px] rounded"
                    loading="lazy"
                  />
                  <div
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-neutral-600 absolute top-2 right-2 hover:cursor-pointer shadow"
                    onClick={() => {
                      setImage("");
                      setSelectedFile(null); // Reset selected file
                      form.setValue("thumbnail", "");
                    }}
                  >
                    <X className="w-5 h-5" />
                  </div>
                </div>
              ) : (
                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={({ field }) => (
                    <FormItem>
                      <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center h-[300px] bg-gray-50 hover:bg-gray-100 transition-colors duration-200 ease-in-out cursor-pointer"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                      >
                        <div className="text-center">
                          <div className="flex flex-col gap-1">
                            <p className="mt-2 text-sm text-gray-500">
                              Kéo và thả ảnh vào đây
                            </p>
                            <p className="text-xs text-gray-500">hoặc</p>
                            <label
                              htmlFor="file-upload"
                              className="mt-2 cursor-pointer rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                              Chọn tệp
                            </label>
                          </div>
                          <input
                            id="file-upload"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  setImage(event.target?.result as string);
                                  setSelectedFile(file);
                                  field.onChange(file.name);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <div
                dangerouslySetInnerHTML={{
                  __html: form.watch("content")?.replace(/\n/g, "<br/>"),
                }}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <Button
              disabled={loading}
              type="submit"
              className="w-full md:w-[180px] font-semibold tracking-tight"
              variant="mix"
            >
              Cập nhật bài viết
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full md:w-[180px] font-semibold tracking-tight"
              onClick={() => router.back()}
            >
              Trở lại
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
