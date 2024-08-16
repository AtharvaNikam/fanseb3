// eslint-disable-next-line import/no-extraneous-dependencies
import { useMemo } from 'react';
import useSWR from 'swr';
// utils
import { endpoints, fetcher } from 'src/utils/axios';

// ----------------------------------------------------------------------

export function useGetOrders() {
  const URL = endpoints.order.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const refreshOrder = () => {
    // Use the `mutate` function to trigger a revalidation
    mutate();
  };

  return {
    orders: data || [],
    ordersLoading: isLoading,
    ordersError: error,
    ordersValidating: isValidating,
    ordersEmpty: !isLoading && !data?.length,
    refreshOrder, // Include the refresh function separately
  };
}

// ----------------------------------------------------------------------
export function useGetBrandOrders(id) {
  const URL = id ? endpoints.order.orderBrands(id) : null;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const refreshOrder = () => {
    // Use the `mutate` function to trigger a revalidation
    mutate();
  };

  return {
    orders: data || [],
    ordersLoading: isLoading,
    ordersError: error,
    ordersValidating: isValidating,
    ordersEmpty: !isLoading && !data?.length,
    refreshOrder, // Include the refresh function separately
  };
}
export function useGetBrandOrdersCounts(id) {
  const URL = id ? endpoints.order.orderBrandsCounts(id) : null;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const refreshOrder = () => {
    // Use the `mutate` function to trigger a revalidation
    mutate();
  };

  return {
    orders: data || [],
    ordersLoading: isLoading,
    ordersError: error,
    ordersValidating: isValidating,
    ordersEmpty: !isLoading && !data?.length,
    refreshOrder, // Include the refresh function separately
  };
}
// ----------------------------------------------------------------------
export function useGetInfluencerOrders(id) {
  const URL = id ? endpoints.order.orderInfluencer(id) : null;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const refreshOrder = () => {
    // Use the `mutate` function to trigger a revalidation
    mutate();
  };

  return {
    orders: data || [],
    ordersLoading: isLoading,
    ordersError: error,
    ordersValidating: isValidating,
    ordersEmpty: !isLoading && !data?.length,
    refreshOrder, // Include the refresh function separately
  };
}
// ----------------------------------------------------------------------
export function useGetCustomerOrders(id) {
  const URL = id ? endpoints.order.orderCustomer(id) : null;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const refreshOrder = () => {
    // Use the `mutate` function to trigger a revalidation
    mutate();
  };

  return {
    orders: data || [],
    ordersLoading: isLoading,
    ordersError: error,
    ordersValidating: isValidating,
    ordersEmpty: !isLoading && !data?.length,
    refreshOrder, // Include the refresh function separately
  };
}
// ----------------------------------------------------------------------

export function useGetOrder(id) {
  const URL = id ? [endpoints.order.details(id)] : null;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      order: data,
      orderLoading: isLoading,
      orderError: error,
      orderValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetAdminSalesHistory() {
  const URL = endpoints.order.getAdminSalesHistory();

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const refreshGetAdminSalesHistory = () => {
    mutate();
  };

  return {
    salesData: data || [],
    ordersLoading: isLoading,
    ordersError: error,
    ordersValidating: isValidating,
    ordersEmpty: !isLoading && !data?.length,
    refreshGetAdminSalesHistory,
  };
}
