// @mui
import Container from '@mui/material/Container';
// routes
import { useParams } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
// api
// components
import { useGetCategory } from 'src/api/categories';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import CategoriesNewEditDetails from '../categories-new-edit-details';
// import VoucherNewEditForm from '../categories-new-edit-form';
//

// ----------------------------------------------------------------------

export default function CategoriesEditView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { id } = params;

  const { category: currentCategory } = useGetCategory(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.admin_dashboard.root },
          {
            name: 'Categories',
            href: paths.admin_dashboard.categories.list,
          },
          { name: currentCategory?.partyName },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <CategoriesNewEditDetails currentCategory={currentCategory} />
    </Container>
  );
}
