import { Helmet } from 'react-helmet-async';
// sections
import ServicesView from 'src/sections/services/view/services-view';

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title> Services </title>
      </Helmet>

      <ServicesView />
    </>
  );
}
