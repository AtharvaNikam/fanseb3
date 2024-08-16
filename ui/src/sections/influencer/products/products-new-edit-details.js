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
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useGetBrands } from 'src/api/brands';
import { useAuthContext } from 'src/auth/hooks';
import { RHFUpload } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { useSettingsContext } from 'src/components/settings';
import { useResponsive } from 'src/hooks/use-responsive';
import { useRouter } from 'src/routes/hook';
import axiosInstance from 'src/utils/axios';
import { fData } from 'src/utils/format-number';
import * as Yup from 'yup';

// ----------------------------------------------------------------------
const productGalleryTypeOptions = [
  { value: 'collection', name: 'Collection' },
  { value: 'product', name: 'Product' },
];
// ----------------------------------------------------------------------

export default function ProductsNewEditDetails({ currentProduct }) {
  const { enqueueSnackbar } = useSnackbar();

  const settings = useSettingsContext();

  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const [productsOptions, setProductsOptions] = useState([]);

  const [selectedGalleryType, setSelectedGalleryType] = useState([]);

  const [selectedProducts, setSelectedProducts] = useState([]);

  const { user } = useAuthContext();

  const { brands } = useGetBrands(user.id);

  const UpdateUserSchema = Yup.object().shape({
    // selectedGalleryType: Yup.mixed().required('Type is required'),
    // brand: Yup.mixed().required('brand is required'),
    // price: Yup.number().required('Price is required'),
    // qty: Yup.number().required('Quantity is required'),
    // sku: Yup.string().required('SKU is required'),
    // featuredImage: Yup.mixed().nullable().required('Profile Image is required'),
    // galleryImage: Yup.mixed().nullable().required('Cover Image is required'),
    // // not required
    // sellPrice: Yup.string(),
    // description: Yup.string(),
  });

  const defaultValues = {
    featuredImage: currentProduct?.featuredImage || '',
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
      // Build inputData
      const productIds = selectedProducts.map((product) => product.id);

      const inputDataCollection = {
        type: selectedGalleryType?.value,
        productsId: productIds,
        featureInfluencerImageUrl: { fileUrl: data.featuredImage },
      };

      if (!inputDataCollection.type) {
        enqueueSnackbar('Please select product type', { variant: 'error' });
        return;
      }
      if (inputDataCollection.productsId.length === 0) {
        enqueueSnackbar('Please select products', { variant: 'error' });
        return;
      }

      await axiosInstance.post(`influencer/product`, inputDataCollection);
      // Show success notification
      enqueueSnackbar('Product added successfully!', { variant: 'success' });
      router.push(`/influencer-dashboard/influencerProducts`);
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

  useEffect(() => {
    const fetchProductData = async () => {
      const res = await axiosInstance.get(`/api/public/products/list`);
      const { data } = res;
      function extractCategoryInfo(obj, result, idSet) {
        if (obj && typeof obj === 'object') {
          if (
            Object.prototype.hasOwnProperty.call(obj, 'id') &&
            Object.prototype.hasOwnProperty.call(obj, 'name')
          ) {
            const { id, name, brand, status } = obj;
            const brandName = brand?.name;
            if (!idSet.has(id)) {
              idSet.add(id);
              result.push({ id, name, brandName, status });
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

      data.forEach((item) => {
        extractCategoryInfo(item, extractedInfo, idSet);
      });
      const filteredData = extractedInfo.filter((item) => item.status === true);

      setProductsOptions(filteredData);
    };
    // if (selectedBrand?.id) {
    fetchProductData();
    // }
  }, []);

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
              <RHFUpload
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

  const renderBrandsProducts = (
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
            {productsOptions && (
              <Controller
                name="products"
                control={methods.control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    fullWidth
                    multiple
                    limitTags={3}
                    label="Categories"
                    clearOnEscape
                    value={selectedProducts.map((option) => option)}
                    getOptionLabel={(option) => `${option.name} (${option.brandName})`}
                    onChange={(event, newInputValue) => {
                      const selectedOptions = productsOptions.filter((option) =>
                        newInputValue.some((selectedItem) => selectedItem.id === option.id)
                      );
                      if (selectedOptions) {
                        setSelectedProducts(selectedOptions);
                      } else {
                        setSelectedProducts(newInputValue);
                      }
                    }}
                    options={productsOptions || []}
                    renderInput={(paramss) => (
                      <TextField {...paramss} label="Products" placeholder="Products" />
                    )}
                    renderTags={(selected, getTagProps) =>
                      selected.map((option, index) => (
                        <Chip
                          {...getTagProps({ index })}
                          key={option.name}
                          label={`${option.name} (${option.brandName})`}
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

  const renderProductType = (
    <>
      {mdUp && (
        <Grid item md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Product Type
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Select product type form here
          </Typography>
        </Grid>
      )}

      <Grid item xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            {productGalleryTypeOptions && (
              <Controller
                name="productGalleryType"
                control={methods.control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    fullWidth
                    clearOnEscape
                    value={selectedGalleryType?.name}
                    onChange={(event, newInputValue) => {
                      const selectedOption = productGalleryTypeOptions.find(
                        (option) => option.name === newInputValue
                      );

                      if (selectedOption) {
                        setSelectedGalleryType(selectedOption);
                      } else {
                        setSelectedGalleryType(newInputValue);
                      }
                    }}
                    options={
                      productGalleryTypeOptions
                        ? productGalleryTypeOptions
                            .filter((option) => option && option.name)
                            .map((option) => option.name)
                        : []
                    }
                    renderInput={(paramss) => (
                      <TextField
                        {...paramss}
                        label="Product Gallery Type"
                        placeholder="Product Gallery Type"
                      />
                    )}
                  />
                )}
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
          {!currentProduct ? 'Add Product' : 'Save Changes'}
        </LoadingButton>
      </Grid>
    </>
  );
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          {renderProductType}
          {selectedGalleryType?.value === 'collection' && renderFeaturedImage}
          {selectedGalleryType.value && renderBrandsProducts}
          {renderActions}
        </Grid>
      </FormProvider>
    </Container>
  );
}
ProductsNewEditDetails.propTypes = {
  currentProduct: PropTypes.object,
};
