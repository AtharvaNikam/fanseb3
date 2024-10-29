import PropTypes from 'prop-types';
import { Box, Button, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
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

  return (
    <Box sx={{ padding: 2, borderRadius: 2, boxShadow: 1, textAlign: 'center' }}>
      {/* Product Image */}
      <Box
        onClick={handleViewProductDetails}
        sx={{
          cursor: 'pointer',
          width: '100%',
          height: 200,
          overflow: 'hidden',
          borderRadius: 2,
          mb: 1,
        }}
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
      >
        {displayProduct?.name}
      </Typography>

      {/* Add to Cart or Increment/Decrement Button */}
      {displayProduct?.cartQuantity > 0 ? (
        <IncrementerButton
          sx={{
            width: '100%',
            fontSize: 12,
            color: 'white',
            background: '#232321',
            borderRadius: 1,
            mt: 1,
          }}
          quantity={displayProduct.cartQuantity}
          onDecrease={onDecreaseQuantity}
          onIncrease={onIncreaseQuantity}
          disabledDecrease={displayProduct.cartQuantity <= 0}
          disabledIncrease={displayProduct.cartQuantity >= displayProduct.quantity}
        />
      ) : (
        <Button
          variant="contained"
          size="medium"
          sx={{
            width: '100%',
            fontSize: isMdUp ? 12 : 10,
            color: 'white',
            background: '#232321',
            borderRadius: 1,
            mt: 1,
          }}
          onClick={handleAddCart}
        >
          ADD TO CART - ₹
          <span
            style={{
              color: '#D001FF',
              fontSize: isMdUp ? 12 : 10,
              marginLeft: 3,
              textTransform: 'uppercase',
            }}
          >
            {displayProduct?.sale_price}
          </span>
        </Button>
      )}
    </Box>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  handleViewProductDetails: PropTypes.func.isRequired,
};
