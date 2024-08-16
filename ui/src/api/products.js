// eslint-disable-next-line import/no-extraneous-dependencies
import { useMemo } from 'react';
import useSWR from 'swr';
// utils
import { endpoints, fetcher } from 'src/utils/axios';

// ----------------------------------------------------------------------

export function useGetProducts(id) {
  const URL = id ? endpoints.products.list(id) : null;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const refreshProducts = () => {
    // Use the `mutate` function to trigger a revalidation
    mutate();
  };

  return {
    products: data || [],
    productsLoading: isLoading,
    productsError: error,
    productsValidating: isValidating,
    productsEmpty: !isLoading && !data?.length,
    refreshProducts, // Include the refresh function separately
  };
}
export function useGetAllProducts() {
  const URL = endpoints.products.all;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const refreshProducts = () => {
    // Use the `mutate` function to trigger a revalidation
    mutate();
  };

  return {
    products: data || [],
    productsLoading: isLoading,
    productsError: error,
    productsValidating: isValidating,
    productsEmpty: !isLoading && !data?.length,
    refreshProducts, // Include the refresh function separately
  };
}

export function useGetPublicProducts() {
  const URL = endpoints.products.publicList();

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const refreshProducts = () => {
    // Use the `mutate` function to trigger a revalidation
    mutate();
  };

  return {
    products: data || [],
    productsLoading: isLoading,
    productsError: error,
    productsValidating: isValidating,
    productsEmpty: !isLoading && !data?.length,
    refreshProducts, // Include the refresh function separately
  };
}

// ----------------------------------------------------------------------

export function useGetProduct(id, productId) {
  const URL = productId ? [endpoints.products.details(id, productId)] : null;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      product: data,
      productLoading: isLoading,
      productError: error,
      productValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
export function useGetAdminProduct(id) {
  const URL = id ? [endpoints.products.edit(id)] : null;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      product: data,
      productLoading: isLoading,
      productError: error,
      productValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
export function useGetBrandProductCount(id) {
  const URL = id ? [endpoints.products.count(id)] : null;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      product: data,
      productLoading: isLoading,
      productError: error,
      productValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
export function useGetInfluencerProductCount(id) {
  const URL = id ? [endpoints.influencerProducts.count(id)] : null;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      product: data,
      productLoading: isLoading,
      productError: error,
      productValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
