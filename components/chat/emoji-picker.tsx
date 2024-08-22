"use client";

import { Smile } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

type Props = {
  onChange: (value: string) => void;
};

export const EmojiPicker = ({ onChange }: Props) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Smile />
      </PopoverTrigger>
      <PopoverContent
        side="top"
        sideOffset={0}
        className="bg-transparent border-none shadow-none drop-shadow-none mb-16"
      >
        <Picker
          data={data}
          onEmojiSelect={(emoji: any) => onChange(emoji.native)}
        />
      </PopoverContent>
    </Popover>
  );
};
