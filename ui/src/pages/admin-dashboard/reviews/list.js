import { Helmet } from 'react-helmet-async';
import ReviewsListView from 'src/sections/admin/reviews/view/reviews-list-view';
// sections

// ----------------------------------------------------------------------

export default function ProductListPage() {
  return (
    <>
      <Helmet>
        <title> Reviews </title>
      </Helmet>

      <ReviewsListView />
    </>
  );
}
