import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, Divider, MenuItem, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import axiosInstance from 'src/utils/axios';
import * as Yup from 'yup';

const RegistrationForm = () => {
  const router = useRouter();
  // const [optionValue, setOptionValue] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    userName: '',
    password: '',
    contactNo: '',
    // address:'',
    // country:'',
    // comapny:'',
    // state:'',
    // city:'',
    // role: '',
    // zipCode:'',
  });

  const NewUserSchema = Yup.object().shape({
    // name: Yup.string().required('Name is required'),
    // email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    // username: Yup.string().required('Username is required'),
    // password: Yup.string().required('Password is required'),
    // phoneNumber: Yup.string().required('Phone number is required'),
    // // // // address: Yup.string().required('Address is required'),
    // // // // country: Yup.string().required('Country is required'),
    // // // // company: Yup.string().required('Company is required'),
    // // // // state: Yup.string().required('State is required'),
    // // // // city: Yup.string().required('City is required'),
    // role: Yup.string().required('Role is required'),
    // zipCode: Yup.string().required('Zip code is required'),
    // avatarUrl: Yup.mixed().nullable().required('Avatar is required'),
    // status: Yup.string(),
    // isVerified: Yup.boolean(),
  });

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // const handelOptionValue = (optionValue2) => {
  //   setOptionValue(optionValue2);
  // };
  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    // try {
    // await new Promise((resolve) => setTimeout(resolve, 500));
    // reset();
    //   Router.push(paths.admin_dashboard.user.list);
    //   console.info('DATA', data);
    // } catch (error) {
    //   console.error(error);
    // }
    try {
      // Build inputData
      const inputData = {
        name: data.name,
        email: data.email,
        userName: data.userName,
        password: data.password,
        contactNo: data.contactNo,
        isActive: true,
        // isInfluncer: optionValue === 'influencer',
      };
      console.log('🚀 ~ inputData:', inputData);

      // Update user profile
        await new Promise((resolve) => setTimeout(resolve, 500));
        await axiosInstance.post(`/register`, inputData);
        // Show success notification
        enqueueSnackbar('User added successfully!', { variant: 'success' });
        router.push(paths.auth.customer.login);
        reset();
    } catch (error) {
      // Show error notification
      enqueueSnackbar('Unexpected error encountered', { variant: 'error' });
      console.error(error);
    }
  });
  // const OPTIONS = [
  //   // { value: 'option 1', label: 'Brand' },
  //   { value: 'influencer', label: 'Influencer' },
  //   { value: 'customer', label: 'Customer' },
  // ];

  return (
    <Stack className="abhi" py="25px" justifyContent="center" mx="10%" display="flex" fullWidth>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack container spacing={3}>
          <Card sx={{ p: 2 }}>
            <Box
              rowGap={3}
              columnGap={1}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="name" label="Full Name" />
              <RHFTextField name="email" label="Email Address" />
              <RHFTextField name="userName" label="Username" />
              <RHFTextField name="password" label="Password" />
              <RHFTextField name="contactNo" label="Phone Number" />
              {/* <RHFTextField name="state" label="State/Region" />
              <RHFTextField name="city" label="City" />
              <RHFTextField name="address" label="Address" />
              <RHFTextField name="zipCode" label="Zip/Code" /> */}
              {/* <RHFTextField name="company" label="Company" /> */}
              {/* <RHFSelect name="singleSelect" label="Role"> */}
                {/* <Divider sx={{ borderStyle: 'dashed' }} /> */}
                {/* {OPTIONS.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.label}
                    onClick={() => {
                      handelOptionValue(option.value);
                    }}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </RHFSelect> */}
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
                style={{ background: '#00e9e7' }}
              >
                Create User
              </LoadingButton>
            </Stack>
          </Card>
        </Stack>
      </FormProvider>
    </Stack>
  );
};

export default RegistrationForm;
