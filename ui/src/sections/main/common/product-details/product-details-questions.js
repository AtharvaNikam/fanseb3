import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// utils
// hooks
import { Button, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import ProductQuestionsList from 'src/sections/common/product-qustions/product-questions-list';
import ProductQuestionsNewForm from 'src/sections/common/product-qustions/product-questions-new-form';
import { useUserRoles } from 'src/utils/constant';
// components
//

// ----------------------------------------------------------------------
const ratings = [
  { name: '5 Stars', ratings: 150, reviewCount: 100 },
  { name: '4 Stars', ratings: 80, reviewCount: 50 },
  { name: '3 Stars', ratings: 40, reviewCount: 30 },
  { name: '2 Stars', ratings: 20, reviewCount: 15 },
  { name: '1 Star', ratings: 10, reviewCount: 5 },
];

// ----------------------------------------------------------------------

export default function ProductDetailsQuestions({ questions, brandId, productId }) {
  const question = useBoolean();
  const { enqueueSnackbar } = useSnackbar();
  const roles = useUserRoles();

  const handleWriteQuestion = () => {
    if (roles && roles.map((role) => ['customer'].includes(role)).includes(true)) {
      question.onTrue();
    } else {
      enqueueSnackbar('You must be logged in to ask a question', { variant: 'error' });
    }
  };

  const renderReviewButton = (
    <Stack
      alignItems="center"
      justifyContent="flex-end"
      sx={{
        flexDirection: { xs: 'column', md: 'row' },
        mr: { md: 2 },
      }}
    >
      <Button
        size="large"
        variant="soft"
        color="inherit"
        onClick={handleWriteQuestion}
        startIcon={<Iconify icon="solar:pen-bold" />}
      >
        Write your Question
      </Button>
    </Stack>
  );

  return (
    <>
      <Box
        display="grid"
        sx={{
          py: { xs: 5, md: 2 },
        }}
      >
        {renderReviewButton}
      </Box>

      {/* <Divider sx={{ borderStyle: 'dashed' }} /> */}

      {questions?.length > 0 ? (
        <ProductQuestionsList questions={questions} />
      ) : (
        <Typography
          variant="subtitle2"
          sx={{
            my: 3,
            mx: 2.5,
            px: 2.5,
            py: 1.5,
          }}
        >
          Be the first to ask a question.
        </Typography>
      )}
      <ProductQuestionsNewForm
        brandId={brandId}
        productId={productId}
        open={question.value}
        onClose={question.onFalse}
      />
    </>
  );
}

ProductDetailsQuestions.propTypes = {
  brandId: PropTypes.number,
  productId: PropTypes.number,
  questions: PropTypes.array,
};
