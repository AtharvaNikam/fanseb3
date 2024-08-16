// @mui
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
// _mock
// components

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useGetBrands } from 'src/api/brands';
import { useAuthContext } from 'src/auth/hooks';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { ConfirmDialog } from 'src/components/custom-dialog';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import { useBoolean } from 'src/hooks/use-boolean';
import { RouterLink } from 'src/routes/components';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import axiosInstance from 'src/utils/axios';
import BrandsInitial from '../brand-initial';
import BrandsSummary from '../brand-summary';
//

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function BrandsListView() {
  const settings = useSettingsContext();
  const collapse = useBoolean();
  const confirm = useBoolean();
  const router = useRouter();

  const { user } = useAuthContext();

  const [brandId, setBrandId] = useState();

  console.log('🚀 ~ id:', user);
  const [commissionRate, setCommissionRate] = useState(0);

  const { brands, refreshBrands } = useGetBrands(user.id);
  const handleActivateBrand = async () => {
    const inputData = {
      isActive: true,
    };
    await axiosInstance.patch(`/api/brands/${brandId}`, inputData);
    refreshBrands();
  };
  const handleUpdateCommissionRate = async () => {
    const inputData = {
      adminCommissionRate: Number(commissionRate),
    };
    await axiosInstance.patch(`/api/brands/updateAdminCommision/${brandId}`, inputData);
    collapse.onFalse();
    refreshBrands();
    handleActivateBrand();
  };
  const handleInactivateBrand = async () => {
    const inputData = {
      isActive: false,
    };
    await axiosInstance.patch(`/api/brands/${brandId}`, inputData);

    refreshBrands();
  };
  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="My Brands"
          links={[
            {
              name: 'Brand',
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
          {brands?.length > 0 ? (
            brands.map((brand) => (
              <Grid xs={12} sm={6} md={3} key={brand.id}>
                <BrandsSummary
                  title={brand.name}
                  isActive={brand.isActive}
                  color="primary"
                  icon={
                    <img alt="icon" src={`${brand.profileImg}`} style={{ borderRadius: 100 }} />
                  }
                  onActive={() => {
                    setBrandId(brand.id);
                    collapse.onTrue();
                  }}
                  onInActive={() => {
                    setBrandId(brand.id);
                    confirm.onTrue();
                  }}
                  onView={() => {
                    if (
                      router &&
                      paths &&
                      paths.admin_dashboard &&
                      paths.admin_dashboard.brands &&
                      paths.admin_dashboard.brands.dashboard &&
                      brand &&
                      brand.id
                    ) {
                      localStorage.setItem('brandId', brand.id);

                      router.push(paths.admin_dashboard.brands.dashboard(brand.id));
                    } else {
                      console.error('One or more required objects are undefined');
                    }
                  }}
                />
              </Grid>
            ))
          ) : (
            <BrandsInitial />
          )}
        </Grid>
      </Container>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Inactive Brand"
        content="Are you sure, you want to Inactive this brand?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleInactivateBrand();
              confirm.onFalse();
            }}
          >
            Inactive
          </Button>
        }
      />

      <Dialog open={collapse.value} onClose={collapse.onFalse}>
        <DialogTitle>Commission Rate</DialogTitle>

        <DialogContent>
          <Typography sx={{ mb: 3 }}>Add the commission rate for the brand</Typography>

          <TextField
            autoFocus
            fullWidth
            name="commissionRate"
            type="number"
            margin="dense"
            variant="outlined"
            label="Commission Rate"
            sx={{
              alignItems: 'center',
            }}
            onChange={(e) => {
              setCommissionRate(e.target.value);
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={collapse.onFalse} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleUpdateCommissionRate();
            }}
            variant="contained"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

// ----------------------------------------------------------------------
