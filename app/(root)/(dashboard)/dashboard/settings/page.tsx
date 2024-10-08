import { Container } from "./_components/container";
import { ContainerHeader } from "./_components/container/conatiner-header";
import { MainContainer } from "./_components/container/main-container";
export default function SettingsComponent() {
  return (
    <Container>
      <ContainerHeader title="Tổng quát" desc="Chỉnh sửa tổng quát hệ thống" />
      <MainContainer />
    </Container>
  );
}
