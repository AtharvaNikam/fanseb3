import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, CardHeader, Grid, InputAdornment, Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useGetUserMe } from 'src/api/user';
import { RHFTextField, RHFUpload, RHFUploadAvatar } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import { useResponsive } from 'src/hooks/use-responsive';
import { useParams, useRouter } from 'src/routes/hook';
import axiosInstance from 'src/utils/axios';
import { fData } from 'src/utils/format-number';
import * as Yup from 'yup';

// ----------------------------------------------------------------------

export default function BrandsNewEditDetails({ currentBrand }) {
  const { enqueueSnackbar } = useSnackbar();

  const params = useParams();

  const { user } = useGetUserMe();

  const settings = useSettingsContext();

  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    country: Yup.string().required('Country is required'),
    city: Yup.string().required('City is required'),
    zip: Yup.number().required('Zip is required'),
    streetAddress: Yup.string().required('Street Address is required'),
    accountHolderName: Yup.string().required('Account Holder Name is required'),
    accountHolderEmail: Yup.string()
      .required('Account Holder Email is required')
      .email('Email must be a valid email address'),
    accountHolderContactNo: Yup.number().required('Contact Number is required'),
    bankName: Yup.string().required('Bank Name is required'),
    accountNumber: Yup.number().required('Account Number is required'),
    profileImg: Yup.mixed().nullable().required('Profile Image is required'),
    coverImage: Yup.mixed().nullable().required('Cover Image is required'),
    // not required
    isActive: Yup.boolean(),
    website: Yup.string(),
    facebook: Yup.string(),
    instagram: Yup.string(),
    youtube: Yup.string(),
    twitter: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentBrand?.name || '',
      description: currentBrand?.description || '',
      country: currentBrand?.address?.country || '',
      city: currentBrand?.address?.city || '',
      zip: currentBrand?.address?.zip,
      streetAddress: currentBrand?.address?.streetAddress || '',
      accountHolderName: currentBrand?.paymentInfo?.accountHolderName || '',
      accountHolderEmail: currentBrand?.paymentInfo?.accountHolderEmail || '',
      accountHolderContactNo: currentBrand?.paymentInfo?.accountHolderContactNo,
      bankName: currentBrand?.paymentInfo?.bankName || '',
      accountNumber: currentBrand?.paymentInfo?.accountNumber,
      website: currentBrand?.socials?.website || '',
      facebook: currentBrand?.socials?.facebook || '',
      instagram: currentBrand?.socials?.instagram || '',
      youtube: currentBrand?.socials?.youtube || '',
      twitter: currentBrand?.socials?.twitter || '',
      profileImg: currentBrand?.profileImg || '',
      coverImage: currentBrand?.coverImage || '',
      isActive: currentBrand?.isActive || false,
    }),
    [currentBrand]
  );

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;



  const onSubmit = handleSubmit(async (data) => {
    try {
      let resProfileImg;

      // Check if data?.fileUrl is a string (assume it's a URL)
      if (typeof data?.profileImg === 'string') {
        // If it's a string, use it directly without file upload
        resProfileImg = { data: { files: [{ images: data?.profileImg }] } };
      } else {
        // If it's not a string, perform the file upload
        const formData = new FormData();
        formData.append('file', data?.profileImg);

        // Send FormData to the server
        resProfileImg = await axiosInstance.post(`/files`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      let resCoverImage;
      // Check if data?.fileUrl is a string (assume it's a URL)
      if (typeof data?.coverImage === 'string') {
        // If it's a string, use it directly without file upload
        resCoverImage = { data: { files: [{ images: data?.coverImage }] } };
      } else {
        // If it's not a string, perform the file upload
        const formData = new FormData();
        formData.append('file', data?.coverImage);

        // Send FormData to the server
        resCoverImage = await axiosInstance.post(`/files`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      // Build inputData
      const inputData = {
        profileImg: resProfileImg?.data?.files?.[0]?.fileUrl || data?.profileImg,
        name: data?.name,
        description: data?.description,
        isActive: data?.isActive || false,
        address: {
          country: data?.country,
          city: data?.city,
          zip: data?.zip,
          streetAddress: data?.streetAddress,
        },
        paymentInfo: {
          accountHolderName: data?.accountHolderName,
          accountHolderEmail: data?.accountHolderEmail,
          accountHolderContactNo: data?.accountHolderContactNo,
          bankName: data?.bankName,
          accountNumber: data?.accountNumber,
        },
        socials: {
          website: data?.website,
          facebook: data?.facebook,
          instagram: data?.instagram,
          youtube: data?.youtube,
          twitter: data?.twitter,
        },
        coverImage: resCoverImage?.data?.files?.[0]?.fileUrl || data?.coverImage,
      };

      // Update user profile
      const { id } = params;
      if (currentBrand) {
        await axiosInstance.patch(`/api/brands/${id}`, inputData);
        // Show success notification
        enqueueSnackbar('Brand Updated successfully!', { variant: 'success' });
        router.push('/brand-dashboard/brands');
      } else {
        await axiosInstance.post(`/api/brands`, inputData);
        // Show success notification
        enqueueSnackbar('Brand created successfully!', { variant: 'success' });
        router.push('/brand-dashboard/brands');
      }
    } catch (error) {
      // Show error notification
      enqueueSnackbar('Unexpected error encountered', { variant: 'error' });
      console.error(error);
    }
  });

  const handleDropProfilePicture = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('profileImg', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );
  const handleDropCoverImage = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('coverImage', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const renderProfilePicture = (
    <>
      {mdUp && (
        <Grid item md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Profile Picture
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Upload your Brand profile picture from here
          </Typography>
        </Grid>
      )}

      <Grid item xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack spacing={1.5}>
              <RHFUploadAvatar
                name="profileImg"
                thumbnail
                maxSize={3145728}
                onDrop={handleDropProfilePicture}
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
                    Allowed *.jpeg, *.jpg, *.png
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </>
  );
  const renderCoverImage = (
    <>
      {mdUp && (
        <Grid item md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Cover Image
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Upload your Brand cover image from here Dimension of the cover image should be
            <b> 1519 x 564px</b>
          </Typography>
        </Grid>
      )}

      <Grid item xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack spacing={1.5}>
              <RHFUpload
                name="coverImage"
                thumbnail
                maxSize={3145728}
                onDrop={handleDropCoverImage}
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
            Basic Info
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Add some basic info about your shop from here
          </Typography>
        </Grid>
      )}

      <Grid item xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField name="name" label="Name" />

            <RHFTextField name="description" label="Description" multiline rows={4} />
          </Stack>
        </Card>
      </Grid>
    </>
  );
  const renderPaymentInfo = (
    <>
      {mdUp && (
        <Grid item md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Payment Info
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Add your payment information from here
          </Typography>
        </Grid>
      )}

      <Grid item xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Pricing" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField name="accountHolderName" label="Account Holder Name" />

            <RHFTextField name="accountHolderEmail" label="Account Holder Email" />

            <RHFTextField name="accountHolderContactNo" label="Contact Number" />

            <RHFTextField name="bankName" label="Bank Name" />

            <RHFTextField name="accountNumber" label="Account Number" />
          </Stack>
        </Card>
      </Grid>
    </>
  );
  const renderAddress = (
    <>
      {mdUp && (
        <Grid item md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Address
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Add your physical address here
          </Typography>
        </Grid>
      )}

      <Grid item xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Pricing" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField name="country" label="Country" />

            <RHFTextField name="city" label="City" />

            <RHFTextField name="zip" label="Zip" />

            <RHFTextField name="streetAddress" label="Street Address" multiline rows={4} />
          </Stack>
        </Card>
      </Grid>
    </>
  );
  const renderSocial = (
    <>
      {mdUp && (
        <Grid item md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Other Details
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Add your Social information from here
          </Typography>
        </Grid>
      )}

      <Grid item xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Pricing" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField name="website" label="Website" />

            <RHFTextField
              label="facebook"
              name="facebook"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify width={24} icon="eva:facebook-fill" color="#1877F2" />
                  </InputAdornment>
                ),
              }}
            />
            <RHFTextField
              label="instagram"
              name="instagram"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify width={24} icon="ant-design:instagram-filled" color="#DF3E30" />
                  </InputAdornment>
                ),
              }}
            />
            <RHFTextField
              label="youtube"
              name="youtube"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify width={24} icon="ant-design:youtube-filled" color="#FF0000" />
                  </InputAdornment>
                ),
              }}
            />
            <RHFTextField
              label="twitter"
              name="twitter"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify width={24} icon="eva:twitter-fill" color="#1C9CEA" />
                  </InputAdornment>
                ),
              }}
            />
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
          {!currentBrand ? 'Create Brand' : 'Save Changes'}
        </LoadingButton>
      </Grid>
    </>
  );
  
  useEffect(() => {
    if (currentBrand) {
      reset(defaultValues);
    }
  }, [currentBrand, defaultValues, reset]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          {renderProfilePicture}
          {renderCoverImage}
          {renderDetails}
          {renderPaymentInfo}
          {renderAddress}
          {renderSocial}
          {renderActions}
        </Grid>
      </FormProvider>
    </Container>
  );
}
BrandsNewEditDetails.propTypes = {
  currentBrand: PropTypes.object,
};
