import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormHelperText from '@mui/material/FormHelperText';
// components
import { Typography } from '@mui/material';
import { useAuthContext } from 'src/auth/hooks';
import FormProvider, { RHFTextField, RHFUpload } from 'src/components/hook-form';
import axiosInstance from 'src/utils/axios';

// ----------------------------------------------------------------------

export default function ProductRefundNewForm({ productId, onClose, ...other }) {
  const { user } = useAuthContext();
  const ReviewSchema = Yup.object().shape({
    rating: Yup.number().min(1, 'Rating must be greater than or equal to 1'),
    review: Yup.string().required('Review is required'),
    // name: Yup.string().required('Name is required'),
    // email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  });

  const defaultValues = {
    rating: 0,
    review: '',
    name: user?.name || '',
    email: user?.email || '',
    productImage: [],
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
        review: data.review,
        isPurchased: true,
        // name: data.name,
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
  const handleDropCoverImage = useCallback(
    async (acceptedFiles) => {
      const files = values.productImage || [];

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
        setValue('productImage', [...files, ...fileUrls], { shouldValidate: true });
      }
    },
    [setValue, values.productImage]
  );

  const onCancel = useCallback(() => {
    onClose();
    reset();
  }, [onClose, reset]);

  return (
    <Dialog onClose={onClose} {...other}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle> Add New Refund </DialogTitle>

        <DialogContent>
          {!!errors.rating && <FormHelperText error> {errors.rating?.message}</FormHelperText>}

          <RHFTextField name="reason" label="Reason *" sx={{ mt: 3 }} />

          <RHFTextField name="review" label="Description *" multiline rows={3} sx={{ mt: 3 }} />

          <Typography variant="subtitle2" sx={{ mt: 3, mb: 1, color: 'text.secondary' }}>
            Add Photos :
          </Typography>

          <RHFUpload
            name="productImage"
            thumbnail
            multiple
            maxSize={3145728}
            onDrop={handleDropCoverImage}
            onRemove={(inputFile) =>
              setValue(
                'productImage',
                values.productImage && values.productImage?.filter((file) => file !== inputFile),
                { shouldValidate: true }
              )
            }
            onRemoveAll={() => setValue('productImage', [], { shouldValidate: true })}
          />
        </DialogContent>

        <DialogActions>
          <Button color="inherit" variant="outlined" onClick={onCancel}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Submit
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

ProductRefundNewForm.propTypes = {
  productId: PropTypes.string,
  onClose: PropTypes.func,
};
