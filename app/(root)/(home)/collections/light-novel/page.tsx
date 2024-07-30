import { Metadata } from 'next';
import { Container } from '../../components/container-categoy';

export const metadata: Metadata = {
  title: 'Light novel',
};

export default function Collection() {
  return (
    <Container
      category="Light novel"
      thumbnail="https://file.hstatic.net/200000294254/collection/banner_danh_muc_homepage___collection_1920x580px__light_novel__ce3fdb87f20a4423bca39b43a57eb2e9.jpg"
    />
  );
}
