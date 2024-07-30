import { Metadata } from 'next';
import { RegisterHandler } from './components/register-handler';

export const metadata: Metadata = {
  title: 'Đăng ký',
};

export default function Register() {
  return <RegisterHandler />;
}
