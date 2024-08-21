"use client";

import * as z from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "../ui/input";
import { Plus } from "lucide-react";
import { useSocket } from "../providers/socket-provider";

const formSchema = z.object({
  content: z.string().min(1),
});

export const InputChat = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const { socket } = useSocket();

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    socket.emit("message", value);
    form.reset();
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="absolute bottom-0 w-[95%]"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <button
                    type="button"
                    onClick={() => {}}
                    className="absolute top-7 left-8 w-[24px] h-[24px] bg-zinc-500 hover:bg-zinc-600 rounded-full p-1 flex items-center justify-center"
                  >
                    <Plus className="text-white" />
                  </button>
                  <Input
                    disabled={isLoading}
                    autoComplete="off"
                    className="px-14 py-6 bg-zinc-100/90 border-none border-0 focus-visible:right-0 focus-visible:ring-offset-0 text-zinc-600 rounded-md"
                    placeholder="Tin nhắn"
                    {...field}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </FormProvider>
  );
};
