import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Autocomplete,
  Card,
  CardHeader,
  Chip,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useGetCategories } from 'src/api/categories';
import { useGetUserMe } from 'src/api/user';
import { RHFTextField, RHFUpload, RHFUploadAvatar, RHFUploadBox } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { useSettingsContext } from 'src/components/settings';
import { useResponsive } from 'src/hooks/use-responsive';
import { useParams, useRouter } from 'src/routes/hook';
import axiosInstance from 'src/utils/axios';
import { fData } from 'src/utils/format-number';
import * as Yup from 'yup';

// ----------------------------------------------------------------------

export default function ProductsNewEditDetails({ currentProduct }) {
  const { enqueueSnackbar } = useSnackbar();

  const params = useParams();

  const { user } = useGetUserMe();
  const { category } = useGetCategories();
  const catData = category;

  const settings = useSettingsContext();

  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const [catOptions, setCatOptions] = useState([]);
  const [selectedParent, setSelectedParent] = useState(currentProduct?.categories || []);

  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    unit: Yup.string().required('Unit is required'),
    price: Yup.number().required('Price is required'),
    qty: Yup.number().required('Quantity is required'),
    sku: Yup.string().required('SKU is required'),
    // featuredImage: Yup.mixed().nullable().required('Profile Image is required'),
    // galleryImage: Yup.mixed().nullable().required('Cover Image is required'),
    // // not required
    sellPrice: Yup.string(),
    description: Yup.string(),
    categories: Yup.array(),
  });

  const defaultValues = useMemo(
    () => ({
      featuredImage: currentProduct?.image?.fileUrl || '',
      galleryImage: currentProduct?.gallery?.map((res) => res?.fileUrl) || '',
      name: currentProduct?.name || '',
      unit: currentProduct?.unit || '',
      description: currentProduct?.description || '',
      price: currentProduct?.price,
      salePrice: currentProduct?.sale_price,
      minPrice:currentProduct?.min_price,
      maxPrice: currentProduct?.max_price,
      qty: currentProduct?.quantity,
      sku: currentProduct?.sku,
      width: currentProduct?.width,
      height: currentProduct?.height,
      length: currentProduct?.length,
      productType: currentProduct?.productType || '',
      digitalFile: currentProduct?.digitalFile || '',
      categories: currentProduct?.categories || [],
    }),
    [currentProduct]
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
  const values = watch();

  console.log(values);

  const onSubmit = handleSubmit(async (data) => {
    console.log('🚀 ~ data:', data);
    try {
      // Build inputData
      const inputData = {
        name: data.name,
        description: data.description,
        price: data.price,
        sale_price: data.salePrice,
        min_price: data.minPrice,
        max_price: data.maxPrice,
        sku: data.sku,
        quantity: data.qty,
        inStock: true,
        isTaxable: true,
        status: false,
        product_type: 'Simple',
        unit: data.unit,
        height: data.height,
        width: data.width,
        length: data.length,
        image: { fileUrl: data.featuredImage },
        video: { fileUrl: data.video },
        gallery: data.galleryImage.map((item) => ({ fileUrl: item })),
        categories : data.categories,
      };

      // Update user profile
      const { id } = params;
      const { id_p } = params;

      if (currentProduct) {
        await axiosInstance.patch(`/brands/${id}/products?where[id]=${id_p}`, inputData);
        // Show success notification
        enqueueSnackbar('Product Updated successfully!', { variant: 'success' });
        router.push(`/brand-dashboard/brands/${id}/products`);
      } else {
        await axiosInstance.post(`/brands/${id}/products`, inputData);
        // Show success notification
        enqueueSnackbar('Product added successfully!', { variant: 'success' });
        router.push(`/brand-dashboard/brands/${id}/products`);
      }
    } catch (error) {
      // Show error notification
      enqueueSnackbar('Unexpected error encountered', { variant: 'error' });
      console.error(error);
    }
  });

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
        setValue('featuredImage', res?.data?.files?.[0]?.fileUrl, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleDropCoverImage = useCallback(
    async (acceptedFiles) => {
      const files = values.galleryImage || [];

      const newFiles = [...acceptedFiles];

      // Create FormData object
      const formData = new FormData();

      // Iterate through accepted files
      newFiles.forEach((file, index) => {
        // Add each file to FormData with a unique key
        formData.append(
          `file-${index}`,
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      });

      // Send FormData to the server
      const res = await axiosInstance.post(`/files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('🚀 ~ res:', res);

      // Get the array of file URLs from the response
      const fileUrls = [];
      res?.data?.files.map((file) => fileUrls.push(file.fileUrl));
      console.log('🚀 ~ fileUrls:', fileUrls);

      // Update the state or values with the array of file URLs
      if (fileUrls.length > 0) {
        setValue('galleryImage', [...files, ...fileUrls], { shouldValidate: true });
      }
    },
    [setValue, values.galleryImage]
  );

  const handleDropProductVideo = useCallback(
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
        setValue('video', res?.data?.files?.[0]?.fileUrl, { shouldValidate: true });
      }
    },
    [setValue]
  );
  const renderFeaturedImage = (
    <>
      {mdUp && (
        <Grid item md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Featured Image*
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Upload your product featured image here
          </Typography>
        </Grid>
      )}

      <Grid item xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Featured Image" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack spacing={1.5}>
              <RHFUploadAvatar
                name="featuredImage"
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
  const renderGallery = (
    <>
      {mdUp && (
        <Grid item md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Brand Gallery*
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Upload your product Brand gallery here
          </Typography>
        </Grid>
      )}

      <Grid item xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Brand Gallery" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack spacing={1.5}>
              <RHFUpload
                name="galleryImage"
                thumbnail
                multiple
                maxSize={3145728}
                onDrop={handleDropCoverImage}
                onRemove={(inputFile) =>
                  setValue(
                    'galleryImage',
                    values.galleryImage &&
                      values.galleryImage?.filter((file) => file !== inputFile),
                    { shouldValidate: true }
                  )
                }
                onRemoveAll={() => setValue('galleryImage', [], { shouldValidate: true })}
              />
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </>
  );
  const renderVideoUpload = (
    <>
      {mdUp && (
        <Grid item md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Brand Video
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Upload your video here
          </Typography>
        </Grid>
      )}

      <Grid item xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Brand Video" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack className="testttt" alignItems="center" spacing={1.5}>
              <RHFUploadBox name="video" thumbnail onDrop={handleDropProductVideo} />
              {currentProduct?.video?.fileUrl || values?.video ? (
                <video
                  autoPlay
                  src={
                    currentProduct?.video?.fileUrl
                      ? currentProduct?.video?.fileUrl
                      : `${values.video}`
                  }
                  width="auto"
                  height="400"
                  style={{ padding: 10, borderRadius: 20 }}
                  controls
                >
                  <track kind="captions" src="captions.vtt" label="English" />
                </video>
              ) : (
                <Typography variant="caption" sx={{ color: 'text.secondary', padding: 2 }}>
                  Upload your video here
                </Typography>
              )}
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </>
  );
  const renderGroupCategories = (
    <>
      {mdUp && (
        <Grid item md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Group & Categories
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Select product group and categories from here
          </Typography>
        </Grid>
      )}

      <Grid item xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Group & Categories" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            {catOptions && (
              <Controller
              name="categories"
              control={methods.control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  fullWidth
                  multiple
                  limitTags={3}
                  label="Categories"
                  clearOnEscape
                  value={selectedParent} // Bind selectedParent directly as the value
                  onChange={(event, newInputValue) => {
                    setSelectedParent(newInputValue); // Store the selected category objects directly
                    field.onChange(newInputValue); // Update form state with selected categories
                  }}
                  options={catOptions || []} // Provide category options
                  getOptionLabel={(option) => option.name} // Display the name of each category
                  isOptionEqualToValue={(option, value) => option.id === value.id} // Compare by ID
                  renderInput={(params) => (
                    <TextField {...params} label="Categories" placeholder="Categories" />
                  )}
                  renderTags={(selected, getTagProps) =>
                    selected.map((option, index) => (
                      <Chip
                        {...getTagProps({ index })}
                        key={option.id} // Use unique ID
                        label={option.name}
                        size="small"
                        variant="soft"
                        color="primary"
                      />
                    ))
                  }
                />
              )}
            />
                     
            )}
          </Stack>
        </Card>
      </Grid>
    </>
  );
  const renderDescription = (
    <>
      {mdUp && (
        <Grid item md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Description
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Add your product description and necessary information from here
          </Typography>
        </Grid>
      )}

      <Grid item xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Description" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField name="name" label="Name*" />

            <RHFTextField name="unit" label="Unit*" />

            <RHFTextField name="description" label="Description" multiline rows={4} />
          </Stack>
        </Card>
      </Grid>
    </>
  );
  const renderProductInformation = (
    <>
      {mdUp && (
        <Grid item md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Simple Product
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Information Add your simple product description and necessary information from here
          </Typography>
        </Grid>
      )}

      <Grid item xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Simple Product" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField name="price" label="Price*" type="number" />
            <RHFTextField name="salePrice" label="Sale Price" type="number" />
            <RHFTextField name="minPrice" label="Min Price" type="number" />
            <RHFTextField name="maxPrice" label="Max Price" type="number" />
            <RHFTextField name="qty" label="Quantity*" type="number" />
            <RHFTextField name="sku" label="SKU*" />

            <RHFTextField name="width" label="Width" />

            <RHFTextField name="height" label="Height" />

            <RHFTextField name="length" label="Length" />
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
          {!currentProduct ? 'Add Product' : 'Save Changes'}
        </LoadingButton>
      </Grid>
    </>
  );

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

  useEffect(() => {
    if (currentProduct) {
      reset(defaultValues);
    }
  }, [currentProduct, defaultValues, reset]);
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          {renderFeaturedImage}
          {renderGallery}
          {renderVideoUpload}
          {renderGroupCategories}
          {renderDescription}
          {renderProductInformation}
          {renderActions}
        </Grid>
      </FormProvider>
    </Container>
  );
}
ProductsNewEditDetails.propTypes = {
  currentProduct: PropTypes.object,
};
