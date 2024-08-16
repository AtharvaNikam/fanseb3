import { useScroll } from 'framer-motion';
// @mui
// components
import { Box, Button, Grid, useTheme } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import ScrollProgress from 'src/components/scroll-progress';
import { HOST_API } from 'src/config-global';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import CartIcon from 'src/sections/common/cart-icon';
import BrandsSummary from '../brand-summary';
//

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function BrandsView() {
  const { scrollYProgress } = useScroll();
  // const settings = useSettingsContext();
  // const { checkout } = useCheckout();
  const theme = useTheme();
  const [brands, setBrands] = useState([]);

  const [skip, setSkip] = useState(0);
  // //   const { brands } = useGetBrands();
  const router = useRouter();
  const handleLoadMore = useCallback(() => {
    setSkip((prevSkip) => prevSkip + 10);
  }, []);
  useEffect(() => {
    async function fetchInfluencers() {
      try {
        const response = await fetch(
          `${HOST_API}/api/public/brands/list?filter[limit]=10&filter[skip]=${skip}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setBrands((prevData) => [...prevData, ...data]);
      } catch (error) {
        console.error('Error fetching influencers:', error.message);
        // Handle the error as needed
      }
    }

    fetchInfluencers();
  }, [skip]);
  return (
    <>
      <ScrollProgress scrollYProgress={scrollYProgress} />
      <CartIcon />

      <Box
        my={10}
        mx={{ xs: `5%`, md: `12%` }}
        style={{
          borderRadius: `36px`,
          border: `1px solid rgba(0, 0, 0, 0.30)`,
        }}
      >
        <Grid
          container
          col
          px={{ md: '60px' }}
          paddingTop={{ md: '52px', xs: '24px' }}
          paddingBottom={{ md: '40px', xs: '24px' }}
        >
          <Grid container direction="row" justifyContent={{ md: 'start', xs: 'center' }}>
            {brands.map((brand) => (
              <Grid
                item
                md={4}
                key={brand?.id}
                sx={{
                  width: '100%',
                }}
              >
                <BrandsSummary
                  margin="10px"
                  height="320px"
                  title={brand?.name}
                  description={brand?.description}
                  contactNo={brand?.user?.contactNo}
                  isActive={brand?.isActive}
                  address={brand?.address}
                  color={theme.palette.mode === 'light' ? '#f4f4f4' : '#20272e'}
                  icon={
                    <img alt="icon" src={`${brand?.profileImg}`} style={{ borderRadius: 100 }} />
                  }
                  onClick={() => router.push(paths.brands.details(brand.id))}
                />
              </Grid>
            ))}
            <Grid container justifyContent="center" item xs={12} md={12}>
              <Button
                onClick={handleLoadMore}
                variant="contained"
                sx={{
                  mt: 5,
                }}
                style={{
                  marginRight: 20,
                  backgroundImage: 'linear-gradient(90deg, #0171ed 0%, #d001ff 100%)',
                }}
              >
                <span
                  style={{
                    fontWeight: '700',
                    color: '#fff',
                  }}
                >
                  Laod More
                </span>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
