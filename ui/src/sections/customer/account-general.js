import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
// hooks
// utils
import { fData } from 'src/utils/format-number';
// assets
// components
import { CardHeader } from '@mui/material';
import FormProvider, { RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import axiosInstance from 'src/utils/axios';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountGeneral({ user }) {
  const { enqueueSnackbar } = useSnackbar();

  const mdUp = false;

  const UpdateUserSchema = Yup.object().shape({
    displayName: Yup.string().required('Name is required'),
    contactNo: Yup.number().required('Phone number is required'),
    fileUrl: Yup.mixed().nullable().required('Avatar is required'),
    // not required
    isPublic: Yup.boolean(),
    bio: Yup.string(),
  });

  const defaultValues = {
    displayName: user?.displayName || '',
    contactNo: user?.contactNo ? String(user.contactNo) : '',
    bio: user?.userProfile?.bio || '',
    fileName: user?.userProfile?.avatar?.fileName || null,
    fileUrl: user?.userProfile?.avatar?.fileUrl || null,
    title: user?.userProfile?.address?.title || '',
    country: user?.userProfile?.address?.country || '',
    city: user?.userProfile?.address?.city || '',
    state: user?.userProfile?.address?.state || '',
    zip: user?.userProfile?.address?.zip || '',
    streetAddress: user?.userProfile?.address?.streetAddress || '',
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      let response;

      // Check if data?.fileUrl is a string (assume it's a URL)
      if (typeof data?.fileUrl === 'string') {
        // If it's a string, use it directly without file upload
        response = { data: { files: [{ fileUrl: data?.fileUrl }] } };
      } else {
        // If it's not a string, perform the file upload
        const formData = new FormData();
        formData.append('file', data?.fileUrl);

        // Send FormData to the server
        response = await axiosInstance.post(`/files`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      // Build inputData
      const inputData = {
        user: {
          name: data?.displayName,
          contactNo: String(data?.contactNo),
        },
        userProfile: {
          avatar: {
            fileName: response?.data?.files?.[0]?.fileName || data?.fileName,
            fileUrl: response?.data?.files?.[0]?.fileUrl || data?.fileUrl,
          },
          bio: data?.bio,
        },
      };

      // Update user profile
      await axiosInstance.patch(`/api/users/${user.id}`, inputData);

      // Show success notification
      enqueueSnackbar('Profile updated successfully!', { variant: 'success' });
    } catch (error) {
      // Show error notification
      enqueueSnackbar('There was an error while updating profile', { variant: 'error' });
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('fileUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );
  useEffect(() => {
    // Set default values using setValue
    setValue('displayName', user?.displayName);
    setValue('contactNo', user?.contactNo ? String(user.contactNo) : '');
    setValue('fileUrl', user?.userProfile?.avatar?.fileUrl);
    console.log('all reset');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 8, pb: 5, px: 3, textAlign: 'center' }}>
            <RHFUploadAvatar
              name="fileUrl"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 3,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.disabled',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={
                {
                  // xs: 'repeat(1, 1fr)',
                  // sm: 'repeat(2, 1fr)',
                }
              }
            >
              <Card>
                <CardHeader title="Information" />
                <Stack spacing={3} sx={{ p: 3 }}>
                  <RHFTextField name="displayName" label="Name" />
                  <RHFTextField name="contactNo" label="Contact Number" type="number" />
                  <RHFTextField name="bio" multiline rows={4} label="Bio" />
                </Stack>
              </Card>
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save Profile
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
AccountGeneral.propTypes = {
  user: PropTypes.any,
};
