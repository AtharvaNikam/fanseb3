import { Helmet } from 'react-helmet-async';
import { useRouter } from 'src/routes/hook';
import { InfluencerView } from 'src/sections/main/influencer/view';
import { useEffect } from 'react';
import { useCheckout } from 'src/sections/hooks';

export default function ReelsPage() {
  const { checkout } = useCheckout();
  const { currentReelId } = checkout;
  const router = useRouter();

  useEffect(() => {
    // Ensure `currentReelId` is valid before pushing to a new route
    if (currentReelId && typeof currentReelId === 'string') {
      router.push(`/reels/${currentReelId}`);
    }
  }, [currentReelId, router]);

  return (
    <>
      <Helmet>
        <title> Reels </title>
      </Helmet>

      <InfluencerView />
    </>
  );
}
