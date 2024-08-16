import { Helmet } from 'react-helmet-async';
import { InfluencerDetailsView } from 'src/sections/influencer/view';
// sections

// ----------------------------------------------------------------------

export default function InfluencerDetailsPage() {
  return (
    <>
      <Helmet>
        <title> Influencer Details</title>
      </Helmet>

      <InfluencerDetailsView />
    </>
  );
}
