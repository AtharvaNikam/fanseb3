import { Helmet } from 'react-helmet-async';
import { useRouter } from 'src/routes/hook';
import { InfluencerView } from 'src/sections/main/influencer/view';
import { useEffect } from 'react';
import { useCheckout } from 'src/sections/hooks';
// sections

// ----------------------------------------------------------------------

export default function ReelsPage() {
  const { checkout } = useCheckout();
  const { currentReelId } = checkout;
  const router = useRouter();
  useEffect(() => {
    if (currentReelId) {
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
