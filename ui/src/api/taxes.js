// eslint-disable-next-line import/no-extraneous-dependencies
import { useMemo } from 'react';
import useSWR from 'swr';
// utils
import { endpoints, fetcher } from 'src/utils/axios';

// ----------------------------------------------------------------------

export function useGetTaxes() {
  const URL = endpoints.taxes.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const refreshTaxes = () => {
    // Use the `mutate` function to trigger a revalidation
    mutate();
  };

  return {
    taxes: data || [],
    taxesLoading: isLoading,
    taxesError: error,
    taxesValidating: isValidating,
    taxesEmpty: !isLoading && !data?.length,
    refreshTaxes, // Include the refresh function separately
  };
}

// ----------------------------------------------------------------------

export function useGetTax(id) {
  const URL = id ? [endpoints.taxes.details(id)] : null;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      tax: data,
      taxLoading: isLoading,
      taxError: error,
      taxValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
