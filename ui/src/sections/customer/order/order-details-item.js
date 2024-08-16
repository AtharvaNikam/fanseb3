import PropTypes from 'prop-types';
// @mui
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
// utils
import { fCurrency } from 'src/utils/format-number';
// components
import { Button } from '@mui/material';
import { useState } from 'react';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useBoolean } from 'src/hooks/use-boolean';
import ProductReviewNewForm from 'src/sections/common/product-review/product-review-new-form';

// ----------------------------------------------------------------------

export default function OrderDetailsItems({
  items,
  shipping,
  discount,
  taxes,
  subTotal,
  totalAmount,
}) {
  console.log('🚀 ~ items:', items);
  const review = useBoolean();
  const refund = useBoolean();
  const [productId, setProductId] = useState(null);
  const [brandId, setBrandId] = useState(null);
  const handleWriteReview = (item) => {
    setProductId(item.id);
    setBrandId(item.brandId);
    review.onTrue();
  };
  const renderTotal = (
    <Stack
      spacing={2}
      alignItems="flex-end"
      sx={{ my: 3, textAlign: 'right', typography: 'body2' }}
    >
      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Subtotal</Box>
        <Box sx={{ width: 160, typography: 'subtitle2' }}>
          {subTotal ? ` ₹${fCurrency(subTotal)}` : '-'}
        </Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Shipping</Box>
        <Box
          sx={{
            width: 160,
            ...(shipping && { color: 'error.main' }),
          }}
        >
          {shipping ? `  ₹${fCurrency(shipping)}` : '-'}
        </Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Discount</Box>
        <Box
          sx={{
            width: 160,
            ...(discount && { color: 'error.main' }),
          }}
        >
          {discount ? `₹${fCurrency(discount)}` : '-'}
        </Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Taxes</Box>
        <Box sx={{ width: 160 }}>{taxes ? `₹${fCurrency(taxes)}` : '-'}</Box>
      </Stack>

      <Stack direction="row" sx={{ typography: 'subtitle1' }}>
        <Box>Total</Box>
        <Box sx={{ width: 160 }}>₹{fCurrency(totalAmount) || '-'}</Box>
      </Stack>
    </Stack>
  );

  return (
    <Card>
      <CardHeader title="Details" />

      <Stack
        sx={{
          px: 3,
        }}
      >
        <Scrollbar>
          {items?.map((item) => (
            <Stack
              key={item.id}
              direction="row"
              alignItems="center"
              sx={{
                py: 3,
                minWidth: 640,
                borderBottom: (theme) => `dashed 2px ${theme.palette.background.neutral}`,
              }}
            >
              <Avatar
                src={item?.image?.fileUrl}
                variant="rounded"
                sx={{ width: 48, height: 48, mr: 2 }}
              />

              <ListItemText
                primary={item.name}
                secondary={item.sku}
                primaryTypographyProps={{
                  typography: 'body2',
                }}
                secondaryTypographyProps={{
                  component: 'span',
                  color: 'text.disabled',
                  mt: 0.5,
                }}
              />

              <Box sx={{ typography: 'body2' }}>
                <Button
                  size="small"
                  variant="soft"
                  color="inherit"
                  onClick={() => handleWriteReview(item)}
                  sx={{
                    ml: 2,
                    mr: 4,
                    color: 'danger',
                    borderRadius: 1,
                    fontWeight: 600,
                  }}
                  startIcon={<Iconify icon="solar:pen-bold" />}
                >
                  Write your review
                </Button>
              </Box>
              <Box sx={{ typography: 'body2' }}>x{item.quantity}</Box>

              <Box sx={{ width: 110, textAlign: 'right', typography: 'subtitle2' }}>
                ₹{fCurrency(item.sale_price)}
              </Box>
            </Stack>
          ))}
        </Scrollbar>

        {renderTotal}
      </Stack>
      <ProductReviewNewForm
        productId={productId}
        brandId={brandId}
        open={review.value}
        onClose={review.onFalse}
      />
    </Card>
  );
}

OrderDetailsItems.propTypes = {
  discount: PropTypes.number,
  items: PropTypes.array,
  shipping: PropTypes.number,
  subTotal: PropTypes.number,
  taxes: PropTypes.number,
  totalAmount: PropTypes.number,
};
