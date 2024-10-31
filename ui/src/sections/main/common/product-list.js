import PropTypes from 'prop-types';
// @mui
import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import IncrementerButton from 'src/sections/common/incrementer-button';
import { addToCart, decreaseQuantity, increaseQuantity } from 'src/redux/slices/checkout';
import { useCheckout } from 'src/sections/hooks';

export default function ProductList({ product, influencerId, handleViewProductDetails }) {
  const [displayProduct, setDisplayProduct] = useState(product);
  const dispatch = useDispatch();
  const { checkout } = useCheckout();
  const [wishlistItem, setWishlistItem] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Check if view is mobile
  console.log('mobile view',isMobile);
  const params = useParams();
  const currentInfluencerId = params?.influencerId;

  console.log(currentInfluencerId);
  console.log(product);

  const handleAddToWishlist = useCallback(() => {
    setWishlistItem((prev) => [...prev, displayProduct]);
  }, [displayProduct]);

  const handleAddCart = useCallback(() => {
    const newProduct = {
      id: displayProduct.id,
      influencerId: influencerId,
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
      quantity: 1,
    };
    try {
      dispatch(addToCart(newProduct));
    } catch (error) {
      console.error(error);
    }
  }, [dispatch, displayProduct, currentInfluencerId]);

  const onIncreaseQuantity = useCallback(
    (productId) => {
      dispatch(increaseQuantity(productId));
    },
    [dispatch]
  );

  const onDecreaseQuantity = useCallback(
    (productId) => {
      dispatch(decreaseQuantity(productId));
    },
    [dispatch]
  );

  useEffect(() => {
    if (checkout.cart && displayProduct) {
      const findProduct = checkout.cart.find((obj) => obj.id === displayProduct.id);
      let updatedProductData;
      if (findProduct) {
        updatedProductData = {
          ...displayProduct,
          cartQuantity: findProduct.quantity,
        };
      } else {
        updatedProductData = {
          ...displayProduct,
          cartQuantity: 0,
        };
      }

      if (displayProduct.cartQuantity !== updatedProductData.cartQuantity) {
        setDisplayProduct(updatedProductData);
      }
    }
  }, [checkout, displayProduct]);

  if (isMobile) {
    return (
      <Grid
        container
        spacing={2}
        sx={{
          width: '100%',
          maxHeight: '200px',
          marginLeft: '0%',
          height: '200px',
          background: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '20px',
          overflow: 'visible',
          color: '#fff',
          zIndex: 10000,
          paddingLeft: '0px !important'
        }}
      >
        <Grid item md={6} sx={{ paddingLeft: '10px !important' }}>
          <Box onClick={handleViewProductDetails}>
            <img
              alt="product_image"
              src={displayProduct?.image?.fileUrl}
              style={{
                width: '100px',
                height: '100px',
                marginTop: '40px',
                objectFit: 'cover',
                borderRadius: '10px',
              }}
            />
          </Box>
        </Grid>
        <Grid item md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography
            style={{
              fontFamily: 'Rubik',
              fontSize: '14px',
              fontWeight: '600',
              textAlign: 'center',
              margin: '5px 0',
              whiteSpace: 'normal',
              overflowWrap: 'break-word',
            }}
          >
            {displayProduct?.name}
          </Typography>
          {displayProduct?.cartQuantity > 0 ? (
            <IncrementerButton
              sx={{
                width: '100%',
                fontSize: '12px',
                color: 'white',
                background: '#232321',
                borderRadius: '8.517px',
                marginTop: '10px',
              }}
              quantity={displayProduct?.cartQuantity}
              onDecrease={() => onDecreaseQuantity(displayProduct?.id)}
              onIncrease={() => onIncreaseQuantity(displayProduct?.id)}
              disabledDecrease={displayProduct?.cartQuantity <= 0}
              disabledIncrease={displayProduct?.cartQuantity >= displayProduct?.quantity}
            />
          ) : (
            <Button
              variant="contained"
              size="small"
              style={{
                background: '#232321',
                color: '#fff',
                borderRadius: '8.517px',
                fontSize: '12px',
                marginTop: '10px',
                display: 'block',
                width: '100%',
              }}
              onClick={handleAddCart}
            >
              ADD TO CART - ₹
              <span
                style={{
                  color: '#D001FF',
                  fontSize: '12px',
                  marginLeft: '3px',
                  textTransform: 'uppercase',
                }}
              >
                {displayProduct?.sale_price}
              </span>
            </Button>
          )}
        </Grid>
      </Grid>
    );
  }

  return (
    <>
      <Box onClick={handleViewProductDetails}>
        {/* <Label
          sx={{
            background: 'none',
            position: 'absolute',
            height: '15px',
            marginTop: '10px',
            padding: '10px',
            cursor: 'pointer',
          }}
          onClick={handleAddToWishlist}
        >
          <Iconify icon="mdi:heart" width={24} color={wishlistItem ? '#ff5d6d' : '#787878'} />
        </Label> */}
        <img
          alt="product_image"
          src={displayProduct?.image?.fileUrl}
          style={{
            borderRadius: 20,
            objectFit: 'cover',
            width: '240px',
            height: '285px',
            cursor: 'pointer',
          }}
        />
      </Box>
      <Typography
        onClick={handleViewProductDetails}
        style={{
          textAlign: 'center',
          fontFamily: 'Rubik',
          fontSize: '20px',
          fontWeight: '600',
          margin: '0px 25px',
          cursor: 'pointer',
        }}
      >
        {displayProduct?.name}
      </Typography>
      {displayProduct?.cartQuantity > 0 ? (
        <IncrementerButton
          sx={{
            width: '100%',
            fontSize: '12px',
            color: 'white',
            background: '#232321',
            borderRadius: '8.517px',
          }}
          quantity={displayProduct?.cartQuantity}
          onDecrease={() => {
            onDecreaseQuantity(displayProduct?.id);
          }}
          onIncrease={() => {
            onIncreaseQuantity(displayProduct?.id);
          }}
          disabledDecrease={displayProduct?.cartQuantity <= 0}
          disabledIncrease={displayProduct?.cartQuantity >= displayProduct?.quantity}
        />
      ) : (
        <Button
          variant="contained"
          size="medium"
          style={{
            width: '100%',
            fontSize: '12px',
            color: 'white',
            background: '#232321',
            borderRadius: '8.517px',
          }}
          onClick={handleAddCart}
        >
          ADD TO CART - ₹
          <span
            style={{
              color: '#D001FF',
              fontSize: '12px',
              marginLeft: '3px',
              textTransform: 'uppercase',
            }}
          >
            {displayProduct?.sale_price}
          </span>
        </Button>
      )}
    </>
  );
}

ProductList.propTypes = {
  product: PropTypes.object,
  handleViewProductDetails: PropTypes.func,
};
