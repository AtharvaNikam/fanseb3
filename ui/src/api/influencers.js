// eslint-disable-next-line import/no-extraneous-dependencies
import useSWR from 'swr';
// utils
import { useMemo } from 'react';
import { endpoints, fetcher } from 'src/utils/axios';

// ----------------------------------------------------------------------

export function useGetInfluencers() {
  const URL = endpoints.influencer.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const refreshInfluencers = () => {
    // Use the `mutate` function to trigger a revalidation
    mutate();
  };

  return {
    influencers: data || [],
    influencersLoading: isLoading,
    influencersError: error,
    influencersValidating: isValidating,
    influencersEmpty: !isLoading && !data?.length,
    refreshInfluencers, // Include the refresh function separately
  };
}

// // ----------------------------------------------------------------------

export function useGetInfluencer(userId) {
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
