import { Helmet } from 'react-helmet-async';
import { InfluencerView } from 'src/sections/main/influencer/view';
// sections

// ----------------------------------------------------------------------

export default function InfluencerPage() {
  return (
    <>
      <Helmet>
        <title> Influencer </title>
      </Helmet>

      <InfluencerView />
    </>
  );
}
