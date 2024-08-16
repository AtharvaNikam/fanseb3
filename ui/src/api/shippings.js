// eslint-disable-next-line import/no-extraneous-dependencies
import { useMemo } from 'react';
import useSWR from 'swr';
// utils
import { endpoints, fetcher } from 'src/utils/axios';

// ----------------------------------------------------------------------

export function useGetShippings() {
  const URL = endpoints.shipping.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const refreshShippings = () => {
    // Use the `mutate` function to trigger a revalidation
    mutate();
  };

  return {
    shippings: data || [],
    shippingsLoading: isLoading,
    shippingsError: error,
    shippingsValidating: isValidating,
    shippingsEmpty: !isLoading && !data?.length,
    refreshShippings, // Include the refresh function separately
  };
}

// ----------------------------------------------------------------------

export function useGetShipping(id) {
  const URL = id ? [endpoints.shipping.details(id)] : null;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      shipping: data,
      shippingLoading: isLoading,
      shippingError: error,
      shippingValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
