import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
// utils
import { Avatar, Grid, Typography } from '@mui/material';
import Slider from 'react-slick';
import { useGetInfluencerProductCount } from 'src/api/products';

// ----------------------------------------------------------------------

export default function InfluencerDetailsHistory({ user }) {
  const { product } = useGetInfluencerProductCount(user?.id);
  const settingss = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const renderProducts = (
    <Stack
      spacing={2}
      component={Paper}
      boxShadow={1}
      variant="outlined"
      sx={{
        p: 2.5,
        minWidth: 200,
        flexShrink: 0,
        borderRadius: 2,
        typography: 'body2',
        borderStyle: 'dashed',
      }}
    >
      <Stack>
        <Box>Products</Box>
      </Stack>
      <Stack direction="row">
        <Avatar alt={user?.name} src={user?.profileImg} sx={{ width: 48, height: 48, mr: 2 }} />

        <Stack spacing={0.5} alignItems="flex-start" sx={{ typography: 'body2' }}>
          <Typography variant="h6">{product?.count}</Typography>

          <Box sx={{ color: 'text.secondary' }}>Total Products</Box>
        </Stack>
      </Stack>
      <Stack direction="row">
        <Avatar alt={user?.name} src={user?.profileImg} sx={{ width: 48, height: 48, mr: 2 }} />

        <Stack spacing={0.5} alignItems="flex-start" sx={{ typography: 'body2' }}>
          <Typography variant="h6">{user?.influencerBalances?.totalOrders}</Typography>

          <Box sx={{ color: 'text.secondary' }}>Total Orders</Box>
        </Stack>
      </Stack>
    </Stack>
  );
  const renderRevenue = (
    <Stack
      spacing={2}
      component={Paper}
      boxShadow={1}
      variant="outlined"
      sx={{
        p: 2.5,
        minWidth: 200,
        flexShrink: 0,
        borderRadius: 2,
        typography: 'body2',
        borderStyle: 'dashed',
      }}
    >
      <Stack>
        <Box>Revenue</Box>
      </Stack>
      <Stack direction="row">
        <Avatar alt={user?.name} src={user?.profileImg} sx={{ width: 48, height: 48, mr: 2 }} />

        <Stack spacing={0.5} alignItems="flex-start" sx={{ typography: 'body2' }}>
          <Typography variant="h6">₹{user?.influencerBalances?.totalEarnings}</Typography>

          <Box sx={{ color: 'text.secondary' }}>Gross Sales</Box>
        </Stack>
      </Stack>
      <Stack direction="row">
        <Avatar alt={user?.name} src={user?.profileImg} sx={{ width: 48, height: 48, mr: 2 }} />

        <Stack spacing={0.5} alignItems="flex-start" sx={{ typography: 'body2' }}>
          <Typography variant="h6">₹{user?.influencerBalances?.currentBalance}</Typography>

          <Box sx={{ color: 'text.secondary' }}>Current Balance</Box>
        </Stack>
      </Stack>
    </Stack>
  );
  const renderOthers = (
    <Stack
      spacing={2}
      component={Paper}
      boxShadow={1}
      variant="outlined"
      sx={{
        p: 2.5,
        minWidth: 200,
        flexShrink: 0,
        borderRadius: 2,
        typography: 'body2',
        borderStyle: 'dashed',
      }}
    >
      <Stack>
        <Box>Others</Box>
      </Stack>
      <Stack direction="row">
        {/* <Avatar alt={user?.name} src={user?.profileImg} sx={{ width: 48, height: 48, mr: 2 }} /> */}

        <Stack spacing={0.5} alignItems="flex-start" sx={{ typography: 'body2' }}>
          <Typography variant="h6">
            {user?.influencerBalances?.influencer_commision_rate} %
          </Typography>

          <Box sx={{ color: 'text.secondary' }}>Commission Rate</Box>
        </Stack>
      </Stack>
    </Stack>
  );

  return (
    // <Card>
    //   <CardHeader title="Influencer details" />
    <Grid
      item
      spacing={2}
      alignItems={{ md: 'flex-start' }}
      display="flex"
      gap={2}
      sx={{ direction: { xs: 'column', md: 'column' } }}
    >
      <Grid item md={3} xs={3}>
        {renderProducts}
      </Grid>
      {/* <Grid> */}

      <Grid item width="50%">
        <Slider {...settingss} mx="6px">
          <Grid>{renderRevenue}</Grid>
          <Grid>{renderOthers}</Grid>
        </Slider>
      </Grid>
      {/* </Grid> */}
    </Grid>
    // </Card>
  );
}

InfluencerDetailsHistory.propTypes = {
  user: PropTypes.any,
};
