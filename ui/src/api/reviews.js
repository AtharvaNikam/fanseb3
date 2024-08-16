// eslint-disable-next-line import/no-extraneous-dependencies
import useSWR from 'swr';
// utils
import { endpoints, fetcher } from 'src/utils/axios';

// ----------------------------------------------------------------------

export function useGetReviews() {
  const URL = endpoints.reviews.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const refreshReviews = () => {
    // Use the `mutate` function to trigger a revalidation
    mutate();
  };

  return {
    reviews: data || [],
    reviewsLoading: isLoading,
    reviewsError: error,
    reviewsValidating: isValidating,
    reviewsEmpty: !isLoading && !data?.length,
    refreshReviews, // Include the refresh function separately
  };
}
export function useGetBrandReviews(id) {
  const URL = id ? endpoints.reviewsBrand.list(id) : null;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const refreshReviews = () => {
    // Use the `mutate` function to trigger a revalidation
    mutate();
  };

  return {
    reviews: data || [],
    reviewsLoading: isLoading,
    reviewsError: error,
    reviewsValidating: isValidating,
    reviewsEmpty: !isLoading && !data?.length,
    refreshReviews, // Include the refresh function separately
  };
}

// ----------------------------------------------------------------------

// export function useGetShipping(id) {
//   const URL = id ? [endpoints.shipping.details(id)] : null;
//   const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

//   const memoizedValue = useMemo(
//     () => ({
//       shipping: data,
//       shippingLoading: isLoading,
//       shippingError: error,
//       shippingValidating: isValidating,
//     }),
//     [data, error, isLoading, isValidating]
//   );

//   return memoizedValue;
// }
