"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";

const languages = [
  { value: "en", label: "English" },
  { value: "vi", label: "Tiếng Việt" },
  { value: "ja", label: "日本語" },
  { value: "zh", label: "中文" },
  { value: "ko", label: "한국어" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  { value: "es", label: "Español" },
  { value: "it", label: "Italiano" },
  { value: "ru", label: "Русский" },
];

export const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("vi");

  const handleValueChange = (value: string) => {
    setSelectedLanguage(value);
    toast.success("Cập nhật thành công!");
  };

  return (
    <div className="space-y-2 w-[200px]">
      <Select value={selectedLanguage} onValueChange={handleValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((language) => (
            <SelectItem value={language.value} key={language.value}>
              {language.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
