import sumBy from 'lodash/sumBy';
import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// utils
import { fShortenNumber } from 'src/utils/format-number';
// hooks
import { Alert, LinearProgress } from '@mui/material';
import { useBoolean } from 'src/hooks/use-boolean';
import ProductReviewList from 'src/sections/common/product-review/product-review-list';
import ProductReviewNewForm from 'src/sections/common/product-review/product-review-new-form';
// components
//

// ----------------------------------------------------------------------
// const ratings = [
//   { name: '5 Stars', ratings: 150, reviewCount: 100 },
//   { name: '4 Stars', ratings: 80, reviewCount: 50 },
//   { name: '3 Stars', ratings: 40, reviewCount: 30 },
//   { name: '2 Stars', ratings: 20, reviewCount: 15 },
//   { name: '1 Star', ratings: 10, reviewCount: 5 },
// ];

// ----------------------------------------------------------------------

export default function ProductDetailsReview({ reviews, ratings }) {
  const review = useBoolean();

  const total = sumBy(ratings, (star) => star.ratings);
  const totalReviews = reviews?.length;
  const totalRatings = ratings?.length;

  const renderSummary = (
    <Stack spacing={1} alignItems="center" justifyContent="center">
      <Typography variant="subtitle2">Average rating</Typography>

      <Typography variant="h2">{totalRatings}/5</Typography>

      <Rating readOnly value={totalRatings} precision={0.1} />

      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        ({fShortenNumber(totalReviews)} reviews)
      </Typography>
    </Stack>
  );

  const renderProgress = (
    <Stack
      spacing={1.5}
      sx={{
        py: 5,
        px: { xs: 3, md: 5 },
        borderLeft: (theme) => ({
          md: `dashed 1px ${theme.palette.divider}`,
        }),
        borderRight: (theme) => ({
          md: `dashed 1px ${theme.palette.divider}`,
        }),
      }}
    >
      {ratings &&
        ratings
          .slice(0)

          .map((rating) => (
            <Stack key={rating.name} direction="row" alignItems="center">
              <Typography variant="subtitle2" component="span" sx={{ width: 52 }}>
                {rating.name}
              </Typography>

              <LinearProgress
                color="inherit"
                variant="determinate"
                value={(rating.ratings / total) * 100}
                sx={{
                  mx: 2,
                  flexGrow: 1,
                }}
              />

              <Typography
                variant="body2"
                component="span"
                sx={{
                  minWidth: 48,
                  color: 'text.secondary',
                }}
              >
                {fShortenNumber(rating.reviewCount)}
              </Typography>
            </Stack>
          ))}
    </Stack>
  );

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
        sx={{
          py: { xs: 5, md: 0 },
        }}
      >
        {renderSummary}

        {renderProgress}
      </Box>
      <Divider sx={{ borderStyle: 'dashed' }} />

      <Alert
        severity="info"
        variant="outlined"
        sx={{
          my: 3,
          mx: 2.5,
          px: 2.5,
          py: 1.5,
        }}
      >
        Note: You can add your review under My Orders.
      </Alert>
      {reviews ? (
        <ProductReviewList reviews={reviews} />
      ) : (
        <Typography
          variant="subtitle2"
          sx={{
            my: 3,
            mx: 2.5,
            px: 2.5,
            py: 1.5,
          }}
        >
          No customer reviews
        </Typography>
      )}
      <ProductReviewNewForm open={review.value} onClose={review.onFalse} />
    </>
  );
}

ProductDetailsReview.propTypes = {
  ratings: PropTypes.array,
  reviews: PropTypes.array,
  // totalRatings: PropTypes.number,
  // totalReviews: PropTypes.number,
};
