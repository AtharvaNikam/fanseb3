import PropTypes from 'prop-types';
// @mui
import { Box, Button, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import { useResponsive } from 'src/hooks/use-responsive';
import { addToCart, decreaseQuantity, increaseQuantity } from 'src/redux/slices/checkout';
import IncrementerButton from 'src/sections/common/incrementer-button';
import { useCheckout } from 'src/sections/hooks';
// theme
// utils
// theme

// ----------------------------------------------------------------------

export default function ProductList({ product, handleViewProductDetails }) {
  const [displayProduct, setDisplayProduct] = useState(product);

  const mdUp = useResponsive('up', 'md');

  const params = useParams();
  const currentInfluencerId = params?.influencerId;

  const dispatch = useDispatch();
  const { checkout } = useCheckout();
  const [wishlistItem, setWishlistItem] = useState([]);

  const handleAddToWishlist = useCallback(() => {
    console.log('Add to wishlist');
    setWishlistItem((prev) => [...prev, displayProduct]);
  }, [displayProduct]);

  const handleAddCart = useCallback(() => {
    const newProduct = {
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
      // quantity: existingProduct?.quantity || 1,
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

      // Make sure to add a condition to prevent an infinite loop
      if (displayProduct.cartQuantity !== updatedProductData.cartQuantity) {
        setDisplayProduct(updatedProductData);
      }
    }
  }, [checkout, displayProduct]);

  return (
    <>
      <Box onClick={handleViewProductDetails}>
        <Label
          style={{
            // background: 'linear-gradient(90deg, #0171ED 0%, #D001FF 100%)',
            background: 'none',
            position: 'absolute',
            // ...(!mdUp && {
            //   position: 'relative',
            //   top: '20px',
            // }),
            // borderRadius: '8px 0px',/
            height: '15px',
            marginTop: '10px',
            padding: '10px',
            // marginLeft: '0px',
            cursor: 'pointer',
          }}
          onClick={handleAddToWishlist}
        >
          {/* <Typography
            variant="body2"
            style={{
              color: '#FFF',
              fontFamily: 'Rubik',
              fontSize: '10px',
            }}
          >
            New
          </Typography> */}
          <Iconify icon="mdi:heart" width={24} color={wishlistItem ? '#ff5d6d' : '#787878'} />
        </Label>
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
          fontStyle: 'normal',
          fontWeight: '600',
          lineHeight: 'normal',
          margin: '0px 25px',
          cursor: 'pointer',
        }}
      >
        {displayProduct?.name}
      </Typography>
      {displayProduct?.cartQuantity > 0 ? (
        <IncrementerButton
          style={{
            width: '100%',
            fontSize: '12px',
            color: 'white',
            fontWeight: '600',
            fontStyle: 'normal',
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
          sx={{
            p: 1,
          }}
          style={{
            width: '100%',
            // fontFamily: 'Dosis',
            fontSize: '12px',
            color: 'white',
            fontWeight: '600',
            fontStyle: 'normal',
            background: '#232321',
            borderRadius: '8.517px',
          }}
          onClick={handleAddCart}
        >
          ADD TO CART - ₹
          <span
            style={{
              color: '#D001FF',
              // fontFamily: 'Dosis',
              fontSize: '12px',
              fontStyle: 'normal',
              fontWeight: '600',
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
