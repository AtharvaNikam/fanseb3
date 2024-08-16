import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// utils
import { fCurrency } from 'src/utils/format-number';
// components
import { InputAdornment, TextField } from '@mui/material';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function CheckoutSummary({
  total,
  onEdit,
  discount,
  subTotal,
  discountedSubTotal,
  taxAmount,
  taxRate,
  shipping,
  onApplyDiscount,
  enableEdit = false,
  enableDiscount,
}) {
  const displayShipping = shipping !== null ? 'Free' : '-';
  const totalSavings = subTotal - discountedSubTotal + discount;
  const handleApplyDiscount = () => {
    console.log('Apply discount');
    onApplyDiscount(50);
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Order Summary"
        action={
          enableEdit && (
            <Button size="small" onClick={onEdit} startIcon={<Iconify icon="solar:pen-bold" />}>
              Edit
            </Button>
          )
        }
      />

      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Sub Total
            </Typography>
            <Typography
              variant="subtitle2"
              color="error.main"
              sx={{
                textDecoration: 'line-through',
              }}
            >
              ₹{fCurrency(subTotal)}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Discount on Sub Total
            </Typography>
            <Typography variant="subtitle2" color="success.main">
              ₹{fCurrency(discountedSubTotal)}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Discount
            </Typography>
            <Typography variant="subtitle2" color="success.main">
              {discount ? `-₹${fCurrency(discount)}` : '-'}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            {displayShipping ? (
              <>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Shipping
                </Typography>
                {shipping ? (
                  <Typography variant="subtitle2">₹{fCurrency(shipping)}</Typography>
                ) : (
                  <Typography variant="subtitle2" color="success.main">
                    {displayShipping}
                  </Typography>
                )}
              </>
            ) : null}
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            {displayShipping ? (
              <>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Platform Fee
                </Typography>

                <Typography variant="subtitle2" color="success.main">
                  Free
                </Typography>
              </>
            ) : null}
          </Stack>

          {/* <Stack direction="row" justifyContent="space-between">
            {taxAmount ? (
              <>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Tax ({taxRate}%)
                </Typography>
                <Typography variant="subtitle2">₹{fCurrency(taxAmount)}</Typography>
              </>
            ) : null}
          </Stack> */}

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1">Total Savings</Typography>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="subtitle1" color="success" sx={{ color: 'success.main' }}>
                ₹{fCurrency(totalSavings)}
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1">Total</Typography>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="subtitle1" sx={{ color: 'primary' }}>
                ₹{fCurrency(total)}
              </Typography>
              {!enableDiscount && (
                <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                  (Please note that shipping fees and discount will be applied during payment.)
                </Typography>
              )}
            </Box>
          </Stack>

          {enableDiscount && onApplyDiscount && (
            <TextField
              fullWidth
              name="discount"
              placeholder="Discount codes / Gifts"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button color="primary" onClick={handleApplyDiscount} sx={{ mr: -0.5 }}>
                      Apply
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

CheckoutSummary.propTypes = {
  discount: PropTypes.number,
  enableDiscount: PropTypes.bool,
  enableEdit: PropTypes.bool,
  onApplyDiscount: PropTypes.func,
  onEdit: PropTypes.func,
  shipping: PropTypes.number,
  taxAmount: PropTypes.number,
  taxRate: PropTypes.number,
  subTotal: PropTypes.number,
  discountedSubTotal: PropTypes.number,
  total: PropTypes.number,
};
