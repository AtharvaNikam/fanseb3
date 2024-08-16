// eslint-disable-next-line import/no-extraneous-dependencies
import { useMemo } from 'react';
import useSWR from 'swr';
// utils
import { endpoints, fetcher } from 'src/utils/axios';

// ----------------------------------------------------------------------

export function useGetAllBrands() {
  const URL = endpoints.brands.allBrands;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const refreshBrands = () => {
    // Use the `mutate` function to trigger a revalidation
    mutate();
  };

  return {
    brands: data || [],
    brandsLoading: isLoading,
    brandsError: error,
    brandsValidating: isValidating,
    brandsEmpty: !isLoading && !data?.length,
    refreshBrands, // Include the refresh function separately
  };
}
export function useGetBrands(id) {
  const URL = id ? endpoints.brands.list(id) : null;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const refreshBrands = () => {
    // Use the `mutate` function to trigger a revalidation
    mutate();
  };

  return {
    brands: data || [],
    brandsLoading: isLoading,
    brandsError: error,
    brandsValidating: isValidating,
    brandsEmpty: !isLoading && !data?.length,
    refreshBrands, // Include the refresh function separately
  };
}

export function useGetPublicBrands() {
  const URL = endpoints.publicBrands.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const refreshBrands = () => {
    // Use the `mutate` function to trigger a revalidation
    mutate();
  };

  return {
    brands: data || [],
    brandsLoading: isLoading,
    brandsError: error,
    brandsValidating: isValidating,
    brandsEmpty: !isLoading && !data?.length,
    refreshBrands, // Include the refresh function separately
  };
}

// ----------------------------------------------------------------------

export function useGetBrand(brandId) {
  const URL = brandId ? [endpoints.brands.details(brandId)] : null;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      brand: data,
      brandLoading: isLoading,
      brandError: error,
      brandValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetPublicBrand(brandId) {
  const URL = brandId ? [endpoints.publicBrands.details(brandId)] : null;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      brand: data,
      brandLoading: isLoading,
      brandError: error,
      brandValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
