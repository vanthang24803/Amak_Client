import { UserAnalytic, Response, Profile } from "@/types";
import _http from "@/utils/http";

const fetchAnalyticAccounts = () =>
  _http.get<Response<UserAnalytic[]>>(`/Analytic/Accounts`);

const getDetailAccount = async (id: string) => {
  const response = await _http.get<Response<Profile>>(
    `/Analytic/Accounts/${id}`
  );

  if (response.status === 200) {
    return response.data.result;
  }

  throw new Error("Filer");
};

export { fetchAnalyticAccounts, getDetailAccount };
