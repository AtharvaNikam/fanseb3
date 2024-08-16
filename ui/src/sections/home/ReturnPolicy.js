import { Card, CardContent, Stack, Typography, Link, Grid, Box } from '@mui/material';

export default function ReturnPolicy() {
  const renderPolicy = (
    <Card sx={{ maxWidth: 779, margin: 'auto', height: 'auto', mb: 3 }}>
      <CardContent>
        <Stack spacing={2} sx={{ mt: 5, mb: 5 }} px={{ xs: `5%`, md: `12%` }}>
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
            Return Policy
          </Typography>

          <Typography variant="body1" sx={{ textAlign: 'justify' }}>
            At Fanseb, we strive to provide you with the best shopping experience. However, we understand
            that there might be situations where you need to return a product. Please read our return
            policy carefully before making a purchase.
          </Typography>

          <Typography variant="h6" sx={{ mt: 2 }}>
            1. Returns and Exchanges
          </Typography>

          <Typography variant="body1" sx={{ textAlign: 'justify' }}>
            We do not provide a return policy. All sales are final. If you have any concerns or issues
            with your order, please contact us at{' '}
            <Link href="mailto:connect@fanseb.com" underline="hover">
              connect@fanseb.com
            </Link>{' '}
            or call us at 9958871816.
          </Typography>

          <Typography variant="h6" sx={{ mt: 2 }}>
            2. Contact Information
          </Typography>

          <Typography variant="body1" sx={{ textAlign: 'justify' }}>
            For any further questions or clarifications, you can reach out to us at the following address:
          </Typography>

          <Typography variant="body1" sx={{ textAlign: 'justify', mb: 3 }}>
            Saptco Bhartiya Pvt. Ltd.
            <br />
            MODEL TOWN-3, NEW DELHI-110009
          </Typography>

        </Stack>
      </CardContent>
    </Card>
  );

  return <div>{renderPolicy}</div>;
}
