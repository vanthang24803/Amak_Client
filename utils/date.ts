import { parseISO, format, formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

const formatStringToDate = (dateString: string) => {
  const date = parseISO(dateString);
  return format(date, "dd/MM/yyyy HH:ss");
};

const formatDateToNow = (dateString: string) => {
  const date = parseISO(dateString);
  return formatDistanceToNow(date, { locale: vi });
};

export { formatStringToDate, formatDateToNow };
