"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import useAuth from "@/hooks/use-auth";
import { Fragment, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

const formSchema = z.object({
  firstName: z
    .string()
    .min(1, {
      message: "Không được bỏ trống",
    })
    .max(255, {
      message: "Tên quá dài",
    }),
  lastName: z
    .string()
    .min(1, {
      message: "Không được bỏ trống",
    })
    .max(255, {
      message: "Tên quá dài",
    }),
});

export const FullNameDialogDashboard = () => {
  const { profile } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: profile?.firstName ?? "",
      lastName: profile?.lastName ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      handleOpen();
      toast.success("Cập nhật thành công!");

      console.log(values);
    } catch (error) {
      toast.error("Có lỗi xảy ra!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Fragment>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-20">
            <span className=" text-[12.5px] font-medium dark:text-destructive-foreground tracking-tight">
              Họ và tên
            </span>
            <span className=" text-[12.5px] font-medium dark:text-destructive-foreground tracking-tight">
              {profile?.firstName} {profile?.lastName}
            </span>
          </div>
          <Button
            variant="outline"
            className="dark:bg-neutral-900 text-[12px]"
            onClick={() => setOpen(true)}
          >
            Cập nhật
          </Button>
        </div>
        <Separator />
      </div>
      <Dialog open={open} onOpenChange={handleOpen}>
        <DialogContent className="md:rounded-lg w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-[16px]">
              Cập nhật thông tin
            </DialogTitle>
          </DialogHeader>
          <CardContent className="md:p-0">
            <Form {...form}>
              <form
                className="flex flex-col gap-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex flex-col space-y-2">
                            <FormLabel>Họ*</FormLabel>
                            <Input
                              autoComplete="off"
                              placeholder="May"
                              className="md:rounded-md"
                              {...field}
                            />
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex flex-col space-y-2">
                            <FormLabel>Tên*</FormLabel>
                            <Input
                              autoComplete="off"
                              placeholder="May"
                              className="md:rounded-md"
                              {...field}
                            />
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-center justify-end gap-3">
                  <Button type="button" variant="ghost" onClick={handleOpen}>
                    Thoát
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <LoaderCircle className="w-4 h-4 animate-spin" />
                    ) : (
                      "Xác nhận"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};
