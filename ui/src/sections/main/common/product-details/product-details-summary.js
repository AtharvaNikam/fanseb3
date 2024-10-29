import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// routes
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
// utils
import { fCurrency, fShortenNumber } from 'src/utils/format-number';
// components
import { useDispatch } from 'react-redux';
import FormProvider from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import IncrementerButton from 'src/sections/common/incrementer-button';
import { useParams } from 'react-router';
//

// ----------------------------------------------------------------------

export default function ProductDetailsSummary({
  cart,
  product,
  onAddCart,
  onGotoStep,
  disabledActions,
  ...other
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [displayProduct, setDisplayProduct] = useState(product);

  const params = useParams();
  const currentInfluencerId = params?.influencerId;

  const existProduct = cart.map((item) => item.id).includes(displayProduct.id);
  const existingProduct = cart.filter((item) => item.id === displayProduct.id)[0];

  const isMaxQuantity =
    cart.filter((item) => item.id === displayProduct.id).map((item) => item.quantity)[0] >=
    displayProduct.inventoryQuantity;

  const defaultValues = {
    id: displayProduct.id,
    influencerId: currentInfluencerId,
    brandId: displayProduct.brandId,
    name: displayProduct.name,
    description: displayProduct.description,
    inStock: displayProduct.inStock,
    isTaxable: displayProduct.isTaxable,
    status: displayProduct.status,
    productType: displayProduct.productType,
    unit: displayProduct.unit,
    height: displayProduct.height,
    width: displayProduct.width,
    length: displayProduct.length,
    image: { fileUrl: displayProduct.image.fileUrl },
    price: displayProduct.price,
    sale_price: displayProduct.sale_price,
    min_price: displayProduct.min_price,
    max_price: displayProduct.max_price,
    sku: displayProduct.sku,
    inventoryQuantity: displayProduct.quantity,
    quantity: existingProduct?.quantity || 1,
  };

  const methods = useForm({
    defaultValues,
  });

  const { reset, watch, control, setValue, handleSubmit } = methods;

  const values = watch();

  useEffect(() => {
    if (product) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!existProduct) {
        onAddCart({
          ...data,
          subTotal: data.sale_price * data.quantity,
        });
      }
      onGotoStep(0);
      router.push(paths.checkout);
    } catch (error) {
      console.error(error);
    }
  });

  const handleAddCart = useCallback(() => {
    try {
      onAddCart({
        ...values,
        subTotal: values.sale_price * values.quantity,
      });
    } catch (error) {
      console.error(error);
    }
  }, [onAddCart, values]);

  // ----------------------------------------------------------------------

  const renderPrice = (
    <Box sx={{ typography: 'h5' }}>
      {displayProduct.price && (
        <Box
          component="span"
          sx={{ color: 'text.disabled', textDecoration: 'line-through', mr: 0.5 }}
        >
          {fCurrency(displayProduct.price)}
        </Box>
      )}

      {fCurrency(displayProduct.sale_price)}
    </Box>
  );

  const renderShare = (
    <Stack direction="row" spacing={3} justifyContent="center">
      <Link
        variant="subtitle2"
        sx={{ color: 'text.secondary', display: 'inline-flex', alignItems: 'center' }}
      >
        <Iconify icon="solar:heart-bold" width={16} sx={{ mr: 1 }} />
        Favorite
      </Link>
    </Stack>
  );

  const renderQuantity = (
    <Stack direction="row">
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        Quantity
      </Typography>

      <Stack spacing={1}>
        <IncrementerButton
          name="quantity"
          quantity={values.quantity}
          disabledDecrease={values.quantity <= 1}
          disabledIncrease={values.quantity >= values.inventoryQuantity}
          onIncrease={() => setValue('quantity', values.quantity + 1)}
          onDecrease={() => setValue('quantity', values.quantity - 1)}
        />

        <Typography variant="caption" component="div" sx={{ textAlign: 'right' }}>
          Available: {values.inventoryQuantity}
        </Typography>
      </Stack>
    </Stack>
  );

  const renderActions = (
    <Stack direction="row" spacing={2}>
      <Button
        fullWidth
        disabled={isMaxQuantity || disabledActions}
        size="large"
        color="warning"
        variant="contained"
        startIcon={<Iconify icon="solar:cart-plus-bold" width={24} />}
        onClick={handleAddCart}
        sx={{ whiteSpace: 'nowrap' }}
      >
        Add to Cart
      </Button>

      <Button fullWidth size="large" type="submit" variant="contained" disabled={disabledActions}>
        Buy Now
      </Button>
    </Stack>
  );

  const renderSubDescription = (
    <Typography
      variant="body2"
      sx={{
        color: 'text.secondary',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: '2',
        WebkitBoxOrient: 'vertical',
      }}
    >
      {displayProduct.description}
    </Typography>
  );

  const renderRating = (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        color: 'text.disabled',
        typography: 'body2',
      }}
    >
      <Rating
        size="small"
        value={displayProduct.totalRatings}
        precision={0.1}
        readOnly
        sx={{ mr: 1 }}
      />
      {`(${fShortenNumber(displayProduct.totalReviews)} reviews)`}
    </Stack>
  );

  const renderLabels = displayProduct.inStock && (
    <Stack direction="row" alignItems="center" spacing={1}>
      {displayProduct.inStock === true && <Label color="info">Stock</Label>}
      {displayProduct.inStock === false && <Label color="error">Out of Stock</Label>}
    </Stack>
  );

  const renderInventoryType = (
    <Box
      component="span"
      sx={{
        typography: 'overline',
        color:
          (displayProduct.inventoryType === 'out of stock' && 'error.main') ||
          (displayProduct.inventoryType === 'low stock' && 'warning.main') ||
          'success.main',
      }}
    >
      {displayProduct.inventoryType}
    </Box>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3} sx={{ pt: 3 }} {...other}>
        <Stack spacing={2} alignItems="flex-start">
          {renderLabels}

          {renderInventoryType}

          <Typography variant="h5">{displayProduct.name}</Typography>

          {renderRating}

          {renderPrice}

          {renderSubDescription}
        </Stack>

        {/* <Divider sx={{ borderStyle: 'dashed' }} /> */}

        {renderQuantity}

        <Divider sx={{ borderStyle: 'dashed' }} />

        {renderActions}

        {renderShare}
      </Stack>
    </FormProvider>
  );
}

ProductDetailsSummary.propTypes = {
  cart: PropTypes.array,
  disabledActions: PropTypes.bool,
  onAddCart: PropTypes.func,
  onGotoStep: PropTypes.func,
  product: PropTypes.object,
};
