// eslint-disable-next-line import/no-extraneous-dependencies
import { useMemo } from 'react';
import useSWR from 'swr';
// utils
import { endpoints, fetcher } from 'src/utils/axios';

// ----------------------------------------------------------------------

export function useGetCategories() {
  const URL = endpoints.categories.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const refreshCategories = () => {
    // Use the `mutate` function to trigger a revalidation
    mutate();
  };

  return {
    category: data || [],
    categoryLoading: isLoading,
    categoryError: error,
    categoryValidating: isValidating,
    categoryEmpty: !isLoading && !data?.length,
    refreshCategories, // Include the refresh function separately
  };
}

// ----------------------------------------------------------------------

export function useGetCategory(categoryId) {
  const URL = categoryId ? [endpoints.categories.details(categoryId)] : null;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      category: data,
      categoryLoading: isLoading,
      categoryError: error,
      categoryValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
