import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
// hooks
// utils
// assets
// components
import { useGetUserMe } from 'src/api/user';
import FormProvider, { RHFUpload } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import axiosInstance from 'src/utils/axios';
import { fData } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function AccountGallery() {
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useGetUserMe();

  const defaultValues = {
    images: user?.userProfile?.gallery.fileUrl || {},
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      let fileUrl;
      let fileName;

      // Check if data?.fileUrl is a string (assume it's a URL)
      if (typeof data?.images === 'string') {
        // If it's a string, use it directly without file upload
        fileUrl = data?.images;
        fileName = 'Directly-Provided-Image';
      } else {
        // If it's not a string, perform the file upload
        const formData = new FormData();
        formData.append('file', data?.images);

        // Send FormData to the server
        const response = await axiosInstance.post(`/files`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Extract file information from the response
        const fileData = response?.data?.files?.[0];
        fileUrl = fileData?.fileUrl;
        fileName = fileData?.fileName;
      }

      // Build inputData
      const combinedGallery = {
        fileUrl,
        fileName,
      };

      const inputData = {
        userProfile: {
          gallery: combinedGallery,
        },
      };

      // Update user profile with the new file information
      await axiosInstance.patch(`/api/users/${user.id}`, inputData);

      // Show success notification
      enqueueSnackbar('Gallery updated successfully!', { variant: 'success' });
    } catch (error) {
      // Show error notification
      enqueueSnackbar('There was an error while updating gallery', { variant: 'error' });
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
        setValue('images', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          {/* <Typography variant="h6">Gallery</Typography> */}
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(1, 1fr)',
              }}
            >
              <RHFUpload
                thumbnail
                name="images"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Box
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Allowed *.jpeg, *.jpg max size of {fData(3145728)}
                  </Box>
                }
              />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save Gallery
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
