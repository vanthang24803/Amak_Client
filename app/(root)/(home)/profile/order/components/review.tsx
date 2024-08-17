"use client";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import useFetchOrder from "@/hooks/use-fetch-order";
import { useState } from "react";
import toast from "react-hot-toast";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Tiptap from "@/components/tiptap";
import { StarRating } from "./star-rating";
import { Upload } from "./upload";
import _http from "@/utils/http";

type Props = {
  orderId: string;
};

const formSchema = z.object({
  content: z.string().min(1).max(255),
});

type CreateFormValue = z.infer<typeof formSchema>;

export const ModalReview = ({ orderId }: Props) => {
  const { fetchData: fetchOrders } = useFetchOrder();

  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState<number | null>(null);

  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (data: CreateFormValue) => {
    const formData = new FormData();
    formData.append("content", data.content);
    formData.append("star", String(rating));
    formData.append("orderId", orderId);
    if (files) {
      Array.from(files).forEach((file) => {
        formData.append("photos", file);
      });
    }

    try {
      setLoading(true);

      await _http.post(`/Reviews`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Thành công");
      setRating(null);
      setFiles(null);
      form.reset();
      fetchOrders();
      handlerOpen();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlerOpen = () => {
    setRating(null);
    setFiles(null);
    setOpen(!open);
  };

  return (
    <Dialog open={open} onOpenChange={handlerOpen}>
      <DialogTrigger>
        <Button size="sm" variant="mix" className="rounded-sm">
          Đánh giá
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            Đánh giá đơn hàng của bạn
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
          <form
            className="flex flex-col space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <StarRating setRating={setRating} rating={rating} />

            <Upload files={files} setFiles={setFiles} />

            <FormField
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
            <Button
              variant="primary"
              type="submit"
              disabled={rating === null || loading}
            >
              Xác nhận
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
