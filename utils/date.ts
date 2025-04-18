import {
  parseISO,
  format,
  formatDistanceToNow,
  parse,
  differenceInDays,
} from "date-fns";
import { vi } from "date-fns/locale";

const formatStringToDate = (
  dateString: string,
  formatType: string = "dd/MM/yyyy",
) => {
  const date = parseISO(dateString);
  return format(date, formatType);
};

const formatDateToNow = (dateString: string) => {
  const date = parseISO(dateString);
  return formatDistanceToNow(date, { locale: vi });
};

const convertToVietnameseMonth = (monthAbbreviation: string | null) => {
  if (monthAbbreviation) {
    const date = parse(monthAbbreviation, "MMM", new Date());

    const formattedMonth = format(date, "MMMM", { locale: vi });
    return `T${formattedMonth.slice(1)}`;
  }
};

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const countDaysDifference = (date: string) => {
  const pastDate = new Date(date);
  const currentDate = new Date();
  return differenceInDays(currentDate, pastDate);
};

export {
  formatStringToDate,
  formatDateToNow,
  convertToVietnameseMonth,
  formatTime,
  countDaysDifference,
};
