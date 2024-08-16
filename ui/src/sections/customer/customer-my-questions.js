import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import { Typography } from '@mui/material';
import { useAuthContext } from 'src/auth/hooks';
import FormProvider from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import axiosInstance from 'src/utils/axios';
import { QuestionsListView } from './questions/view';

// ----------------------------------------------------------------------

export default function CustomerMyQuestions() {
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuthContext();

  const password = useBoolean();

  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string()
      .required('New Password is required')
      .min(6, 'Password must be at least 6 characters')
      .test(
        'no-match',
        'New password must be different than old password',
        (value, { parent }) => value !== parent.oldPassword
      ),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword')], 'Passwords must match'),
  });

  const defaultValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const inputData = {
      email: user.email,
      oldPassword: data.oldPassword,
      newPassword: data.confirmNewPassword,
    };
    try {
      await axiosInstance.post(`/setPassword`, inputData);
      reset();
      enqueueSnackbar('Password change successfully');
    } catch (error) {
      enqueueSnackbar(
        error?.error?.message
          ? error?.error?.message
          : 'There was an error while updating password',
        {
          variant: 'error',
        }
      );
      console.error(error);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack component={Card} justifyContent="center" alignItems="center" spacing={3} sx={{ p: 3 }}>
        <Typography variant="h3">My Questions</Typography>

        {/* <Box alignItems="center" mx={5}>
          <Typography sx={{ color: 'text.secondary' }}>
            {`Apologies, you haven't submitted any questions or queries yet.`}
          </Typography>

          <BookingIllustration sx={{ my: 10, height: 240 }} />
        </Box> */}
        <QuestionsListView />
      </Stack>
    </FormProvider>
  );
}
