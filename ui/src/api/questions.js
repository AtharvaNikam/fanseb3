// eslint-disable-next-line import/no-extraneous-dependencies
import { endpoints, fetcher } from 'src/utils/axios';
import useSWR from 'swr';
// utils

// ----------------------------------------------------------------------
export function useGetQuestions() {
  const URL = [endpoints.questions.list];
  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const refreshQuestions = () => {
    // Use the `mutate` function to trigger a revalidation
    mutate();
    console.log('here Admin Questions');
  };

  return {
    questions: data || [],
    questionsLoading: isLoading,
    questionsError: error,
    questionsValidating: isValidating,
    questionsEmpty: !isLoading && !data?.length,
    refreshQuestions, // Include the refresh function separately
  };
}
// ----------------------------------------------------------------------
export function useGetCustomerQuestions(id) {
  const URL = id ? [endpoints.questions.customerQuestions(id)] : null;
  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const refreshCustomerQuestions = () => {
    // Use the `mutate` function to trigger a revalidation
    mutate();
    console.log('here Customer Questions');
  };

  return {
    questions: data || [],
    questionsLoading: isLoading,
    questionsError: error,
    questionsValidating: isValidating,
    questionsEmpty: !isLoading && !data?.length,
    refreshCustomerQuestions, // Include the refresh function separately
  };
}
// ----------------------------------------------------------------------
export function useGetBrandQuestions(id) {
  const URL = id ? [endpoints.questions.brandQuestions(id)] : null;
  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const refreshBrandQuestions = () => {
    // Use the `mutate` function to trigger a revalidation
    mutate();
    console.log('here BrandQuestions');
  };

  return {
    questions: data || [],
    questionsLoading: isLoading,
    questionsError: error,
    questionsValidating: isValidating,
    questionsEmpty: !isLoading && !data?.length,
    refreshBrandQuestions, // Include the refresh function separately
  };
}
// ----------------------------------------------------------------------
