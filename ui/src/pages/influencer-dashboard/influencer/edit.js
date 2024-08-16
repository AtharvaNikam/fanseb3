import { Helmet } from 'react-helmet-async';
import { InfluencerEditView } from 'src/sections/influencer/view';
// sections

// ----------------------------------------------------------------------

export default function InfluencerEditPage() {
  return (
    <>
      <Helmet>
        <title> Influencer Edit</title>
      </Helmet>

      <InfluencerEditView />
    </>
  );
}
