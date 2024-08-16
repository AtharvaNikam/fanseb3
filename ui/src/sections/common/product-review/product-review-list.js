import PropTypes from 'prop-types';
// @mui
import Pagination, { paginationClasses } from '@mui/material/Pagination';
//
import { useState } from 'react';
import ProductReviewItem from './product-review-item';

// ----------------------------------------------------------------------

export default function ProductReviewList({ reviews }) {
  // Number of reviews per page
  const reviewsPerPage = 5;

  // State to track the current page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total number of pages
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  // Calculate index of the first and last review to display on the current page
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;

  // Filter reviews to display on the current page
  const reviewsToShow = reviews.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  return (
    <>
      {reviewsToShow &&
        reviewsToShow.map((review) => <ProductReviewItem key={review.id} reviews={review} />)}

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
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

ProductReviewList.propTypes = {
  reviews: PropTypes.any,
};
