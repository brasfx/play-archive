import { LoginForm } from '@/components/ui/login-form';
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

export default async function LoginPage({ searchParams }) {
  const t = await getTranslations('login');

  const session = await getServerSession();
  const { callbackUrl } = await searchParams;

  console.log('searchParamas', searchParams);

  if (session) {
    redirect(callbackUrl || '/');
  }

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm
          title={t('title')}
          githubLabel={t('github')}
          googleLabel={t('google')}
          continueText={t('continue')}
          emailLabel={t('email')}
          passwordLabel={t('password')}
          forgotLabel={t('forgot')}
          loginLabel={t('login')}
          dontHaveAccount={t('donthaveaccount')}
          signupLabel={t('signup')}
        />
      </div>
    </div>
  );
}
