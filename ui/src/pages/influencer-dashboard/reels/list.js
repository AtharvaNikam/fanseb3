import { Helmet } from 'react-helmet-async';
// sections
import { ReelsListView } from 'src/sections/reels/view';

// ----------------------------------------------------------------------

export default function ReelsListPage() {
  return (
    <>
      <Helmet>
        <title> Reels </title>
      </Helmet>

      <ReelsListView />
    </>
  );
}
