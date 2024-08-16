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
import Stack from '@mui/material/Stack';
// components
import { Alert } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useAuthContext } from 'src/auth/hooks';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import axiosInstance from 'src/utils/axios';

// ----------------------------------------------------------------------

export default function ProductQuestionsNewForm({ productId, brandId, onClose, ...other }) {
  const { user } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const ReviewSchema = Yup.object().shape({
    question: Yup.string().required('Question is required'),
  });
  console.log('🚀 ~ brandIdc:', brandId);

  const defaultValues = {
    question: '',
    userId: user?.id || '',
    brandId: brandId || '',
    productId: productId || '',
  };

  const methods = useForm({
    resolver: yupResolver(ReviewSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const inputData = {
        question: data.question,
        productsId: Number(data.productId),
        userId: data.userId,
        brandId: data.brandId,
      };
      console.log('🚀 ~ inputData:', inputData);
      const res = await axiosInstance.post(`/products/${productId}/questions`, inputData);
      console.log('res', res);

      enqueueSnackbar('Question has been added', { variant: 'success' });
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      onClose();
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Error adding question', { variant: 'error' });
    }
  });

  const onCancel = useCallback(() => {
    onClose();
    reset();
  }, [onClose, reset]);

  return (
    <Dialog onClose={onClose} {...other}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle> Add Question </DialogTitle>

        <DialogContent>
          <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={1.5}>
            <Alert severity="info" variant="outlined">
              Note: Your question should not contain contact information such as email, phone or
              external web links.
            </Alert>
          </Stack>

          {!!errors.rating && <FormHelperText error> {errors.rating?.message}</FormHelperText>}

          <RHFTextField name="question" label="Question *" multiline rows={3} sx={{ mt: 3 }} />

          {/* <RHFTextField name="name" label="Name *" sx={{ mt: 3 }} />

          <RHFTextField name="email" label="Email *" sx={{ mt: 3 }} /> */}
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

ProductQuestionsNewForm.propTypes = {
  productId: PropTypes.string,
  brandId: PropTypes.string,
  onClose: PropTypes.func,
};
