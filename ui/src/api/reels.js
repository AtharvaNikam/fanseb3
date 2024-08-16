// eslint-disable-next-line import/no-extraneous-dependencies
import { useMemo } from 'react';
import useSWR from 'swr';
// utils
import { endpoints, fetcher, poster } from 'src/utils/axios';

// ----------------------------------------------------------------------

export function useGetReels() {
  const URL = endpoints.reels.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const refreshReels = () => {
    // Use the `mutate` function to trigger a revalidation
    mutate();
  };

  return {
    reels: data || [],
    reelsLoading: isLoading,
    reelsError: error,
    reelsValidating: isValidating,
    reelsEmpty: !isLoading && !data?.length,
    refreshReels, // Include the refresh function separately
  };
}
export function useGetPublicReels(id) {
  const URL = id ? endpoints.publicReels.list(id) : null;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const refreshReels = () => {
    // Use the `mutate` function to trigger a revalidation
    mutate();
  };

  return {
    reels: data || [],
    reelsLoading: isLoading,
    reelsError: error,
    reelsValidating: isValidating,
    reelsEmpty: !isLoading && !data?.length,
    refreshReels, // Include the refresh function separately
  };
}

export function useGetRandomReels() {
  const URL = endpoints.reels.randomReels;

  const { data, isLoading, error, isValidating, mutate } = useSWR([URL, 'POST'], poster);

  const refreshReels = () => {
    // Use the `mutate` function to trigger a revalidation
    mutate();
  };

  return {
    reels: data || [],
    reelsLoading: isLoading,
    reelsError: error,
    reelsValidating: isValidating,
    reelsEmpty: !isLoading && !data?.length,
    refreshReels, // Include the refresh function separately
  };
}

// ----------------------------------------------------------------------

export function useGetReel(id) {
  const URL = id ? [endpoints.reels.listById(id)] : null;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      reels: data,
      reelsLoading: isLoading,
      reelsError: error,
      reelsValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
