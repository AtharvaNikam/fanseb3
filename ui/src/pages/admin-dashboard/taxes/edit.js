import { Helmet } from 'react-helmet-async';
import { TaxesEditView } from 'src/sections/admin/taxes/view';
// sections

// ----------------------------------------------------------------------

export default function ProductCreatePage() {
  return (
    <>
      <Helmet>
        <title>Taxes</title>
      </Helmet>

      <TaxesEditView />
    </>
  );
}
