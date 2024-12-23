"use client";

import * as React from "react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CalendarIcon } from "lucide-react";

interface DateTimePickerProps {
  initialDate?: Date;
  onChange?: (date: Date) => void;
  formatString?: string;
  disable?: boolean;
  value?: Date; // Nếu value được truyền vào, trạng thái date sẽ dựa hoàn toàn vào nó.
}

export function DateTimePicker({
  initialDate,
  onChange,
  formatString = "MM/dd/yyyy hh:mm aa",
  disable,
  value,
}: DateTimePickerProps) {
  const controlled = value !== undefined; // Kiểm tra nếu value được truyền vào
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(
    initialDate,
  );
  const date = controlled ? value : internalDate; // Dùng `value` nếu có, ngược lại dùng `internalDate`
  const [isOpen, setIsOpen] = React.useState(false);

  const hours = React.useMemo(
    () => Array.from({ length: 12 }, (_, i) => i + 1),
    [],
  );

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (controlled) return; // Nếu controlled, không thay đổi trạng thái nội bộ
    if (selectedDate) {
      setInternalDate(selectedDate);
      onChange?.(selectedDate);
    }
  };

  const handleTimeChange = (
    type: "hour" | "minute" | "ampm",
    value: string,
  ) => {
    if (!date || controlled) return; // Nếu controlled, không thay đổi trạng thái nội bộ
    const newDate = new Date(date);
    if (type === "hour") {
      const currentHours = newDate.getHours();
      newDate.setHours((parseInt(value) % 12) + (currentHours >= 12 ? 12 : 0));
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(value));
    } else if (type === "ampm") {
      const currentHours = newDate.getHours();
      if (value === "AM" && currentHours >= 12) {
        newDate.setHours(currentHours - 12);
      } else if (value === "PM" && currentHours < 12) {
        newDate.setHours(currentHours + 12);
      }
    }
    setInternalDate(newDate);
    onChange?.(newDate);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild disabled={disable}>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, formatString) : <span>Chọn thời gian</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="sm:flex">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
          />
          <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {hours.map((hour) => (
                  <Button
                    key={hour}
                    size="icon"
                    variant={
                      date && date.getHours() % 12 === hour % 12
                        ? "default"
                        : "ghost"
                    }
                    className="sm:w-full shrink-0 aspect-square"
                    onClick={() => handleTimeChange("hour", hour.toString())}
                  >
                    {hour}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                  <Button
                    key={minute}
                    size="icon"
                    variant={
                      date && date.getMinutes() === minute ? "default" : "ghost"
                    }
                    className="sm:w-full shrink-0 aspect-square"
                    onClick={() =>
                      handleTimeChange("minute", minute.toString())
                    }
                  >
                    {minute}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea className="">
              <div className="flex sm:flex-col p-2">
                {["AM", "PM"].map((ampm) => (
                  <Button
                    key={ampm}
                    size="icon"
                    variant={
                      date &&
                      ((ampm === "AM" && date.getHours() < 12) ||
                        (ampm === "PM" && date.getHours() >= 12))
                        ? "default"
                        : "ghost"
                    }
                    className="sm:w-full shrink-0 aspect-square"
                    onClick={() => handleTimeChange("ampm", ampm)}
                  >
                    {ampm}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
