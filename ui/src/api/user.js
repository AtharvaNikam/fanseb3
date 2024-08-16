// eslint-disable-next-line import/no-extraneous-dependencies
import { useMemo } from 'react';
import useSWR from 'swr';
// utils
import { endpoints, fetcher } from 'src/utils/axios';

// ----------------------------------------------------------------------

export function useGetUsers() {
  const URL = endpoints.user.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const refreshUsers = () => {
    // Use the `mutate` function to trigger a revalidation
    mutate();
  };

  return {
    users: data || [],
    usersLoading: isLoading,
    usersError: error,
    usersValidating: isValidating,
    usersEmpty: !isLoading && !data?.length,
    refreshUsers, // Include the refresh function separately
  };
}
export function useGetUserMe() {
  const URL = endpoints.auth.me;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const refreshUser = () => {
    // Use the `mutate` function to trigger a revalidation
    mutate();
  };

  return {
    user: data || [],
    userLoading: isLoading,
    userError: error,
    userValidating: isValidating,
    userEmpty: !isLoading && !data?.length,
    refreshUser, // Include the refresh function separately
  };
}

// ----------------------------------------------------------------------

export function useGetUser(userId) {
  const URL = userId ? [endpoints.user.details(userId)] : null;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      user: data,
      userLoading: isLoading,
      userError: error,
      userValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// -------------------------------------------------------------------------

