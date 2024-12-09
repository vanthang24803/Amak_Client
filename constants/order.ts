export const statusList: { [key: string]: { color: string; value: string } } = {
  PENDING: {
    color: "#dc2626",
    value: "Đang chờ xử lý",
  },
  CREATE: {
    color: "#f59e0b",
    value: "Đang chuẩn bị hàng",
  },
  SHIPPING: {
    color: "#0284c7",
    value: "Đang giao hàng",
  },
  SUCCESS: {
    color: "#16a34a",
    value: "Đã giao hàng thành công",
  },
};
