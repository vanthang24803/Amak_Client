"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { z } from "zod";
import { Input } from "../ui/input";
import _http from "@/utils/http";
import { GeminiChatResponse } from "@/types/gemini-chat";

const formSchema = z.object({
  message: z.string().min(1),
});

interface ChatWithAIInputProps {
  onNewMessage: (message: GeminiChatResponse[]) => void;
}

export const ChatWithAIInput = ({ onNewMessage }: ChatWithAIInputProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      const response = await _http.post<GeminiChatResponse[]>(
        `/Gemini/Chat`,
        value,
      );

      if (response.status === 200) {
        form.reset();
        onNewMessage(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="absolute bottom-0 w-[85%] px-1"
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4">
                  <Input
                    disabled={isLoading}
                    autoComplete="off"
                    className="p-6 bg-zinc-100/90 border-none border-0 focus-visible:right-0 focus-visible:ring-offset-0 text-zinc-600 rounded-md"
                    placeholder="Hỏi với AI"
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
