import { getProfile } from '@/services/getProfile';
import SocialLoginCard from './socialLoginCard';

export default async function Page() {
  const profile = await getProfile();
  return (
    <div className="flex items-center justify-center overflow-hidden mt-10 w-full">
      <SocialLoginCard profile={profile} />
    </div>
  );
}
