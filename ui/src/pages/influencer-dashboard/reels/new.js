import { Helmet } from 'react-helmet-async';
// sections
import { ReelsCreateView } from 'src/sections/reels/view';

// ----------------------------------------------------------------------

export default function ReelsCreatePage() {
  return (
    <>
      <Helmet>
        <title> Reels </title>
      </Helmet>

      <ReelsCreateView />
    </>
  );
}
