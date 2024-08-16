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
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// routes
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';
// auth
import { useAuthContext } from 'src/auth/hooks';
// components
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import Logo from 'src/components/logo/logo';
import RegistrationForm from '../main/register/view/register-form-customer';

// ----------------------------------------------------------------------

export default function JwtRegisterView() {
  const { register } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await register?.(data.email, data.password, data.firstName, data.lastName);

      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 2, ml:{md:20 , xs:6},  position: 'relative' }}>
      <Typography variant="h4">Register here</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2"> Already have an account? </Typography>

        <Link href={paths.auth.customer.login} component={RouterLink} variant="subtitle2">
          Sign in
        </Link>
      </Stack>
    </Stack>
  );

  const renderTerms = (
    <Typography
      component="div"
      sx={{ color: 'text.secondary', mt: 2.5, typography: 'caption', textAlign: 'center' }}
    >
      {'By signing up, I agree to '}
      <Link underline="always" color="text.primary">
        Terms of Service
      </Link>
      {' and '}
      <Link underline="always" color="text.primary">
        Privacy Policy
      </Link>
      .
    </Typography>
  );

  // const renderForm = (
  //   <FormProvider methods={methods} onSubmit={onSubmit}>
  //     <Stack spacing={2.5}>
  //       {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

  //       <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
  //         <RHFTextField name="firstName" label="First name" />
  //         <RHFTextField name="lastName" label="Last name" />
  //       </Stack>

  //       <RHFTextField name="email" label="Email address" />

  //       <RHFTextField
  //         name="password"
  //         label="Password"
  //         type={password.value ? 'text' : 'password'}
  //         InputProps={{
  //           endAdornment: (
  //             <InputAdornment position="end">
  //               <IconButton onClick={password.onToggle} edge="end">
  //                 <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
  //               </IconButton>
  //             </InputAdornment>
  //           ),
  //         }}
  //       />

  //       <LoadingButton
  //         fullWidth
  //         color="inherit"
  //         size="large"
  //         type="submit"
  //         variant="contained"
  //         loading={isSubmitting}
  //       >
  //         Create account
  //       </LoadingButton>
  //     </Stack>
  //   </FormProvider>


    // );

  return (
    <>
      <Logo
        sx={{
          mt: { xs: 2, md: 4 },
          ml: { xs: 2, md:3  },
          mb: { xs: 3, md: 4 },
        }}
      />
      {renderHead}

      <RegistrationForm/>

      {renderTerms}
    </>
  );
}


// import { ForkRight, Router } from '@mui/icons-material';
// import {
//   Button,
//   Card,
//   Divider,
//   FormControlLabel,
//   FormLabel,
//   Grid,
//   MenuItem,
//   Radio,
//   RadioGroup,
//   Stack,
//   Switch,
//   Typography,
// } from '@mui/material';
// import { Box, margin, padding, textAlign } from '@mui/system';
// import React, { useState } from 'react';
// import { RHFSelect, RHFTextField } from 'src/components/hook-form';
// import FormProvider from 'src/components/hook-form/form-provider';
// import { Controller, useForm } from 'react-hook-form';
// import { LoadingButton } from '@mui/lab';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from 'yup';
// import { paths } from 'src/routes/paths';

// const RegistrationForm = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//   });

//   const NewUserSchema = Yup.object().shape({
//     name: Yup.string().required('Name is required'),
//     email: Yup.string().required('Email is required').email('Email must be a valid email address'),
//     phoneNumber: Yup.string().required('Phone number is required'),
//     address: Yup.string().required('Address is required'),
//     country: Yup.string().required('Country is required'),
//     company: Yup.string().required('Company is required'),
//     state: Yup.string().required('State is required'),
//     city: Yup.string().required('City is required'),
//     role: Yup.string().required('Role is required'),
//     zipCode: Yup.string().required('Zip code is required'),
//     avatarUrl: Yup.mixed().nullable().required('Avatar is required'),
//     status: Yup.string(),
//     isVerified: Yup.boolean(),
//   });

//   const methods = useForm({
//     resolver: yupResolver(NewUserSchema),
//   });
//   const {
//     reset,
//     watch,
//     control,
//     setValue,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;

//   const values = watch();

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 500));
//       reset();
//       Router.push(paths.admin_dashboard.user.list);
//       console.info('DATA', data);
//     } catch (error) {
//       console.error(error);
//     }
//   });
//   const OPTIONS = [
//     { value: 'option 1', label: 'Brand' },
//     { value: 'option 2', label: 'Influencer' },
//   ];

//   return (
//     <Grid className="abhi" py="40px" justifyContent="center" mx="10%" display="flex" fullWidth>
//       <FormProvider methods={methods} onSubmit={onSubmit}>
//         <Grid container spacing={3}>
//           <Card sx={{ p: 3 }}>
//             <Box
//               rowGap={3}
//               columnGap={2}
//               display="grid"
//               gridTemplateColumns={{
//                 xs: 'repeat(1, 1fr)',
//                 sm: 'repeat(2, 1fr)',
//               }}
//             >
//               <RHFTextField name="name" label="Full Name" />
//               <RHFTextField name="email" label="Email Address" />
//               <RHFTextField name="phoneNumber" label="Phone Number" />

//               <RHFTextField name="state" label="State/Region" />
//               <RHFTextField name="city" label="City" />
//               <RHFTextField name="address" label="Address" />
//               <RHFTextField name="zipCode" label="Zip/Code" />
//               <RHFTextField name="company" label="Company" />
//               <RHFSelect name="singleSelect" label="Role">
//                 {/* <MenuItem value="">Role</MenuItem> */}
//                 <Divider sx={{ borderStyle: 'dashed' }} />
//                 {OPTIONS.map((option) => (
//                   <MenuItem key={option.value} value={option.label}>
//                     {option.label}
//                   </MenuItem>
//                 ))}
//               </RHFSelect>
//             </Box>

//             <Stack alignItems="flex-end" sx={{ mt: 3 }}>
//               <LoadingButton
//                 type="submit"
//                 variant="contained"
//                 loading={isSubmitting}
//                 style={{ background: '#00e9e7' }}
//               >
//                 Create User
//               </LoadingButton>
//             </Stack>
//           </Card>
//         </Grid>
//       </FormProvider>
//     </Grid>
//   );
// };

// export default RegistrationForm;
