import { Helmet } from 'react-helmet-async';
import { RefundsDetailsView } from 'src/sections/admin/refunds/view';
// sections

// ----------------------------------------------------------------------

export default function UserCreatePage() {
  // const { id } = useParams();

  // const { refund: currentRefund } = useGetRefund(id);
  return (
    <>
      <Helmet>
        <title> Refunds </title>
      </Helmet>

      <RefundsDetailsView />
    </>
  );
}
