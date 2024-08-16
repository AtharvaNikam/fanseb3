import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, CardHeader, Chip, Grid, Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useGetPublicProducts } from 'src/api/products';
import { RHFAutocomplete, RHFTextField, RHFUpload, RHFUploadBox } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { useSettingsContext } from 'src/components/settings';
import { useResponsive } from 'src/hooks/use-responsive';
import { useParams, useRouter } from 'src/routes/hook';
import axiosInstance from 'src/utils/axios';
import * as Yup from 'yup';

// ----------------------------------------------------------------currentReel------

export default function ReelsNewEditDetails({ currentReel }) {
  const mdUp = useResponsive('up', 'md');

  const params = useParams();

  const settings = useSettingsContext();

  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const { products: productsOptions } = useGetPublicProducts();
  const filteredProducts = productsOptions?.filter((product) => product?.status === true);

  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    reelLink: Yup.mixed().nullable().required('Reel is required'),
    thumbnail: Yup.mixed().nullable().required('Thumbnail is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentReel?.name || '',
      thumbnail: currentReel?.thumbnail?.fileUrl || '',
      reelLink: currentReel?.reelLink?.fileUrl || '',
      products: currentReel?.products,
    }),
    [currentReel]
  );

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      // Build inputData
      console.log(data);

      const inputData = {
        reelLink: data?.reelLink ? { fileUrl: data.reelLink } : null,
        thumbnail: data?.thumbnail ? { fileUrl: data.thumbnail } : null,
        videoDuration: data?.videoDuration || '0',
        name: data?.name,
        products: data?.products ? data?.products.map((res) => res.id) : [],
      };
      console.log(inputData);

      // Update user profile
      const { id } = params;
      if (currentReel) {
        await axiosInstance.patch(`/users/reels/${id}`, inputData);
        // Show success notification
        enqueueSnackbar('Reel updated successfully!', { variant: 'success' });
        router.push('/influencer-dashboard/reels');
      } else {
        await axiosInstance.post(`/users/reels`, inputData);
        // Show success notification
        enqueueSnackbar('Reel added successfully!', { variant: 'success' });
        router.push('/influencer-dashboard/reels');
      }
    } catch (error) {
      // Show error notification
      enqueueSnackbar('Unexpected error encountered', { variant: 'error' });
      console.error(error);
    }
  });

  const value = watch();

  console.log(value);

  const handleDropProfilePicture = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      // If it's not a string, perform the file upload
      const formData = new FormData();
      formData.append('file', newFile);

      // Send FormData to the server
      const res = await axiosInstance.post(`/files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (file) {
        setValue('reelLink', res?.data?.files?.[0]?.fileUrl, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleDropThumbnail = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      // If it's not a string, perform the file upload
      const formData = new FormData();
      formData.append('file', newFile);

      // Send FormData to the server
      const res = await axiosInstance.post(`/files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (file) {
        setValue('thumbnail', res?.data?.files?.[0]?.fileUrl, { shouldValidate: true });
      }
    },
    [setValue]
  );

  useEffect(() => {
    if (currentReel) {
      reset(defaultValues);
    }
  }, [currentReel, defaultValues, productsOptions, reset]);

  const renderProfilePicture = (
    <>
      {mdUp && (
        <Grid item md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Video
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Upload your video here
          </Typography>
        </Grid>
      )}

      <Grid item xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack spacing={1.5}>
              <RHFUploadBox name="reelLink" thumbnail onDrop={handleDropProfilePicture} />
              {currentReel?.reelLink?.fileUrl || value?.reelLink ? (
                <video src={`${value.reelLink}`} width="100%" height="400" controls>
                  <track kind="captions" src="captions.vtt" label="English" />
                </video>
              ) : null}
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </>
  );
  const renderThumbnail = (
    <>
      {mdUp && (
        <Grid item md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Thumbnail image
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Upload your thumbnail image here
          </Typography>
        </Grid>
      )}

      <Grid item xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack spacing={1.5}>
              <RHFUpload
                name="thumbnail"
                thumbnail
                maxSize={3145728}
                onDrop={handleDropThumbnail}
              />
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </>
  );
  const renderDetails = (
    <>
      {mdUp && (
        <Grid item md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Description
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Add Reel Embed URL from here.
          </Typography>
        </Grid>
      )}

      <Grid item xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField name="name" label="Name" />
          </Stack>
        </Card>
      </Grid>
    </>
  );
  const renderProducts = (
    <>
      {mdUp && (
        <Grid item md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Products
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Select Products from here
          </Typography>
        </Grid>
      )}

      <Grid item xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            {filteredProducts && (
              <RHFAutocomplete
                name="products"
                label="Products"
                fullWidth
                multiple
                options={filteredProducts}
                value={value.products || []}
                getOptionLabel={(option) => `${option.name}`}
                isOptionEqualToValue={(option, selected) => option.id === selected.id}
                renderOption={(props, option) => {
                  const { name, id } = filteredProducts.filter((pin) => pin.id === option.id)[0];

                  if (!name) {
                    return null;
                  }

                  return (
                    <li {...props} key={id}>
                      {name}
                    </li>
                  );
                }}
                renderTags={(selected, getTagProps) =>
                  selected.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      key={option.id}
                      label={option.name}
                      size="small"
                      variant="soft"
                      color="primary"
                    />
                  ))
                }
              />
            )}
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderActions = (
    <>
      {mdUp && <Grid item md={4} />}
      <Grid item xs={12} md={8} display="flex" justifyContent="flex-end" p={2}>
        <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
          {!currentReel ? 'Add Reel' : 'Save Changes'}
        </LoadingButton>
      </Grid>
    </>
  );
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          {renderDetails}
          {renderProfilePicture}
          {renderThumbnail}
          {renderProducts}
          {renderActions}
        </Grid>
      </FormProvider>
    </Container>
  );
}
ReelsNewEditDetails.propTypes = {
  currentReel: PropTypes.object,
};
