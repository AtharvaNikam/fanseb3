import { useCallback, useEffect, useRef, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useReactToPrint } from 'react-to-print';
// @mui
import Container from '@mui/material/Container';
// routes
// _mock
// components
import { useSettingsContext } from 'src/components/settings';
import { useParams } from 'src/routes/hook';
//
import { Box, Grid, Stack } from '@mui/material';
import { useGetOrderStatuses } from 'src/api/orderStatus';
import { useBoolean } from 'src/hooks/use-boolean';
import { paths } from 'src/routes/paths';
import axiosInstance from 'src/utils/axios';
import OrderDetailsHistory from '../order-details-history';
import OrderDetailsInfo from '../order-details-info';
import OrderDetailsItems from '../order-details-item';
import OrderDetailsToolbar from '../order-details-toolbar';

// ----------------------------------------------------------------------

export default function OrderDetailsView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { id_order } = params;

  const [currentOrder, setCurrentOrder] = useState(null);

  const isLoadingChangeStatus = useBoolean(false);

  const { orderStatuses } = useGetOrderStatuses();

  const [status, setStatus] = useState(currentOrder?.status);

  const handleChangeStatus = useCallback(
    async (newValue) => {
      isLoadingChangeStatus.onTrue();
      setStatus(newValue);
      const res = await axiosInstance.patch(`/orders/${id_order}`, {
        status: newValue,
      });
      console.log('🚀 ~ response after patch status:', res);
      await new Promise((resolve) => setTimeout(resolve, 500));
      isLoadingChangeStatus.onFalse();
    },
    [id_order, isLoadingChangeStatus]
  );

  useEffect(() => {
    setStatus(currentOrder?.status);
  }, [currentOrder?.status]);
  useEffect(() => {
    async function fetchCurrentOrder() {
      const res = await axiosInstance.get(`/orders/${id_order}`);
      const data = await res.data;
      setCurrentOrder(data);
    }

    fetchCurrentOrder();
  }, [id_order, status]);

  const ref = useRef();

  const handlePrint = useReactToPrint({
    documentTitle: `Order-${currentOrder?.trackingNumber}`,
    removeAfterPrint: true,
  });
  const handlePrintAction = useCallback(() => {
    handlePrint(null, () => ref.current);
  }, [handlePrint, ref]);

  const printView = (
    <Container ref={ref} maxWidth={settings.themeStretch ? false : 'lg'}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <OrderDetailsInfo
            customer={currentOrder?.user}
            delivery={currentOrder?.delivery}
            payment={currentOrder}
            shippingAddress={currentOrder}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          {/* <Stack spacing={3} direction={{ xs: 'column-reverse', md: 'column' }}> */}
          <OrderDetailsItems
            items={currentOrder?.products}
            taxes={currentOrder?.salesTax}
            shipping={currentOrder?.deliveryFee}
            discount={currentOrder?.discount}
            subTotal={currentOrder?.subTotal}
            totalAmount={currentOrder?.total}
          />

          {/* </Stack> */}
        </Grid>
      </Grid>
    </Container>
  );

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <OrderDetailsToolbar
          backLink={paths.admin_dashboard.orders.root}
          orderNumber={currentOrder?.trackingNumber}
          createdAt={currentOrder?.createdAt}
          status={status}
          onChangeStatus={handleChangeStatus}
          statusOptions={orderStatuses}
          isLoadingChangeStatus={isLoadingChangeStatus}
          handlePrintAction={handlePrintAction}
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Stack spacing={3} direction={{ xs: 'column-reverse', md: 'column' }}>
              <OrderDetailsItems
                items={currentOrder?.products}
                taxes={currentOrder?.salesTax}
                shipping={currentOrder?.deliveryFee}
                discount={currentOrder?.discount}
                subTotal={currentOrder?.subTotal}
                totalAmount={currentOrder?.total}
              />

              <OrderDetailsHistory status={currentOrder?.status} orderStatuses={orderStatuses} />
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <OrderDetailsInfo
              customer={currentOrder?.user}
              delivery={currentOrder?.delivery}
              payment={currentOrder}
              shippingAddress={currentOrder}
            />
          </Grid>
        </Grid>
      </Container>
      <Box
        style={{
          display: 'none',
        }}
      >
        {printView}
      </Box>
    </>
  );
}
