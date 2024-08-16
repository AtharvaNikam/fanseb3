// eslint-disable-next-line import/no-extraneous-dependencies
import useSWR from 'swr';
// utils
import { useMemo } from 'react';
import { endpoints, fetcher } from 'src/utils/axios';

// ----------------------------------------------------------------------

export function useGetInfluencerWithdraws() {
  const URL = endpoints.influencerWithdraws.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const refreshInfluencersWithdraws = () => {
    // Use the `mutate` function to trigger a revalidation
    mutate();
  };

  return {
    influencerWithdraws: data || [],
    influencerWithdrawsLoading: isLoading,
    influencerWithdrawsError: error,
    influencerWithdrawsValidating: isValidating,
    influencerWithdrawsEmpty: !isLoading && !data?.length,
    refreshInfluencersWithdraws, // Include the refresh function separately
  };
}

// // ----------------------------------------------------------------------

export function useGetInfluencerWithdrawsDetails(userId) {
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
  
