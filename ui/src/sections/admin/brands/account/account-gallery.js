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

// ----------------------------------------------------------------------

export default function AccountGallery() {
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useGetUserMe();

  const defaultValues = {
    images: user?.userProfile?.gallery || [],
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const values = watch();
  const onSubmit = handleSubmit(async (data) => {
    const fileUrls = data?.images || [];

    const stringUrls = fileUrls.filter((item) => typeof item === 'string');
    const objectUrls = fileUrls.filter((item) => typeof item === 'object');

    const formData = new FormData();

    // Append each file URL to the FormData object
    objectUrls.forEach((fileUrl, index) => {
      formData.append(`file${index}`, fileUrl);
    });

    try {
      // Send the FormData to the server
      const response = await axiosInstance.post(`/files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Extract file information from the response
      const filesInfo = response?.data?.files || [];

      // Build inputData
      const combinedGallery = [...stringUrls, ...filesInfo.map((file) => file.fileUrl)];
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
      const files = values.images || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('images', [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, values.images]
  );

  const handleRemoveFile = useCallback(
    (inputFile) => {
      const filtered = values.images && values.images?.filter((file) => file !== inputFile);
      setValue('images', filtered);
    },
    [setValue, values.images]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue('images', []);
  }, [setValue]);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          {/* <Card sx={{ pt: 10, pb: 5, px: 3, textAlign: 'center' }}> */}
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
                multiple
                thumbnail
                name="images"
                maxSize={3145728}
                onDrop={handleDrop}
                onRemove={handleRemoveFile}
                onRemoveAll={handleRemoveAllFiles}
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
