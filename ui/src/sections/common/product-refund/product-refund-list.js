import PropTypes from 'prop-types';
// @mui
import Pagination, { paginationClasses } from '@mui/material/Pagination';
//
import ProductReviewItem from './product-refund-item';

// ----------------------------------------------------------------------

export default function ProductRefundList({ reviews }) {
  return (
    <>
      {reviews.map((review) => (
        <ProductReviewItem key={review.id} review={review} />
      ))}

      <Pagination
        count={10}
        sx={{
          mx: 'auto',
          [`& .${paginationClasses.ul}`]: {
            my: 5,
            mx: 'auto',
            justifyContent: 'center',
          },
        }}
      />
    </>
  );
}

ProductRefundList.propTypes = {
  reviews: PropTypes.array,
};
