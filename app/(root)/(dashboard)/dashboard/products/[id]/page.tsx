import { Wrapper } from "./components/wrapper";

type Props = {
  params: {
    id: string;
  };
};

export default function UpdateProductDashboard({ params }: Props) {
  if (!params.id) return null;

  return <Wrapper id={params.id} />;
}
