import { useForm } from 'react-hook-form';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
// components
import { useGetUserMe } from 'src/api/user';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import axiosInstance from 'src/utils/axios';

// ----------------------------------------------------------------------

export default function AccountSocialLinks() {
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useGetUserMe();

  const socialLinks = user?.userProfile?.socials || {};
  const defaultValues = {
    website: socialLinks?.website,
    facebook: socialLinks?.facebook,
    instagram: socialLinks?.instagram,
    youtube: socialLinks?.youtube,
    twitter: socialLinks?.twitter,
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const inputData = {
        userProfile: {
          socials: data,
        },
      };

      await axiosInstance.patch(`/api/users/${user.id}`, inputData);

      enqueueSnackbar('SocialLinks updated successfully!');
    } catch (error) {
      enqueueSnackbar('There was an error while updating SocialLinks', {
        variant: 'error',
      });
      console.error(error);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack component={Card} spacing={3} sx={{ p: 3 }}>
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
        <LoadingButton type="submit" variant="contained" loading={isSubmitting} sx={{ ml: 'auto' }}>
          Save Changes
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
