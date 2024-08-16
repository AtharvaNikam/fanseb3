import PropTypes from 'prop-types';
// @mui
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { alpha, useTheme } from '@mui/material/styles';
// theme
import { Typography } from '@mui/material';
import Link from '@mui/material/Link';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import { bgGradient } from 'src/theme/css';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const products = [
  {
    id: '1',
    coverUrl: 'assets/images/home/card-2.png',
    title: 'Gloss Me Transparent',
    price: '125',
  },
  {
    id: '2',
    coverUrl: 'assets/images/home/card-2.png',
    title: 'Shiny Red Lipstick',
    price: '90',
  },
  {
    id: '3',
    coverUrl: 'assets/images/home/card-2.png',
    title: 'Matte Finish Foundation',
    price: '150',
  },
  {
    id: '4',
    coverUrl: 'assets/images/home/card-2.png',
    title: 'Lash Volume Mascara',
    price: '80',
  },
  {
    id: '5',
    coverUrl: 'assets/images/home/card-2.png',
    title: 'Sparkling Eyeshadow Palette',
    price: '200',
  },
];
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

export default function ProfileCover({ name, avatarUrl, bio, gallery, socials }) {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.primary.darker, 0.8),
        }),
        height: 1,
        color: 'common.white',
      }}
    >
      {/* {gallery ? <CoverImageCarousel data={gallery} /> : <CoverImageCarousel data={products} />} */}
      <Avatar
        src={gallery?.fileUrl}
        alt="brand cover image"
        variant="rounded"
        sx={{ width: '100%', height: { xs: 200, md: 340 } }}
      />
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'center', md: 'flex-start' }}
        sx={{
          bottom: { md: 24, xs: 24 },
        }}
      >
        <Avatar
          src={avatarUrl}
          alt={name}
          style={{
            position: 'relative',
            bottom: '50px',
          }}
          sx={{
            width: { xs: 150, md: 270 },
            height: { xs: 150, md: 270 },
            border: `solid 2px ${theme.palette.common.white}`,
            bottom: { xs: '10px', md: 0 },
          }}
        />

        <Box
          flexWrap={{ xs: 'nowrap', md: 'wrap' }}
          alignItems={{ xs: 'center', md: 'flex-start' }}
          display={{ xs: 'flex', md: 'flex' }}
          justifyContent={{ md: 'space-between' }}
          alignContent={{ md: 'flex-start' }}
          flexDirection={{ xs: 'column', md: 'row' }}
          sx={{
            mt: 5,
            ml: { md: 3 },
            direction: { xs: 'column', md: 'row' },
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: { xs: 'center', md: 'space-between' },
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                mt: 1,
                ml: { md: 3 },
                color: theme.palette.mode === 'dark' ? 'white' : 'black',
                height: { xs: 64, md: 64 },
                textAlign: { xs: 'center', md: 'unset' },
                // fontFamily: 'Dosis',
                fontWeight: '900',
              }}
            >
              {name}
            </Typography>
            <Box
              sx={{
                // mt: 2,
                // ml: { md: 3 },
                // width: { xs: 250, md: 370 },
                // height: { xs: 64, md: 64 },
                textAlign: { xs: 'center', md: 'end' },
                display: 'flex',
                justifyContent: { xs: 'center', md: 'flex-end' },
                alignItems: 'center',
              }}
            >
              <Link
                component={RouterLink}
                to={socials?.twitter}
                sx={{ display: 'contents', color: PRIMARY_LIGHT }}
              >
                <Iconify icon="skill-icons:twitter" width={24} mr={1} />
              </Link>
              <Link
                component={RouterLink}
                to={socials?.instagram}
                sx={{ display: 'contents', color: PRIMARY_LIGHT }}
              >
                <Iconify icon="skill-icons:instagram" width={24} mr={1} />
              </Link>
              <Link
                component={RouterLink}
                to={socials?.facebook}
                sx={{ display: 'contents', color: PRIMARY_LIGHT }}
              >
                <Iconify icon="skill-icons:linkedin" width={24} mr={1} />
              </Link>
              <Link
                component={RouterLink}
                to={socials?.youtube}
                sx={{ display: 'contents', color: PRIMARY_LIGHT }}
              >
                <Iconify icon="fa-brands:youtube-square" color="red" width={24} mr={1} />
              </Link>
            </Box>
          </Box>
          <Typography
            variant="body1"
            rows={4}
            sx={{
              mt: 1,
              ml: { md: 3 },
              width: { xs: 250, md: '100%' },

              color: theme.palette.mode === 'dark' ? 'white' : 'black',
              textAlign: { xs: 'center', md: 'unset' },
              // fontFamily: 'Dosis',
            }}
          >
            {bio}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

ProfileCover.propTypes = {
  avatarUrl: PropTypes.string,
  name: PropTypes.string,
  bio: PropTypes.string,
  gallery: PropTypes.array,
  socials: PropTypes.object,
};
