import { LoginForm } from '@/components/ui/login-form';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

export default async function LoginPage({ searchParams }) {
  const session = await getServerSession();
  const { callbackUrl } = await searchParams;

  if (session) {
    redirect(callbackUrl || '/');
  }

  return <LoginForm />;
}
