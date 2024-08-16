import { useCallback, useEffect } from 'react';
// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
// redux
import { getCart } from 'src/redux/slices/checkout';
import { useDispatch } from 'src/redux/store';
// _mock
import { PRODUCT_CHECKOUT_STEPS } from 'src/_mock/_product';

// components
import { useSettingsContext } from 'src/components/settings';
//
import { useTheme } from '@mui/material';
import { useAuthContext } from 'src/auth/hooks';
import { useBoolean } from 'src/hooks/use-boolean';
import { useCheckout } from 'src/sections/hooks';
import { useUserRoles } from 'src/utils/constant';
import CheckoutBillingAddress from '../checkout-billing-address';
import CheckoutCart from '../checkout-cart';
import CheckoutOrderComplete from '../checkout-order-complete';
import CheckoutPayment from '../checkout-payment';
import CheckoutSteps from '../checkout-steps';

// ----------------------------------------------------------------------

function useInitial(cart) {
  const dispatch = useDispatch();

  const getCartCallback = useCallback(() => {
    if (cart.length) {
      dispatch(getCart(cart));
    }
  }, [cart, dispatch]);

  useEffect(() => {
    getCartCallback();
  }, [getCartCallback]);

  return null;
}

export default function CheckoutView() {
  const settings = useSettingsContext();
  const theme = useTheme();
  const paymentInProgress = useBoolean(false);

  const {
    checkout,
    completed,
    onResetAll,
    onGotoStep,
    onNextStep,
    onBackStep,
    onDeleteCart,
    onResetBilling,
    onResetAddress,
    onCreateBilling,
    onApplyDiscount,
    onApplyTax,
    onApplyShipping,
    onIncreaseQuantity,
    onDecreaseQuantity,
  } = useCheckout();

  const { cart, billing, activeStep } = checkout;

  useInitial(cart);

  const roles = useUserRoles();
  const { user } = useAuthContext();

  const isUserLoggedIn = Boolean(user);
  const isAdminLoggedIn = useBoolean(false);

  const userCheck = isAdminLoggedIn.value || !isUserLoggedIn;

  useEffect(() => {
    if (roles) {
      if (roles.some((role) => ['admin', 'influencer', 'brand'].includes(role))) {
        isAdminLoggedIn.onTrue();
      }
    }
  }, [roles, isAdminLoggedIn]);

  useEffect(() => {
    if (activeStep === 1) {
      onResetBilling();
    }
  }, [activeStep, onResetBilling]);

  return (
    <Container
      maxWidth={settings.themeStretch ? false : 'lg'}
      sx={{
        mb: 10,
        ...(paymentInProgress.value && {
          pointerEvents: 'none',
        }),
      }}
    >
      <Typography variant="h4" sx={{ my: { xs: 3, md: 5 } }}>
        Checkout
      </Typography>

      <Grid container justifyContent={completed ? 'center' : 'flex-start'}>
        <Grid xs={12} md={8}>
          <CheckoutSteps activeStep={activeStep} steps={PRODUCT_CHECKOUT_STEPS} />
        </Grid>
      </Grid>

      {paymentInProgress.value && (
        <div
          style={{
            position: 'fixed',
            left: '0px',
            top: '0px',
            width: '100%',
            height: '100%',
            zIndex: 9999,
            background: "url('/assets/Infinity.gif') 50% 50% no-repeat rgba(249,249,249,0.6)",
          }}
        />
      )}

      {completed ? (
        <CheckoutOrderComplete open={completed} onReset={onResetAll} onDownloadPDF={() => {}} />
      ) : (
        <>
          {activeStep === 0 && (
            <CheckoutCart
              userCheck={userCheck}
              checkout={checkout}
              onNextStep={onNextStep}
              onDeleteCart={onDeleteCart}
              onIncreaseQuantity={onIncreaseQuantity}
              onDecreaseQuantity={onDecreaseQuantity}
            />
          )}

          {activeStep === 1 && (
            <CheckoutBillingAddress
              userCheck={userCheck}
              checkout={checkout}
              onBackStep={onBackStep}
              onCreateBilling={onCreateBilling}
            />
          )}

          {activeStep === 2 && billing && (
            <CheckoutPayment
              userCheck={userCheck}
              checkout={checkout}
              onNextStep={onNextStep}
              onBackStep={onBackStep}
              onGotoStep={onGotoStep}
              onApplyShipping={onApplyShipping}
              onApplyTax={onApplyTax}
              onReset={onResetAll}
              onApplyDiscount={onApplyDiscount}
              onResetAddress={onResetAddress}
              paymentInProgress={paymentInProgress}
            />
          )}
        </>
      )}
    </Container>
  );
}
