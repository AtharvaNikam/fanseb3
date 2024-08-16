import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormHelperText from '@mui/material/FormHelperText';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// components
import { useAuthContext } from 'src/auth/hooks';
import FormProvider, { RHFTextField, RHFUpload } from 'src/components/hook-form';
import axiosInstance from 'src/utils/axios';

// ----------------------------------------------------------------------

export default function ProductReviewNewForm({ productId, brandId, onClose, ...other }) {
  const { user } = useAuthContext();
  const ReviewSchema = Yup.object().shape({
    rating: Yup.number().min(1, 'Rating must be greater than or equal to 1'),
    review: Yup.string().required('Review is required'),
    // name: Yup.string().required('Name is required'),
    // email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  });

  const defaultValues = {
    rating: 0,
    brandId: brandId || '',
    name: user?.name || '',
    review: '',
    attachments: [],
    isPurchased: true,
    email: user?.email || '',
  };

  const methods = useForm({
    resolver: yupResolver(ReviewSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const inputData = {
        ratings: data.rating,
        brandId: Number(data.brandId),
        review: data.review,
        attachments: data.attachments,
        isPurchased: true,
        name: data.name,
        // email: data.email,
      };
      const res = await axiosInstance.post(`/products/${productId}/reviews`, inputData);
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      onClose();
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const onCancel = useCallback(() => {
    onClose();
    reset();
  }, [onClose, reset]);

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

      // Get the array of file URLs from the response
      const fileUrls = [];
      res?.data?.files.map((file) => fileUrls.push(file.fileUrl));

      // Update the state or values with the array of file URLs
      if (fileUrls.length > 0) {
        setValue('attachments', [...files, ...fileUrls], { shouldValidate: true });
      }
    },
    [setValue, values.galleryImage]
  );

  return (
    <Dialog onClose={onClose} {...other}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle> Add Review </DialogTitle>

        <DialogContent>
          <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={1.5}>
            <Typography variant="body2">Your review about this product:</Typography>

            <Controller
              name="rating"
              control={control}
              render={({ field }) => <Rating {...field} size="small" value={Number(field.value)} />}
            />
          </Stack>

          {!!errors.rating && <FormHelperText error> {errors.rating?.message}</FormHelperText>}

          <RHFTextField name="review" label="Review *" multiline rows={3} sx={{ mt: 3, mb: 2 }} />

          <RHFUpload
            name="attachments"
            thumbnail
            multiple
            maxSize={3145728}
            onDrop={handleDropCoverImage}
            onRemove={(inputFile) =>
              setValue(
                'attachments',
                values.galleryImage && values.galleryImage?.filter((file) => file !== inputFile),
                { shouldValidate: true }
              )
            }
            onRemoveAll={() => setValue('attachments', [], { shouldValidate: true })}
          />

          {/* <RHFTextField name="name" label="Name *" sx={{ mt: 3 }} />

          <RHFTextField name="email" label="Email *" sx={{ mt: 3 }} /> */}
        </DialogContent>

        <DialogActions>
          <Button color="inherit" variant="outlined" onClick={onCancel}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Post
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

ProductReviewNewForm.propTypes = {
  productId: PropTypes.string,
  brandId: PropTypes.string,
  onClose: PropTypes.func,
};
