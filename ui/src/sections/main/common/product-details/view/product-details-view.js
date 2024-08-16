import { useCallback, useEffect, useState } from 'react';
// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { alpha } from '@mui/material/styles';
// _mock
// routes
import { RouterLink } from 'src/routes/components';
import { useParams } from 'src/routes/hook';
// api

// components
import { useGetProduct } from 'src/api/products';
import EmptyContent from 'src/components/empty-content';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CartIcon from 'src/sections/common/cart-icon';
import { useCheckout } from 'src/sections/hooks';
import ProductDetailsCarousel from '../product-details-carousel';
import ProductDetailsDescription from '../product-details-description';
import ProductDetailsQuestions from '../product-details-questions';
import ProductDetailsReview from '../product-details-review';
import ProductDetailsSummary from '../product-details-summary';
import ProductDetailsToolbar from '../product-details-toolbar';
import { ProductDetailsSkeleton } from '../product-skeleton';
//

// ----------------------------------------------------------------------

const SUMMARY = [
  {
    title: '100% Original',
    description: 'Chocolate bar candy canes ice cream toffee cookie halvah.',
    icon: 'solar:verified-check-bold',
  },
  {
    title: '10 Day Replacement',
    description: 'Marshmallow biscuit donut dragée fruitcake wafer.',
    icon: 'solar:clock-circle-bold',
  },
  {
    title: 'Year Warranty',
    description: 'Cotton candy gingerbread cake I love sugar sweet.',
    icon: 'solar:shield-check-bold',
  },
];

// ----------------------------------------------------------------------

export default function ProductDetailsView() {
  const params = useParams();

  const { brandId, influencerId, productId } = params;

  const { product, productLoading, productError } = useGetProduct(
    `${brandId || influencerId}`,
    `${productId}`
  );

  const totalAnsweredQuestions = product?.questions?.filter((question) => question.answer);
  console.log('🚀 ~ totalAnsweredQuestions:', totalAnsweredQuestions);

  const settings = useSettingsContext();

  const [currentTab, setCurrentTab] = useState('details');

  const [publish, setPublish] = useState('');

  const { checkout, onAddCart, onGotoStep } = useCheckout();

  useEffect(() => {
    if (product) {
      setPublish(product?.publish);
    }
  }, [product]);

  const handleChangePublish = useCallback((newValue) => {
    setPublish(newValue);
  }, []);

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  const renderSkeleton = <ProductDetailsSkeleton />;

  const renderError = (
    <EmptyContent
      filled
      title={`${productError?.message}`}
      action={
        <Button
          component={RouterLink}
          href="#"
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
          sx={{ mt: 3 }}
        >
          Back to List
        </Button>
      }
      sx={{ py: 10 }}
    />
  );

  const renderProduct = product && (
    <>
      <ProductDetailsToolbar />

      <Grid container spacing={{ xs: 3, md: 5, lg: 8 }}>
        <Grid xs={12} md={6} lg={7}>
          <ProductDetailsCarousel product={product} />
        </Grid>

        <Grid xs={12} md={6} lg={5}>
          <ProductDetailsSummary
            product={product}
            cart={checkout.cart}
            onAddCart={onAddCart}
            onGotoStep={onGotoStep}
          />
        </Grid>
      </Grid>

      <Box
        gap={5}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
        sx={{ my: 10 }}
      >
        {SUMMARY.map((item) => (
          <Box key={item.title} sx={{ textAlign: 'center', px: 5 }}>
            <Iconify icon={item.icon} width={32} sx={{ color: 'primary.main' }} />

            <Typography variant="subtitle1" sx={{ mb: 1, mt: 2 }}>
              {item.title}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </Box>
        ))}
      </Box>

      <Card>
        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          sx={{
            px: 3,
            boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
          }}
        >
          {[
            {
              value: 'details',
              label: 'Details',
            },
            {
              value: 'reviews',
              label: `Reviews (${product?.reviews?.length || 0})`,
            },
            {
              value: 'questions',
              label: `Questions (${totalAnsweredQuestions?.length || 0})`,
            },
          ].map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>

        {currentTab === 'details' && (
          <ProductDetailsDescription description={product?.description} />
        )}
        {currentTab === 'reviews' && (
          <ProductDetailsReview ratings={product.ratings} reviews={product.reviews} />
        )}
        {currentTab === 'questions' && (
          <ProductDetailsQuestions
            questions={totalAnsweredQuestions}
            brandId={product?.brandId}
            productId={productId}
          />
        )}
      </Card>
    </>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ mb: 10, marginTop: '50px' }}>
      <CartIcon />

      {productLoading && renderSkeleton}
      {productError && renderError}
      {product && renderProduct}
    </Container>
  );
}
