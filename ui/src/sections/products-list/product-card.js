import PropTypes from 'prop-types';
import { Box, Button, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import IncrementerButton from 'src/sections/common/incrementer-button';
import { addToCart, decreaseQuantity, increaseQuantity } from 'src/redux/slices/checkout';
import { useCheckout } from 'src/sections/hooks';
import { useResponsive } from 'src/hooks/use-responsive';

export default function ProductCard({ product, handleViewProductDetails }) {
  const dispatch = useDispatch();
  const isMdUp = useResponsive('up', 'md');
  const { checkout } = useCheckout();
  const [displayProduct, setDisplayProduct] = useState(product);

  const handleAddCart = useCallback(() => {
    const newProduct = {
      ...displayProduct,
      quantity: 1,
      image: { fileUrl: displayProduct.image.fileUrl },
    };
    try {
      dispatch(addToCart(newProduct));
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }, [dispatch, displayProduct]);

  const onIncreaseQuantity = useCallback(() => {
    dispatch(increaseQuantity(displayProduct.id));
  }, [dispatch, displayProduct]);

  const onDecreaseQuantity = useCallback(() => {
    dispatch(decreaseQuantity(displayProduct.id));
  }, [dispatch, displayProduct]);

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

  const discountPercentage = Math.round(((Number(displayProduct?.price) - Number(displayProduct?.sale_price)) * 100) / Number(displayProduct?.price));

  return (
    <Box sx={{ padding: 2, borderRadius: 2, boxShadow: 1, textAlign: 'center', padding: '0px' }}>
      {/* Product Image */}
      <Box
        onClick={handleViewProductDetails}
        onKeyDown={(e) => e.key === 'Enter' && handleViewProductDetails()} // Handle keyboard navigation
        role="button"
        tabIndex={0}
        sx={{
          cursor: 'pointer',
          width: '100%',
          height: 200,
          overflow: 'hidden',
          borderRadius: 2,
          mb: 1,
        }}
        aria-label={`View details for ${displayProduct?.name}`} // Add aria-label
      >
        <img
          alt="Product"
          src={displayProduct?.image?.fileUrl}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 'inherit',
          }}
        />
      </Box>

      {/* Product Name with Ellipsis */}
      <Typography
        onClick={handleViewProductDetails}
        onKeyDown={(e) => e.key === 'Enter' && handleViewProductDetails()} // Handle keyboard navigation
        role="button"
        tabIndex={0}
        sx={{
          fontFamily: 'Rubik',
          fontSize: 16,
          fontWeight: 600,
          lineHeight: 1.5,
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        aria-label={`Product Name: ${displayProduct?.name}`} // Add aria-label
      >
        {displayProduct?.name}
      </Typography>

      {/* Product Price */}
      <Typography
        onClick={handleViewProductDetails}
        onKeyDown={(e) => e.key === 'Enter' && handleViewProductDetails()} // Handle keyboard navigation
        role="button"
        tabIndex={0}
        sx={{
          fontFamily: 'Rubik',
          fontSize: 14,
          fontWeight: 600,
          lineHeight: 1.5,
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        aria-label={`Price: ₹${displayProduct?.sale_price}`} // Add aria-label
      >
        ₹{displayProduct?.sale_price}
        {Number(displayProduct?.sale_price) !== Number(displayProduct?.price) && 
          <span style={{ marginLeft: '4px', color: 'gray', textDecoration: 'line-through', fontSize: '12px' }}>
            ₹{displayProduct?.price}
          </span>}
        {discountPercentage !== 0 && 
          <span style={{ marginLeft: '4px', color: '#28a745', fontSize: '14px' }}>
            ({discountPercentage}% off)
          </span>}
      </Typography>

      {/* Add to Cart or Increment/Decrement Button */}
      {displayProduct?.cartQuantity > 0 ? (
        <IncrementerButton
          sx={{
            width: '100%',
            fontSize: 12,
            color: '#D001FF',
            background: 'white',
            borderColor : '#D001FF',
            borderRadius: 1,
            mt: 1,
          }}
          quantity={displayProduct.cartQuantity}
          onDecrease={onDecreaseQuantity}
          onIncrease={onIncreaseQuantity}
          disabledDecrease={displayProduct.cartQuantity <= 0}
          disabledIncrease={displayProduct.cartQuantity >= displayProduct.quantity}
          isProductListing = {true}
        />
      ) : (
        <Button
          variant="contained"
          size="medium"
          sx={{
            width: '100%',
            fontSize: isMdUp ? 12 : 10,
            color: '#D001FF',
            background: 'white',
            borderRadius: 1,
            borderColor: '#7635dc',
            borderWidth: '1px',
            borderStyle: 'solid',
            mt: 1,
            '&:hover': {
              background: 'white', // Keeps background white on hover
              borderColor: '#7635dc', // Keeps border color the same
              color: '#D001FF', // Keeps text color the same
            }
          }}
          onClick={handleAddCart}
          aria-label={`Add ${displayProduct?.name} to cart`} // Add aria-label
        >
          ADD TO CART
        </Button>
      )}
    </Box>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  handleViewProductDetails: PropTypes.func.isRequired,
};
