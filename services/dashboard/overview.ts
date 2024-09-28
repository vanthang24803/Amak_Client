import { PieChartType } from "@/app/(root)/(dashboard)/dashboard/_components/overview/pie-chart";
import { TopCustomerTable } from "@/app/(root)/(dashboard)/dashboard/_components/overview/table/customer";
import { TopProductTable } from "@/app/(root)/(dashboard)/dashboard/_components/overview/table/product";
import { AreaChartType, BarChart, Response } from "@/types";
import { AnalyticStatistic } from "@/types/statistic";
import _http from "@/utils/http";

const fetchTopCustomers = async () => {
  const response = await _http.get<Response<TopCustomerTable>>(
    `/Analytic/TopCustomer`
  );
  if (response.status === 200) {
    return response.data.result;
  }
  throw new Error("Failed to fetch top customers");
};

const fetchTopProducts = async () => {
  const response =
    await _http.get<Response<TopProductTable>>(`/Analytic/TopProduct`);
  if (response.status === 200) {
    return response.data.result;
  }
  throw new Error("Failed to fetch top products");
};

const fetchPieChart = async () => {
  const response =
    await _http.get<Response<PieChartType[]>>(`/Analytic/PieChart`);
  if (response.status === 200) {
    return response.data.result;
  }
  throw new Error("Không tìm thấy dữ liệu");
};

const fetchBarOverviewChart = async () => {
  const response = await _http.get<Response<BarChart>>(`/Analytic/BarChart`);
  if (response.status === 200) {
    return response.data.result;
  }

  throw new Error("Không tìm thấy dữ liệu");
};

const fetchAreaChart = async () => {
  const response =
    await _http.get<Response<AreaChartType>>(`/Analytic/AreaChart`);
  if (response.status === 200) {
    return response.data.result;
  }
  throw new Error("Không tìm thấy dữ liệu");
};

const fetchAnalytic = async () => {
  const response =
    await _http.get<Response<AnalyticStatistic>>(`/Analytic/Statistic`);
  if (response.status === 200) {
    return response.data.result;
  }
  throw new Error("Không tìm thấy dữ liệu");
};

export {
  fetchAnalytic,
  fetchTopProducts,
  fetchTopCustomers,
  fetchPieChart,
  fetchBarOverviewChart,
  fetchAreaChart,
};
