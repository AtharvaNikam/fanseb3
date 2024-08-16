import PropTypes from 'prop-types';
// @mui
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
// components
import { Stack } from '@mui/material';
import { useRouter } from 'src/routes/hook';
import { fDateTime } from 'src/utils/format-time';

// ----------------------------------------------------------------------

export default function BrandDetailsInfo({ currentUser, payment, shippingAddress }) {
  const router = useRouter();
  const renderBrand = (
    <>
      <CardHeader title="Influencer Information" />
      <Stack sx={{ p: 3 }} spacing={2}>
        <Stack direction="column" alignItems="center">
          <Avatar
            alt={currentUser?.name}
            src={currentUser?.userProfile?.avatar?.fileUrl}
            sx={{ width: 58, height: 58, mr: 2, mb: 1 }}
          />

          <Stack spacing={1} alignItems="flex-start" sx={{ typography: 'body2' }}>
            <Typography variant="subtitle2">{currentUser?.name}</Typography>

            <Box sx={{ color: 'text.secondary' }}>{currentUser?.userProfile?.bio}</Box>
          </Stack>
        </Stack>
        <Stack direction="column" spacing={0.5} sx={{ typography: 'body2' }}>
          <Box>
            Contact:
            <Box component="span" sx={{ color: 'text.secondary', ml: 1.25 }}>
              {currentUser?.contactNo}
            </Box>
          </Box>
          <Box>
            Registered Since:
            <Box component="span" sx={{ color: 'text.primary', fontWeight: 700, ml: 1.25 }}>
              {fDateTime(currentUser?.createdAt, 'dd MMM yyyy')}
            </Box>
          </Box>
          <Button
            size="medium"
            color="inherit"
            variant="contained"
            onClick={() => {
              router.push(`/influencer/${currentUser?.userName}`);
            }}
            // startIcon={<Iconify icon="mingcute:add-line" />}
            sx={{ mt: 1, mx: 6.5 }}
          >
            Visit Page
          </Button>
        </Stack>
      </Stack>
    </>
  );

  const renderShipping = (
    <>
      <CardHeader title="Address" />
      <Stack sx={{ p: 3, typography: 'body2' }}>
        <Stack direction="column" spacing={0.5} alignItems="start">
          <Stack direction="row" alignItems="start">
            <Box component="span" sx={{ color: 'text.secondary', width: 80, flexShrink: 0 }}>
              City
            </Box>
            {shippingAddress?.city}
          </Stack>
          <Stack direction="row" alignItems="start">
            <Box component="span" sx={{ color: 'text.secondary', width: 80, flexShrink: 0 }}>
              country
            </Box>
            {shippingAddress?.country}
          </Stack>
          <Stack direction="row" alignItems="start">
            <Box component="span" sx={{ color: 'text.secondary', width: 80, flexShrink: 0 }}>
              Street
            </Box>
            {shippingAddress?.streetAddress}
          </Stack>
          <Stack direction="row" alignItems="start">
            <Box component="span" sx={{ color: 'text.secondary', width: 80, flexShrink: 0 }}>
              Zip
            </Box>
            {shippingAddress?.zip}
          </Stack>
        </Stack>
      </Stack>
    </>
  );

  const renderPayment = (
    <>
      <CardHeader title="Payment Information" />
      <Stack direction="column" spacing={1} sx={{ p: 3, typography: 'body2' }}>
        <Stack direction="column" alignItems="start">
          <Box component="span" sx={{ color: 'text.secondary', flexGrow: 1 }}>
            Name:
          </Box>
          {payment?.accountHolderName}
        </Stack>
        <Stack direction="column" alignItems="start">
          <Box component="span" sx={{ color: 'text.secondary', flexGrow: 1 }}>
            Email:
          </Box>
          {payment?.accountHolderEmail}
        </Stack>
        <Stack direction="column" alignItems="start">
          <Box component="span" sx={{ color: 'text.secondary', flexGrow: 1 }}>
            Bank:
          </Box>
          {payment?.bankName}
        </Stack>
        <Stack direction="column" alignItems="start">
          <Box component="span" sx={{ color: 'text.secondary', flexGrow: 1 }}>
            Account No:
          </Box>
          {payment?.accountNumber}
        </Stack>
      </Stack>
    </>
  );

  return (
    <Card>
      {renderBrand}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {/* {renderShipping} */}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderPayment}
    </Card>
  );
}

BrandDetailsInfo.propTypes = {
  currentUser: PropTypes.object,
  payment: PropTypes.object,
  shippingAddress: PropTypes.object,
};
