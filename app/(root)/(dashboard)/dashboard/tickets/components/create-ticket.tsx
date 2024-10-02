"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AddNewButton } from "../../_components/add-new-btn";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Archive, Code, Percent } from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";
import { useState } from "react";
import { z } from "zod";
import { validationTicketSchema } from "@/validations/ticket";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, startOfToday } from "date-fns";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { nanoid } from "nanoid";
import _http from "@/utils/http";
import { toast } from "sonner";
import { SubmitButton } from "../../_components/submit-btn";
import { useQueryClient } from "@tanstack/react-query";

type FormSchema = z.infer<typeof validationTicketSchema>;

export const CreateTicket = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const handleToggle = () => {
    form.reset();
    setOpen(!open);
  };

  const handleRandomCode = (e: React.FormEvent) => {
    e.preventDefault();
    form.setValue("code", nanoid(10));
  };

  const handleQuantity = (e: React.FormEvent) => {
    e.preventDefault();
    const quantity = form.watch("quantity");
    form.setValue("quantity", Number(quantity) + 100);
  };

  const form = useForm({
    resolver: zodResolver(validationTicketSchema),
    defaultValues: {
      name: "",
      code: "",
      quantity: 0,
      discount: 0,
      startDate: startOfToday(),
      endDate: addDays(new Date(), 1),
    },
  });

  const discount = Number(form.watch("discount"));

  const handleDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    if (discount < 90) {
      form.setValue("discount", discount + 10);
    }
  };

  const onSubmit = async (data: FormSchema) => {
    try {
      setLoading(true);

      const handleCreate = _http.post(`/Tickets`, data);

      toast.promise(handleCreate, {
        loading: "Đang xử lý...",
        success: () => {
          queryClient.invalidateQueries({
            queryKey: [`dashboard-tickets`],
          });
          handleToggle();
          return "Tạo mới thành công!";
        },
        error: () => "Oops!",
      });
    } catch (error) {
      console.log("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleToggle}>
      <SheetTrigger>
        <AddNewButton />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Tạo mới mã giảm giá</SheetTitle>
          <SheetDescription>
            Hãy hoàn thiện các thông tin cần thiết để tạo mới 1 mã giảm giá
          </SheetDescription>
        </SheetHeader>
        <FormProvider {...form}>
          <form
            className="flex flex-col gap-2 my-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col gap-1">
                      <Label>Tên</Label>
                      <Input className="h-9 rounded" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="code"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col gap-1">
                      <Label>Mã giảm giá</Label>
                      <div className="flex items-center space-x-2">
                        <Input className="h-9 rounded" {...field} />
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="h-9"
                                onClick={handleRandomCode}
                              >
                                <Code className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                              <p className="text-[11px]">Tạo ngẫu nhiên</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col gap-1">
                      <Label>Số lượng</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          className="h-9 rounded"
                          type="number"
                          {...field}
                        />

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="h-9"
                                onClick={handleQuantity}
                              >
                                <Archive className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                              <p className="text-[11px]">+100</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discount"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col gap-1">
                      <Label>Giảm giá</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          className="h-9 rounded"
                          {...field}
                          type="number"
                        />
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Button
                                variant="outline"
                                type="button"
                                size="icon"
                                className="h-9"
                                disabled={discount >= 90}
                                onClick={handleDiscount}
                              >
                                <Percent className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                              <p className="text-[11px]">+10%</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col gap-1">
                      <Label>Ngày khởi tạo</Label>
                      <div className="flex items-center space-x-2">
                        <DatePicker
                          className="flex-1"
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col gap-1">
                      <Label>Ngày kết thúc</Label>
                      <div className="flex items-center space-x-2">
                        <DatePicker
                          className="flex-1"
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex-1 flex items-center justify-end">
              <SubmitButton isSubmit={loading} />
            </div>
          </form>
        </FormProvider>
      </SheetContent>
    </Sheet>
  );
};
