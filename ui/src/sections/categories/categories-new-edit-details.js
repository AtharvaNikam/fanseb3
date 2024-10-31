import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, CardHeader, Grid, MenuItem, Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetCategories } from 'src/api/categories';
import { RHFSelect, RHFTextField, RHFUpload } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { useSettingsContext } from 'src/components/settings';
import { useResponsive } from 'src/hooks/use-responsive';
import { useParams, useRouter } from 'src/routes/hook';
import axiosInstance from 'src/utils/axios';
import * as Yup from 'yup';

// ----------------------------------------------------------------------

export default function CategoriesNewEditDetails({ currentCategory }) {
  console.log(currentCategory);
  const { enqueueSnackbar } = useSnackbar();

  const params = useParams();

  const { category } = useGetCategories();

  const catData = category;

  const settings = useSettingsContext();

  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const [catOptions, setCatOptions] = useState([]);

  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    details: Yup.string().required('Details required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentCategory?.name || '',
      details: currentCategory?.details || '',
      image: currentCategory?.image || '',
      categoryId: currentCategory?.categoryId || '',
    }),
    [currentCategory]
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
    console.log(data);
    try {
      let response;

      // Check if data?.fileUrl is a string (assume it's a URL)
      if (typeof data?.image === 'string') {
        // If it's a string, use it directly without file upload
        response = { data: { files: [{ images: data?.image }] } };
      } else {
        // If it's not a string, perform the file upload
        const formData = new FormData();
        formData.append('file', data?.image);

        // Send FormData to the server
        response = await axiosInstance.post(`/files`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      // Build inputData
      const inputData =
        data?.categoryId !== null
          ? {
              image: response?.data?.files?.[0]?.fileUrl || data?.image,
              name: data?.name,
              details: data?.details,
              categoryId: data?.categoryId,
            }
          : {
              image: response?.data?.files?.[0]?.fileUrl || data?.image,
              name: data?.name,
              details: data?.details,
            };

      // Update user profile
      const { id } = params;
      if (currentCategory) {
        await axiosInstance.patch(`/api/categories/${id}`, inputData);
        // Show success notification
        enqueueSnackbar('Category Updated successfully!', { variant: 'success' });
        router.push('/admin-dashboard/categories/list');
      } else {
        await axiosInstance.post(`/api/categories`, inputData);
        // Show success notification
        enqueueSnackbar('Category created successfully!', { variant: 'success' });
        router.push('/admin-dashboard/categories/list');
      }
    } catch (error) {
      // Show error notification
      enqueueSnackbar('There was an error', { variant: 'error' });
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
        setValue('image', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  useEffect(() => {
    if (currentCategory) {
      reset(defaultValues);
    }
  }, [currentCategory, defaultValues, reset]);

  useEffect(() => {
    const fetchData = async () => {
      function extractCategoryInfo(obj, result, idSet) {
        if (obj && typeof obj === 'object') {
          if (
            Object.prototype.hasOwnProperty.call(obj, 'id') &&
            Object.prototype.hasOwnProperty.call(obj, 'name')
          ) {
            const { id, name } = obj;
            if (!idSet.has(id)) {
              idSet.add(id);
              result.push({ id, name });
            }
          }

          if (
            Object.prototype.hasOwnProperty.call(obj, 'children') &&
            Array.isArray(obj.children)
          ) {
            obj.children.forEach((child) => {
              extractCategoryInfo(child, result, idSet);
            });
          }
        }
      }

      const extractedInfo = [];
      const idSet = new Set();

      catData.forEach((item) => {
        extractCategoryInfo(item, extractedInfo, idSet);
      });

      setCatOptions(extractedInfo);
    };
    fetchData();
  }, [catData]);

  const renderDetails = (
    <>
      {mdUp && (
        <Grid item md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Details
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Name, details, image...
          </Typography>
        </Grid>
      )}

      <Grid item xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField name="name" label="Name" />

            <RHFTextField name="details" label="Details" multiline rows={4} />

            <RHFSelect name="categoryId" label="Parent Category">
              {catOptions.map((status) => (
                <MenuItem key={status.id} value={status.id}>
                  {status.name}
                </MenuItem>
              ))}
            </RHFSelect>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Image</Typography>
              <RHFUpload
                name="image"
                thumbnail
                maxSize={3145728}
                onDrop={handleDrop}
                // helperText={
                //   <Typography
                //     variant="caption"
                //     sx={{
                //       mt: 3,
                //       mx: 'auto',
                //       display: 'block',
                //       textAlign: 'center',
                //       color: 'text.disabled',
                //     }}
                //   >
                //     Allowed *.jpeg, *.jpg, *.png
                //     <br /> max size of {fData(3145728)}
                //   </Typography>
                // }
              />
            </Stack>
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
          {!currentCategory ? 'Create Category' : 'Save Changes'}
        </LoadingButton>
      </Grid>
    </>
  );
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      {/* <CustomBreadcrumbs
        heading="Profile Settings"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'User', href: paths.dashboard.user.root },
          { name: 'Profile' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      /> */}

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          {renderDetails}
          {renderActions}
        </Grid>
      </FormProvider>
    </Container>
  );
}
CategoriesNewEditDetails.propTypes = {
  currentCategory: PropTypes.object,
};
