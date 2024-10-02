import { Ticket, Response } from "@/types";
import _http from "@/utils/http";

const fetchTickets = async () => {
  const response = await _http.get<Response<Ticket[]>>(`/Tickets`, {
    params: {
      Limit: 100,
    },
  });
  if (response.status === 200) {
    return response.data.result;
  }

  throw new Error("Fetching API Wrong!");
};

export { fetchTickets };
