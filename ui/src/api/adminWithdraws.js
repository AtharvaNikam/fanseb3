// eslint-disable-next-line import/no-extraneous-dependencies
import useSWR from 'swr';
// utils
import { useMemo } from 'react';
import { endpoints, fetcher } from 'src/utils/axios';

// ----------------------------------------------------------------------

export function useGetAdminBrandWithdraws() {
  const URL = endpoints.adminWithdraws.listBrandWithdrawals;

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
export function useGetAdminBrandWithdraw(id) {
  const URL = id ? endpoints.adminWithdraws.detailsBrandWithdrawals(id) : null;

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
export function useGetAdminInfluencerWithdraws() {
  const URL = endpoints.adminWithdraws.listInfluencerWithdrawals;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const refreshInfluencerWithdraws = () => {
    // Use the `mutate` function to trigger a revalidation
    mutate();
  };

  return {
    influencerWithdraws: data || [],
    influencerWithdrawsLoading: isLoading,
    influencerWithdrawsError: error,
    influencerWithdrawsValidating: isValidating,
    influencerWithdrawsEmpty: !isLoading && !data?.length,
    refreshInfluencerWithdraws, // Include the refresh function separately
  };
}
export function useGetAdminInfluencerWithdraw(id) {
  const URL = id ? endpoints.adminWithdraws.detailsInfluencerWithdrawals(id) : null;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const refreshInfluencerWithdraws = () => {
    // Use the `mutate` function to trigger a revalidation
    mutate();
  };

  return {
    influencerWithdraws: data || [],
    influencerWithdrawsLoading: isLoading,
    influencerWithdrawsError: error,
    influencerWithdrawsValidating: isValidating,
    influencerWithdrawsEmpty: !isLoading && !data?.length,
    refreshInfluencerWithdraws, // Include the refresh function separately
  };
}

// // ----------------------------------------------------------------------

export function useGetAdminWithdrawsDetails(userId) {
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
