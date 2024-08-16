// @mui
import { Grid, Link } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link as ScrollLink } from 'react-scroll';

// routes
import { usePathname, useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
// _mock
// components

// ----------------------------------------------------------------------

const LINKS = [
  {
    headline: 'Minimal',
    children: [
      { name: 'About us', href: paths.about },
      { name: 'Contact us', href: paths.contact },
      { name: 'FAQs', href: paths.faqs },
    ],
  },
  {
    headline: 'Legal',
    children: [
      { name: 'Terms and Condition', href: '#' },
      { name: 'Privacy Policy', href: paths.privacyPolicy },
    ],
  },
  {
    headline: 'Contact',
    children: [{ name: 'connect@fanseb.com', href: 'mailto:connect@fanseb.com' }],
  },
];

// ----------------------------------------------------------------------

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const isHome = pathname === '/';

  const simpleFooter = (
    <Grid
      style={{
        background: '#222',
      }}
    >
      <Grid
        item
        display="flex"
        // gap={{ xs: '10px', md: '100px' }}
        // justifyContent={{ xs: 'center', md: 'space-between' }}
        // flexWrap={{ xs: 'wrap', md: 'wrap' }}
        pb={{ xs: '5%', md: '2%' }}
        mx={{ xs: '5%', md: '12%' }}
        my={{ xs: '5%', md: '2%' }}
        // direction={{ xs: 'row', md: 'row' }}
        borderBottom={{ xs: '1px solid #fff', md: '1px solid #fff' }}
        style={{
          background: '#222',
        }}
      >
        <Grid
          container
          md={7.5}
          xs={3}
          item
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
          // width={{ xs: '100px', md: '500px' }}
        >
          <Box
            component="img"
            src="assets\images\home\footer-logo.png"
            style={{ width: '32px', height: '32px' }}
          />
          <Typography
            variant="caption"
            style={{
              color: '#FFF',
              paddingTop: '32px',
            }}
          >
            Contact:
          </Typography>
          <Link
            href={paths.contactUs}
            target="_blank"
            rel="noopener"
            underline="none"
            sx={{ ml: 1 }}
          >
            <Typography
              variant="caption"
              style={{
                color: '#FFF',
              }}
            >
              9958871816
            </Typography>
          </Link>

          <Link href={paths.mail} target="_blank" rel="noopener" underline="none" sx={{ ml: 1 }}>
            <Typography
              variant="caption"
              style={{
                color: '#FFF',
              }}
            >
              connect@fanseb.com
            </Typography>
          </Link>
          <Typography
            variant="caption"
            mt={1}
            style={{
              color: '#FFF',
            }}
          >
            Saptco Bhartiya pvt. Ltd.
          </Typography>
          <Typography
            variant="caption"
            style={{
              color: '#FFF',
            }}
          >
            MODEL TOWN-3, NEW DELHI-110009
          </Typography>
          <Grid item pt={2} display="flex">
            <Link
              href={paths.facebook}
              target="_blank"
              rel="noopener"
              underline="none"
              sx={{ ml: 1 }}
            >
              <Box
                className="hero-banner-image"
                component="img"
                src="assets\images\home\social-media\Facebook.png"
                style={{
                  paddingRight: '12px',
                }}
              />
            </Link>
            <Link
              href={paths.instagram}
              target="_blank"
              rel="noopener"
              underline="none"
              sx={{ ml: 1 }}
            >
              <Box
                className="hero-banner-image"
                component="img"
                src="assets\images\home\social-media\Instagram.png"
                style={{
                  paddingRight: '12px',
                }}
              />
            </Link>
            <Link
              href={paths.twitter}
              target="_blank"
              rel="noopener"
              underline="none"
              sx={{ ml: 1 }}
            >
              <Box
                className="hero-banner-image"
                component="img"
                src="assets\images\home\social-media\X.png"
                style={{
                  paddingRight: '12px',
                }}
              />
            </Link>
            <Link
              href={paths.linkedin}
              target="_blank"
              rel="noopener"
              underline="none"
              sx={{ ml: 1 }}
            >
              <Box
                className="hero-banner-image"
                component="img"
                src="assets\images\home\social-media\LinkedIn.png"
                style={{
                  paddingRight: '12px',
                }}
              />
            </Link>
            {/* <Link
              // href={paths.instagram}
              target="_blank"
              rel="noopener"
              underline="none"
              sx={{ ml: 1 }}
            >
              <Box
                className="hero-banner-image"
                component="img"
                src="assets\images\home\social-media\Youtube.png"
                style={{
                  paddingRight: '12px',
                }}
              />
            </Link> */}
          </Grid>
        </Grid>

        <Grid
          container
          md={1.5}
          xs={3}
          item
          style={{
            color: '#FFF',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {/* <Typography variant="caption">Customer Service</Typography> */}
          {/* <Typography variant="caption">FAQ & Helps</Typography> */}
          {/* <Typography variant="caption">Returns</Typography> */}
          {/* <Typography variant="caption">Accessibility</Typography> */}
        </Grid>

        <Grid
          container
          md={1.5}
          xs={3}
          item
          style={{
            color: '#FFF',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <Link
            underline="none"
            sx={{
              color: '#FFF',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              flexWrap: 'wrap !important',
            }}
            onClick={() => {
              router.push(paths.brands.root);
            }}
          >
            <Typography variant="caption" sx={{cursor:'pointer'}}>Brands</Typography>
          </Link>
          <Link
            underline="none"
            sx={{
              color: '#FFF',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              flexWrap: 'wrap !important',
            }}
            onClick={() => {
              router.push(paths.influencer.root);
            }}
          >
            <Typography variant="caption" sx={{cursor:'pointer'}}>Reels</Typography>
          </Link>
          {/* <Typography variant="caption">Services</Typography> */}
          <Link
            underline="none"
            sx={{
              color: '#FFF',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              flexWrap: 'wrap !important',
            }}
            onClick={() => {
              router.push(paths.about);
            }}
          >
            <Typography variant="caption" sx={{cursor:'pointer'}}>About us</Typography>
          </Link>
          <Link
            underline="none"
            sx={{
              color: '#FFF',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              flexWrap: 'wrap !important',
            }}
            onClick={() => {
              router.push(paths.contact);
            }}
          >
            <Typography variant="caption" sx={{cursor:'pointer'}}>Contact us</Typography>
          </Link>
          {/* <Typography variant="caption">Bookmarks</Typography> */}
        </Grid>

        <Grid
          container
          md={1.5}
          item
          xs={3}
          style={{
            color: '#FFF',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            flexWrap: 'wrap !important',
          }}
        >
          <Link
            underline="none"
            sx={{
              color: '#FFF',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              flexWrap: 'wrap !important',
            }}
            onClick={() => {
              router.push(paths.ourInfo);
            }}
          >
            <Typography variant="caption" sx={{cursor:'pointer'}}>Our information</Typography>
          </Link>
          <Link
            underline="none"
            sx={{
              color: '#FFF',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              flexWrap: 'wrap !important',
            }}
            onClick={() => {
              router.push(paths.privacyPolicy);
            }}
          >
            <Typography variant="caption" sx={{cursor:'pointer'}}>Privacy policy update</Typography>
          </Link>
          <Link
            underline="none"
            sx={{
              color: '#FFF',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              flexWrap: 'wrap !important',
            }}
            onClick={() => {
              router.push(paths.termsConditions);
            }}
          >
            <Typography variant="caption" sx={{cursor:'pointer'}}>Term’s and conditions</Typography>
          </Link>
          <Link
            underline="none"
            sx={{
              color: '#FFF',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              flexWrap: 'wrap !important',
            }}
            onClick={() => {
              router.push(paths.returnPolicy);
            }}
          >
            <Typography variant="caption" sx={{cursor:'pointer'}}>Return policy</Typography>
          </Link>
          <Link
            underline="none"
            sx={{
              color: '#FFF',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              flexWrap: 'wrap !important',
            }}
            onClick={() => {
              router.push(paths.faqSection);
            }}
          >
            <Typography variant="caption" sx={{cursor:'pointer'}}>FAQ & Helps</Typography>
          </Link>

          {/* <Typography variant="caption">Sitemap</Typography> */}
        </Grid>
      </Grid>
    </Grid>
  );

  return isHome ? simpleFooter : simpleFooter;
}
