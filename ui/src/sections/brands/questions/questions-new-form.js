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
import { Alert, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useGetBrandQuestions } from 'src/api/questions';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import axiosInstance from 'src/utils/axios';

// ----------------------------------------------------------------------

export default function QuestionsNewForm({ onClose, row, ...other }) {
  const { id, question, products } = row;

  const { enqueueSnackbar } = useSnackbar();

  const { refreshBrandQuestions } = useGetBrandQuestions();

  const ReviewSchema = Yup.object().shape({
    answer: Yup.string().required('Answer is required'),
  });

  const defaultValues = {
    answer: '',
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
        answer: data.answer,
      };
      const res = await axiosInstance.patch(
        `/products/${products.id}/questions?where[id]=${id}`,
        inputData
      );
      console.log('res', res);

      refreshBrandQuestions();
      enqueueSnackbar('Answer has been added', { variant: 'success' });
      reset();
      onClose();
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Error adding answer', { variant: 'error' });
    }
  });

  const onCancel = useCallback(() => {
    onClose();
    reset();
  }, [onClose, reset]);

  return (
    <Dialog onClose={onClose} {...other}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle> Reply to Question </DialogTitle>

        <DialogContent>
          <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={1.5}>
            <Alert severity="info" variant="outlined">
              Note: Admin replies should be concise, professional, and respectful. They should
              address the question thoroughly while following organizational guidelines and
              maintaining a courteous tone.
            </Alert>
          </Stack>

          {!!errors.rating && <FormHelperText error> {errors.rating?.message}</FormHelperText>}

          <Typography variant="subtitle1" sx={{ mt: 3 }}>
            Q: {question} ?
          </Typography>

          <RHFTextField name="answer" label="Answer *" multiline rows={3} sx={{ mt: 3 }} />
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

QuestionsNewForm.propTypes = {
  id: PropTypes.string,
  row: PropTypes.object,
  productId: PropTypes.string,
  brandId: PropTypes.string,
  onClose: PropTypes.func,
};
