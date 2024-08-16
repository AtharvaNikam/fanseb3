import { Helmet } from 'react-helmet-async';
import InfluencerListView from 'src/sections/influencer/view/influencer-list-view';

export default function InfluencerListPage() {
  return (
    <>
      <Helmet>
        <title> Influencers </title>
      </Helmet>

      <InfluencerListView />
    </>
  );
}
