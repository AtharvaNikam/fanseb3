import { Helmet } from 'react-helmet-async';
import { HomeViews } from 'src/sections/home/view';

// sections

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title> Home </title>
      </Helmet>

      <HomeViews />
    </>
  );
}
