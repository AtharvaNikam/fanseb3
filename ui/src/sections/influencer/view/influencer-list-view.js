// @mui
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
// _mock
// components

import Button from '@mui/material/Button';
import { useGetBrands } from 'src/api/brands';
import { useAuthContext } from 'src/auth/hooks';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import { RouterLink } from 'src/routes/components';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import BrandsSummary from '../influencer-summary';
//

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function InfluencerListView() {
  const settings = useSettingsContext();
  const { user } = useAuthContext();
  const { brands } = useGetBrands(user.id);
  const router = useRouter();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="My Brands"
        links={[
          {
            name: 'Influencers',
            href: paths.brand_dashboard.brands.root,
          },
          {
            name: 'list',
          },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.brand_dashboard.brands.new}
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Add a Brand
          </Button>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Grid container spacing={3}>
        {brands.map((brand) => (
          <Grid xs={12} sm={6} md={3} key={brand.name}>
            <BrandsSummary
              title={brand.name}
              isActive={brand.isActive}
              color="primary"
              icon={<img alt="icon" src={`${brand.profileImg}`} style={{ borderRadius: 100 }} />}
              onClick={(e) => {
                e.preventDefault();
                if (
                  router &&
                  paths &&
                  paths.brand_dashboard &&
                  paths.brand_dashboard.brands &&
                  paths.brand_dashboard.brands.details &&
                  brand &&
                  brand.id
                ) {
                  router.push(paths.brand_dashboard.brands.dashboard(brand.id));
                } else {
                  console.error('One or more required objects are undefined');
                }
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

// ----------------------------------------------------------------------
