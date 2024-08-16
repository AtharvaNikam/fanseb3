import { useCallback, useEffect, useState } from 'react';
// @mui
import Container from '@mui/material/Container';
// routes
// _mock
// components
import { useSettingsContext } from 'src/components/settings';
import { useParams } from 'src/routes/hook';
//
import { Grid, Stack } from '@mui/material';
import { useBoolean } from 'src/hooks/use-boolean';
import { paths } from 'src/routes/paths';
import axiosInstance from 'src/utils/axios';
import RefundsDetailsInfo from '../refunds-details-info';
import RefundsDetailsItems from '../refunds-details-item';
import RefundsDetailsToolbar from '../refunds-details-toolbar';

// ----------------------------------------------------------------------
const refundStatuses = [
  { value: 'approved', label: 'Approved' },
  { value: 'onHold', label: 'On Hold' },
  { value: 'processing', label: 'Processing' },
  { value: 'pending', label: 'Pending' },
  { value: 'rejected', label: 'Rejected' },
];

export default function RefundsDetailsView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { id } = params;

  const [currentRefund, setCurrentRefund] = useState(null);
  console.log('🚀 ~ currentRefund:', currentRefund);

  const isLoadingChangeStatus = useBoolean(false);

  // const { refundStatuses } = useGetrefundStatuses();

  const [status, setStatus] = useState(currentRefund?.status);

  const handleChangeStatus = useCallback(
    async (newValue) => {
      isLoadingChangeStatus.onTrue();
      setStatus(newValue);
      const res = await axiosInstance.patch(`/refunds/${id}`, {
        status: newValue,
      });
      await new Promise((resolve) => setTimeout(resolve, 500));
      isLoadingChangeStatus.onFalse();
    },
    [id, isLoadingChangeStatus]
  );

  useEffect(() => {
    setStatus(currentRefund?.status);
  }, [currentRefund]);
  useEffect(() => {
    async function fetchcurrentRefund() {
      const res = await axiosInstance.get(`/refunds/${id}`);
      const data = await res.data;
      setCurrentRefund(data);
    }

    fetchcurrentRefund();
  }, [id, status]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <RefundsDetailsToolbar
        backLink={paths.brand_dashboard.brands.refunds(id).root}
        orderNumber={currentRefund?.orders?.trackingNumber}
        createdAt={currentRefund?.createdAt}
        status={status}
        onChangeStatus={handleChangeStatus}
        statusOptions={refundStatuses}
        isLoadingChangeStatus={isLoadingChangeStatus}
      />

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Stack spacing={3} direction={{ xs: 'column-reverse', md: 'column' }}>
            <RefundsDetailsItems
              items={currentRefund?.orders?.products}
              taxes={currentRefund?.orders?.salesTax}
              shipping={currentRefund?.orders?.deliveryFee}
              discount={currentRefund?.orders?.discount}
              subTotal={currentRefund?.orders?.subTotal}
              totalAmount={currentRefund?.orders?.total}
            />

            {/* <OrderDetailsHistory status={currentRefund?.status} refundStatuses={refundStatuses} /> */}
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          <RefundsDetailsInfo
            customer={currentRefund?.user}
            delivery={currentRefund?.orders?.delivery}
            payment={currentRefund?.orders}
            shippingAddress={currentRefund?.orders}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
