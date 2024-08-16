import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import { Stack, Typography } from '@mui/material';
import { useAuthContext } from 'src/auth/hooks';
import { useSnackbar } from 'src/components/snackbar';
import axiosInstance from 'src/utils/axios';
import { OrderListView } from './order/view';

// ----------------------------------------------------------------------

export default function CustomerMyOrders() {
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
    <Stack justifyContent="center" alignItems="center" spacing={3}>
      <Typography variant="h3">My Orders</Typography>

      <OrderListView />
    </Stack>
  );
}
