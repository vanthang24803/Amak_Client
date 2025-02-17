import { Metadata } from "next";
import { Wrapper } from "./components/wrapper";

export const metadata: Metadata = {
  title: " Trả hàng / Hoàn tiền",
};

type Props = {
  params: {
    orderId: string;
  };
};

export default function RefundOrderPage({ params }: Props) {
  return <Wrapper id={params.orderId} />;
}
