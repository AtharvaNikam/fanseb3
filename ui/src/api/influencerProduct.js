// eslint-disable-next-line import/no-extraneous-dependencies
import { useMemo } from 'react';
import useSWR from 'swr';
// utils
import { endpoints, fetcher } from 'src/utils/axios';

// ----------------------------------------------------------------------

export function useGetInfluencerProducts() {
  const URL = endpoints.influencerProducts.list();

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const refreshInfluencerProducts = () => {
    // Use the `mutate` function to trigger a revalidation
    mutate();
  };

  return {
    influencerProducts: data || [],
    influencerProductsLoading: isLoading,
    influencerProductsError: error,
    influencerProductsValidating: isValidating,
    influencerProductsEmpty: !isLoading && !data?.length,
    refreshInfluencerProducts, // Include the refresh function separately
  };
}

export function useGetInfluencerTypeBasedProducts(id, type) {
  const URL = id ? endpoints.influencerProducts.list(id, type) : null;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const refreshInfluencerProducts = () => {
    // Use the `mutate` function to trigger a revalidation
    mutate();
  };

  return {
    influencerProducts: data || [],
    influencerProductsLoading: isLoading,
    influencerProductsError: error,
    influencerProductsValidating: isValidating,
    influencerProductsEmpty: !isLoading && !data?.length,
    refreshInfluencerProducts, // Include the refresh function separately
  };
}

// ----------------------------------------------------------------------

export function useGetInfluencerProduct(id, productId) {
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

export function useGetInfluencerProductList(id) {
  const URL = id ? [endpoints.influencerPublicProducts.list(id)] : null;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      products: data,
      productsLoading: isLoading,
      productsError: error,
      productsValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
