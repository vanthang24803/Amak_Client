import { Container } from "./components/container";

interface Props {
  params: {
    id: string;
  };
}

export default function SuccessPage({ params }: Props) {
  return <Container id={params.id} />;
}
