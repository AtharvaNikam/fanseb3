// @mui
import Container from '@mui/material/Container';
// routes
import { useParams } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
// api
// components
import { useGetTax } from 'src/api/taxes';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import TaxesNewEditDetails from '../taxes-new-edit-details';
// import VoucherNewEditForm from '../categories-new-edit-form';
//

// ----------------------------------------------------------------------

export default function TaxesEditView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { id } = params;

  const { tax: currentTax } = useGetTax(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit Tax"
        links={[
          { name: 'Dashboard', href: paths.admin_dashboard.root },
          {
            name: 'Taxes',
            href: paths.admin_dashboard.taxes.root,
          },
          { name: currentTax?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {currentTax ? <TaxesNewEditDetails currentTax={currentTax} /> : null}
    </Container>
  );
}
