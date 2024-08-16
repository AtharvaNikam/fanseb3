import { Helmet } from 'react-helmet-async';
// sections
import { ReelsEditView } from 'src/sections/reels/view';

// ----------------------------------------------------------------------

export default function ReelsEditPage() {
  return (
    <>
      <Helmet>
        <title> Reels </title>
      </Helmet>

      <ReelsEditView />
    </>
  );
}
