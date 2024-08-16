import { m } from 'framer-motion';
// @mui
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// layouts
// routes
import { RouterLink } from 'src/routes/components';
// components
import { MotionContainer, varBounce } from 'src/components/animate';
// assets
import BrandNotFoundIllustration from 'src/assets/illustrations/brand-not-found-illustration';
import CompactLayout from 'src/layouts/compact/layout';

// ----------------------------------------------------------------------

export default function BrandsInitial() {
  return (
    <CompactLayout>
      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            Sorry, You Have No Brands!
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            If you’re looking for a specific brand and it’s not listed, consider creating a new
            brand to proceed.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <BrandNotFoundIllustration
            sx={{
              height: 260,
              my: { xs: 2, sm: 8 },
            }}
          />
        </m.div>

        <Button component={RouterLink} href="/" size="large" variant="contained">
          Create Brand
        </Button>
      </MotionContainer>
    </CompactLayout>
  );
}
