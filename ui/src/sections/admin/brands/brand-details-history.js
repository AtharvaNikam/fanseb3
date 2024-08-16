import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
// utils
import { Avatar, Typography } from '@mui/material';
import { useGetBrandOrdersCounts } from 'src/api/orders';
import { useGetBrandProductCount } from 'src/api/products';
// import { useGetBrandOrdersCounts } from '../../api/orders';

// ----------------------------------------------------------------------

export default function BrandDetailsHistory({ history }) {
  const { product } = useGetBrandProductCount(history?.id);
  const { orders } = useGetBrandOrdersCounts(history?.id);
  const GrossSales = history?.brandBalances?.totalEarnings;
  const CurrentBalance = history?.brandBalances?.currentBalance;
  const AdminComissionRate = history?.brandBalances?.adminCommissionRate;
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
        <Avatar
          alt={history?.name}
          src={history?.profileImg}
          sx={{ width: 48, height: 48, mr: 2 }}
        />

        <Stack spacing={0.5} alignItems="flex-start" sx={{ typography: 'body2' }}>
          <Typography variant="h6">{product?.count}</Typography>

          <Box sx={{ color: 'text.secondary' }}>Total Products</Box>
        </Stack>
      </Stack>
      <Stack direction="row">
        <Avatar
          alt={history?.name}
          src={history?.profileImg}
          sx={{ width: 48, height: 48, mr: 2 }}
        />

        <Stack spacing={0.5} alignItems="flex-start" sx={{ typography: 'body2' }}>
          <Typography variant="h6">{orders?.count}</Typography>

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
        <Avatar
          alt={history?.name}
          src={history?.profileImg}
          sx={{ width: 48, height: 48, mr: 2 }}
        />

        <Stack spacing={0.5} alignItems="flex-start" sx={{ typography: 'body2' }}>
          <Typography variant="h6">₹ {GrossSales}</Typography>

          <Box sx={{ color: 'text.secondary' }}>Gross Sales</Box>
        </Stack>
      </Stack>
      <Stack direction="row">
        <Avatar
          alt={history?.name}
          src={history?.profileImg}
          sx={{ width: 48, height: 48, mr: 2 }}
        />

        <Stack spacing={0.5} alignItems="flex-start" sx={{ typography: 'body2' }}>
          <Typography variant="h6">₹ {CurrentBalance}</Typography>

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
        <Avatar
          alt={history?.name}
          src={history?.profileImg}
          sx={{ width: 48, height: 48, mr: 2 }}
        />

        <Stack spacing={0.5} alignItems="flex-start" sx={{ typography: 'body2' }}>
          <Typography variant="h6">{AdminComissionRate} %</Typography>

          <Box sx={{ color: 'text.secondary' }}>Admin Commission Rate</Box>
        </Stack>
      </Stack>
    </Stack>
  );

  return (
    <Card>
      <CardHeader title="Brand details" />
      <Stack
        spacing={2}
        alignItems={{ md: 'flex-start' }}
        direction={{ xs: 'column-reverse', md: 'row' }}
        sx={{ p: 3 }}
      >
        {renderProducts}
        {renderRevenue}
        {renderOthers}
      </Stack>
    </Card>
  );
}

BrandDetailsHistory.propTypes = {
  history: PropTypes.object,
};
