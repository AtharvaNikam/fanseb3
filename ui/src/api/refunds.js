// eslint-disable-next-line import/no-extraneous-dependencies
import useSWR from 'swr';
// utils
import { useMemo } from 'react';
import { endpoints, fetcher } from 'src/utils/axios';

// ----------------------------------------------------------------------

export function useGetRefunds() {
  const URL = endpoints.refunds.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const refreshRefunds = () => {
    // Use the `mutate` function to trigger a revalidation
    mutate();
  };

  return {
    refunds: data || [],
    refundsLoading: isLoading,
    refundsError: error,
    refundsValidating: isValidating,
    refundsEmpty: !isLoading && !data?.length,
    refreshRefunds, // Include the refresh function separately
  };
}
export function useGetBrandRefunds(id) {
  const URL = id ? endpoints.refunds.brandList(id) : null;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const refreshRefunds = () => {
    // Use the `mutate` function to trigger a revalidation
    mutate();
  };

  return {
    refunds: data || [],
    refundsLoading: isLoading,
    refundsError: error,
    refundsValidating: isValidating,
    refundsEmpty: !isLoading && !data?.length,
    refreshRefunds, // Include the refresh function separately
  };
}
export function useGetUserRefunds(id) {
  const URL = id ? endpoints.refunds.user(id) : null;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const refreshRefunds = () => {
    // Use the `mutate` function to trigger a revalidation
    mutate();
  };

  return {
    refunds: data || [],
    refundsLoading: isLoading,
    refundsError: error,
    refundsValidating: isValidating,
    refundsEmpty: !isLoading && !data?.length,
    refreshRefunds, // Include the refresh function separately
  };
}

// ----------------------------------------------------------------------

export function useGetRefund(id) {
  const URL = id ? [endpoints.refunds.details(id)] : null;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      refund: data,
      refundLoading: isLoading,
      refundError: error,
      refundValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
