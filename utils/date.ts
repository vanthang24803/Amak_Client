import { parseISO, format, formatDistanceToNow, parse } from "date-fns";
import { vi } from "date-fns/locale";

const formatStringToDate = (dateString: string) => {
  const date = parseISO(dateString);
  return format(date, "dd/MM/yyyy HH:ss");
};

const formatDateToNow = (dateString: string) => {
  const date = parseISO(dateString);
  return formatDistanceToNow(date, { locale: vi });
};

const convertToVietnameseMonth = (monthAbbreviation: string | null) => {
  if (monthAbbreviation) {
    const date = parse(monthAbbreviation, "MMM", new Date());

    return format(date, "MMMM", { locale: vi });
  }
};

export { formatStringToDate, formatDateToNow , convertToVietnameseMonth };
