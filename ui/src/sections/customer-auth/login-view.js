import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// routes
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
// config
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// auth
import { useAuthContext } from 'src/auth/hooks';
// components
import { setSession } from 'src/auth/context/jwt/utils';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import { PATH_AFTER_LOGIN_CUSTOMER } from 'src/config-global';

// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const { login } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };
  // const defaultValues = {
  //   email: 'demo@minimals.cc',
  //   password: 'demo1234',
  // };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    resetField,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const location = 'customer-login';
      const res = await login?.(data.email, data.password, location);
      if (res?.isActive === false) {
        sessionStorage.clear();
        localStorage.clear();
        setSession(null);
        router.push('/auth/customer/login');
        setErrorMsg('Your account is account under review once approved by admin you’ll be informed');
        reset();
      }
      if (!res.permissions.includes('customer')) {
        // localStorage.removeItem('accessToken');
        // localStorage.removeItem('permissions');
        sessionStorage.clear();
        localStorage.clear();
        // Location.reload();
        setSession(null);
        router.push('/auth/customer/login');
        // Display an error for invalid access
        setErrorMsg('Invalid Access');
        reset();
      }
      if (res.permissions.includes('customer')) {
        console.log('customer dashboard');
        router.push(PATH_AFTER_LOGIN_CUSTOMER);
      }
    } catch (error) {
      console.log('error :>>', error);
      if (error?.error?.message === 'password doesnt match') {
        resetField('password');
      } else if (error === ' Invalid Access') {
        setErrorMsg('Invalid Access');
        resetField('password');
      }
      // reset();

      setErrorMsg(typeof error === 'string' ? error : error.error.message);
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">Sign in to Customer</Typography>

      {/* <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">New user?</Typography>

        <Link component={RouterLink} href={paths.auth.customer.register} variant="subtitle2">
          Create an account
        </Link>
      </Stack> */}
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <Link
        component={RouterLink}
        href={paths.auth.customer.register}
        variant="body2"
        color="inherit"
        underline="always"
        sx={{ alignSelf: 'flex-start' }}
      >
        Are you a new customer ?
      </Link>
      <RHFTextField name="email" label="Customer Email address" />

      <RHFTextField
        name="password"
        label="Password"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Link
        component={RouterLink}
        href={paths.auth.customer.forgotPassword}
        variant="body2"
        color="inherit"
        underline="always"
        sx={{ alignSelf: 'flex-end' }}
      >
        Forgot password?
      </Link>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>

      <Link
        component={RouterLink}
        href={paths.admin.login}
        variant="caption"
        color="text.secondary"
        underline="always"
        sx={{ alignSelf: 'center' }}
      >
        Are you a influencer ?
      </Link>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}
      {renderForm}
    </FormProvider>
  );
}
