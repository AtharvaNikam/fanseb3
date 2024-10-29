import sum from 'lodash/sum';
import PropTypes from 'prop-types';
// @mui
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
// routes
// components
import EmptyContent from 'src/components/empty-content';
import Iconify from 'src/components/iconify';
//
import { useRouter } from 'src/routes/hook';
import CheckoutCartProductList from './checkout-cart-product-list';
import CheckoutSummary from './checkout-summary';

// ----------------------------------------------------------------------

export default function CheckoutCart({
  userCheck,
  checkout,
  onNextStep,
  onDeleteCart,
  onApplyDiscount,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) {
  const { cart, total, discount, subTotal, discountedSubTotal } = checkout;

  console.log(checkout);

  const totalItems = sum(cart.map((item) => item.quantity));

  const empty = !cart.length;

  const router = useRouter();

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={8}>
        <Card sx={{ mb: 3 }}>
          <CardHeader
            title={
              <Typography variant="h6">
                Cart
                <Typography component="span" sx={{ color: 'text.secondary' }}>
                  &nbsp;({totalItems} item)
                </Typography>
              </Typography>
            }
            sx={{ mb: 3 }}
          />

          {!empty ? (
            <CheckoutCartProductList
              products={cart}
              onDelete={onDeleteCart}
              onIncreaseQuantity={onIncreaseQuantity}
              onDecreaseQuantity={onDecreaseQuantity}
            />
          ) : (
            <EmptyContent
              title="Cart is Empty!"
              description="Look like you have no items in your shopping cart."
              imgUrl="/assets/icons/empty/ic_cart.svg"
              sx={{ pt: 5, pb: 10 }}
            />
          )}
        </Card>

        <Button
          onClick={() => {
            router.back();
          }}
          color="inherit"
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
        >
          Continue Shopping
        </Button>
      </Grid>

      <Grid xs={12} md={4}>
        <CheckoutSummary
          total={total}
          discount={discount}
          subTotal={subTotal}
          discountedSubTotal={discountedSubTotal}
        />

        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={!cart.length}
          onClick={onNextStep}
        >
          {!userCheck ? `Check Out` : `Check Out as Guest`}
        </Button>
      </Grid>
    </Grid>
  );
}

CheckoutCart.propTypes = {
  userCheck: PropTypes.bool,
  checkout: PropTypes.object,
  onNextStep: PropTypes.func,
  onDeleteCart: PropTypes.func,
  onApplyDiscount: PropTypes.func,
  onDecreaseQuantity: PropTypes.func,
  onIncreaseQuantity: PropTypes.func,
};
