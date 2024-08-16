// @mui
import Container from '@mui/material/Container';
// routes
import { useParams } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
// api
// components
import { useGetReel } from 'src/api/reels';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import ReelsNewEditDetails from '../reels-new-edit-details';
// import VoucherNewEditForm from '../categories-new-edit-form';
//

// ----------------------------------------------------------------------

export default function ReelsEditView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { id } = params;

  const { reels: currentReel } = useGetReel(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit Reel"
        links={[
          { name: 'Dashboard', href: paths.influencer_dashboard.reels.root },
          {
            name: 'Reels',
            href: paths.influencer_dashboard.reels.list,
          },
          { name: currentReel?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ReelsNewEditDetails currentReel={currentReel} />
    </Container>
  );
}
