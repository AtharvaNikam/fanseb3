import { Helmet } from 'react-helmet-async';
import { useGetInfluencer } from 'src/api/influencers';
import { useParams } from 'src/routes/hook';
import { InfluencerDetailsView } from 'src/sections/main/influencer/view';
// sections

// ----------------------------------------------------------------------

export default function InfluencerPage() {
  const params = useParams();
  const { influencerId } = params;
  const { influencer: currentInfluencer } = useGetInfluencer(influencerId);
  return (
    <>
      <Helmet>
        <title> Influencer Details </title>
      </Helmet>
      {currentInfluencer && <InfluencerDetailsView currentInfluencer={currentInfluencer} />}
    </>
  );
}
