import { Helmet } from 'react-helmet-async';
import { InfluencerCreateView } from 'src/sections/influencer/view';

export default function InfluencerNewPage() {
  return (
    <>
      <Helmet>
        <title> Influencer </title>
      </Helmet>

      <InfluencerCreateView />
    </>
  );
}
