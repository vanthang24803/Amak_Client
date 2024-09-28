import { UserAnalytic, Response } from "@/types";
import _http from "@/utils/http";

const fetchAnalyticAccounts = () =>
  _http.get<Response<UserAnalytic[]>>(`/Analytic/Accounts`);

export { fetchAnalyticAccounts };
