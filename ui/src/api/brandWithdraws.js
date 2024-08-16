// eslint-disable-next-line import/no-extraneous-dependencies
import useSWR from 'swr';
// utils
import { useMemo } from 'react';
import { endpoints, fetcher } from 'src/utils/axios';

// ----------------------------------------------------------------------

export function useGetBrandWithdraws(id) {
  const URL = id ? endpoints.brandWithdraws.list(id) : null;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const refreshBrandWithdraws = () => {
    // Use the `mutate` function to trigger a revalidation
    mutate();
  };

  return {
    brandWithdraws: data || [],
    brandWithdrawsLoading: isLoading,
    brandWithdrawsError: error,
    brandWithdrawsValidating: isValidating,
    brandWithdrawsEmpty: !isLoading && !data?.length,
    refreshBrandWithdraws, // Include the refresh function separately
  };
}

// // ----------------------------------------------------------------------

export function useGetBrandWithdrawsDetails(userId) {
  const URL = userId ? [endpoints.influencer.details(userId)] : null;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      influencer: data,
      influencerLoading: isLoading,
      influencerError: error,
      influencerValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}
