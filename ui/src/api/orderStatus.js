// eslint-disable-next-line import/no-extraneous-dependencies
import { useMemo } from 'react';
import useSWR from 'swr';
// utils
import { endpoints, fetcher } from 'src/utils/axios';

// ----------------------------------------------------------------------

export function useGetOrderStatuses() {
  const URL = endpoints.orderStatus.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const refreshOrderStatuses = () => {
    // Use the `mutate` function to trigger a revalidation
    mutate();
  };

  return {
    orderStatuses: data || [],
    orderStatusesLoading: isLoading,
    orderStatusesError: error,
    orderStatusesValidating: isValidating,
    orderStatusesEmpty: !isLoading && !data?.length,
    refreshOrderStatuses, // Include the refresh function separately
  };
}

// ----------------------------------------------------------------------

export function useGetOrderStatus(id) {
  const URL = id ? [endpoints.orderStatus.details(id)] : null;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      orderStatus: data,
      orderStatusLoading: isLoading,
      orderStatusError: error,
      orderStatusValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
