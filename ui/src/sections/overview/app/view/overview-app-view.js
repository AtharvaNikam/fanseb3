import { useEffect, useState } from 'react';
// @mui
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user';
// _mock
import { _appInvoices } from 'src/_mock';
// components
import { useSettingsContext } from 'src/components/settings';
// assets
//
import { useGetAdminSalesHistory, useGetOrders } from 'src/api/orders';
import AppAreaInstalled from '../app-area-installed';
import AppNewInvoice from '../app-new-invoice';
import AppWidgetSummary from '../app-widget-summary';

// ----------------------------------------------------------------------

export default function OverviewAppView() {
  const { user } = useMockedUser();
  const { salesData } = useGetAdminSalesHistory();
  const [recentOrders, setRecentOrders] = useState([]);
  const theme = useTheme();

  const {orders, refreshOrder} = useGetOrders();

  useEffect(() => {
    if (orders) {
      setRecentOrders(orders?.slice(0, 5)); // Get the last 5 orders
    }
  }, [orders]);


  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3}>
        {/* <Grid xs={12} md={8}>
          <AppWelcome
            title={`Welcome back 👋 \n ${user?.displayName}`}
            description="If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything."
            img={<SeoIllustration />}
            action={
              <Button variant="contained" color="primary">
                Go Now
              </Button>
            }
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppFeatured list={_appFeatured} />
        </Grid> */}

        <Grid xs={12} md={3}>
          <AppWidgetSummary
            title="Total Revenue"
            percent={2.6}
            total={salesData?.totalRevenue}
            // chart={{
            //   series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
            // }}
          />
        </Grid>

        <Grid xs={12} md={3}>
          <AppWidgetSummary
            title="Total Order"
            percent={0.2}
            total={salesData?.totalOrders}
            // chart={{
            //   colors: [theme.palette.info.light, theme.palette.info.main],
            //   series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
            // }}
          />
        </Grid>

        <Grid xs={12} md={3}>
          <AppWidgetSummary
            title="Todays Revenue"
            percent={-0.1}
            total={salesData?.todaysTotalRevenue}
            // chart={{
            //   colors: [theme.palette.warning.light, theme.palette.warning.main],
            //   series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
            // }}
          />
        </Grid>

        <Grid xs={12} md={3}>
          <AppWidgetSummary
            title="Total Brands"
            percent={-0.1}
            total={salesData?.totalBrands}
            // chart={{
            //   colors: [theme.palette.warning.light, theme.palette.warning.main],
            //   series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
            // }}
          />
        </Grid>
        {/* 
        <Grid xs={12} md={6} lg={4}>
          <AppCurrentDownload
            title="Current Download"
            chart={{
              series: [
                { label: 'Mac', value: 12244 },
                { label: 'Window', value: 53345 },
                { label: 'iOS', value: 44313 },
                { label: 'Android', value: 78343 },
              ],
            }}
          />
        </Grid> */}

        <Grid xs={12} md={12} lg={12}>
          {salesData.chart ? (<AppAreaInstalled
            title="Sale History"
            // subheader="(+43%) than last year"
            chart={salesData.chart}
          />):null}
          
        </Grid>

        <Grid xs={12} lg={6}>
          <AppNewInvoice
            title="Recent Orders"
            tableData={recentOrders}
            tableLabels={[
              { id: 'id', label: 'Tracking Number' },
              { id: 'total', label: 'Total' },
              { id: 'date', label: 'Order Date' },
              { id: 'status', label: 'Status' },
              { id: '' },
            ]}
          />
        </Grid>
        <Grid xs={12} lg={6}>
          <AppNewInvoice
            title="Recent Withdrawals"
            tableData={_appInvoices}
            tableLabels={[
              { id: 'id', label: 'Brand Name' },
              { id: 'category', label: 'Amount' },
              { id: 'status', label: 'Status' },
              { id: 'price', label: 'Created' },
              { id: '', label: 'Actions' },
            ]}
          />
        </Grid>
        {/* <Grid xs={12} lg={12}>
          <AppNewInvoice
            title="Popular Products"
            tableData={_appInvoices}
            tableLabels={[
              { id: 'id', label: 'ID' },
              { id: 'id', label: 'Name' },
              { id: 'category', label: 'Brand' },
              { id: 'status', label: 'Price/Unit' },
              { id: 'price', label: 'Quantity' },
            ]}
          />
        </Grid> */}
      </Grid>
    </Container>
  );
}
