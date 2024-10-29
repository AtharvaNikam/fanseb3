import { useScroll } from 'framer-motion';
import PropTypes from 'prop-types';
// @mui
// components
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { ReactTyped } from 'react-typed';
import Image from 'src/components/image';
import ScrollProgress from 'src/components/scroll-progress';
import { HOST_API } from 'src/config-global';
import { useRouter } from 'src/routes/hook';
import CartIcon from 'src/sections/common/cart-icon';
import BrandsSlider from '../brand-slider';
import StickyScroll from '../sticky-scroll';
import './brand-slider.css';
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
    <Box pb={{ xs: 5, md: 8 }} px={{ xs: `5%`, md: `12%` }}>
      <ScrollProgress scrollYProgress={scrollYProgress} />
      <CartIcon />

      <Grid container pt={{ xs: 8, md: 10 }}>
        <Grid
          item
          md={7}
          pt={5}
          display="flex"
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Typography
            variant="h1"
            sx={{
              textAlign: 'left',
            }}
            style={{
              fontFamily: 'Poppins',
              // fontSize: '72px',
              fontWeight: '500',
              lineHeight: '80px',
              letterSpacing: '-4px',
              textAlign: 'left',
              color: 'white',
              opacity: '0.6',
            }}
          >
            <ReactTyped
              strings={['Sell', 'Build', 'Attract']}
              typeSpeed={80}
              loop
              backSpeed={70}
              showCursor
            />
          </Typography>
          <Typography
            variant="h1"
            sx={{
              textAlign: 'left',
            }}
            style={{
              fontFamily: 'Poppins',
              fontWeight: '500',
              textAlign: 'left',
              color: 'white',
            }}
          >
            Elevate your brand with Fanseb Influencer-Driven Marketing platform
          </Typography>
          <Typography
            variant="h3"
            sx={{
              textAlign: 'left',

              marginTop: '40px',
            }}
            style={{
              fontFamily: 'Poppins',
              fontSize: '24px',
              fontWeight: '400',
              lineHeight: '32px',
              letterSpacing: '-0.5px',
              textAlign: 'left',
              color: 'white',
            }}
          >
            Empower your brand with our sales and customer acquisition engine, fueled by creators
            who genuinely resonate with the unique heartbeat of India
          </Typography>
          <Button
            variant="contained"
            sx={{
              fontFamily: 'Poppins',
              fontSize: '16px',
              fontWeight: '500',
              lineHeight: '20px',
              letterSpacing: '-0.5px',
              textAlign: 'center',
              // textDecorationColor: '#0000',
              backgroundColor: '#f1f1f1',
              color: '#000',
              mt: '5px',
              mb: '5px',
              width: '145px',
              height: '56px',
              padding: '18px 32px 18px 32px',
              borderRadius: '6px',
            }}
            style={{
              // marginLeft: '60px',
              marginTop: '40px',
            }}
          >
            <Box
              style={{
                fontFamily: 'Poppins',
                fontSize: '14px',
                fontWeight: '600',
                lineHeight: '20px',
                letterSpacing: '0em',
                textAlign: 'left',
              }}
            >
              Get Started
            </Box>
          </Button>
        </Grid>
        <Grid item md={5} p={5}>
          <Box
            className="hero-banner-image"
            component="img"
            fullWidth
            display="flex"
            justifyContent="center"
            src="assets\images\brands\hero\hero.png"
            alt="image not failed"
            style={{
              // height: '500px',
              borderRadius: '40px',
              // marginTop: '40px',
              marginLeft: 'auto',
              marginRight: 'auto',
              // objectFit: 'cover',
            }}
          />
        </Grid>

        <StickyScroll />

        {/* Brand Slider  */}

        <BrandsSlider />

        {/* Brand Slider  */}
        <Grid
          item
          xs={12}
          md={12}
          style={{ marginTop: '40px', alignContent: 'center', justifyContent: 'center' }}
          fullWidth
        >
          <Grid>
            <Typography
              variant="h1"
              sx={{
                textAlign: 'center',
              }}
              style={{
                fontFamily: 'Poppins',
                // fontSize: '72px',
                fontWeight: '700',
                textAlign: 'center',
                color: 'white',
              }}
            >
              How to get started
            </Typography>
          </Grid>

          <Grid
            item
            md={12}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              gap: '2.5rem',
              marginTop: '40px',
            }}
          >
            <FlagsCard
              title="Get in touch with our team (9958871816)"
              numberImage="assets\images\brands\temp\num_1.png"
              gesture="assets\images\brands\temp\hand_3.png"
            />

            <FlagsCard
              title="Seamlessly integrate our tech stack with your website in just a 5-minute, one-time setup!"
              numberImage="assets\images\brands\temp\num_2.png"
              gesture="assets\images\brands\temp\hand_2.png"
            />

            <FlagsCard
              title="Monitor sales and traffic flowing from creator storefronts with precision and ease."
              numberImage="assets\images\brands\temp\num_3.png"
              gesture="assets\images\brands\temp\hand_1.png"
            />
          </Grid>
          {/* ####################################################################################################### */}

          <Grid
            item
            md={12}
            py="72px"
            px="40px"
            justifyContent="space-between"
            direction={{ xs: 'column', md: 'row' }}
            alignItems={{ xs: 'center', md: 'center' }}
            display="flex"
          >
            <Grid md={5}>
              <Image
                src="assets\images\brands\temp\ce797169af7b8165ebe33_PC.png"
                alt="image not failed"
              />
            </Grid>
            <Grid
              md={5}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography
                // variant="h3"
                sx={{
                  marginTop: '40px',
                  textAlign: 'center',
                }}
                style={{
                  fontFamily: 'Poppins',
                  fontSize: '24px',
                  fontWeight: '400',

                  color: 'white',
                }}
              >
                Unlock the full potential of influencer marketing ROI effortlessly. We provide
                comprehensive visibility into every spent penny, at literally no cost!
              </Typography>
              <Button
                variant="contained"
                sx={{
                  fontFamily: 'Poppins',
                  fontSize: '16px',
                  fontWeight: '500',
                  lineHeight: '20px',
                  letterSpacing: '-0.5px',
                  textAlign: 'center',
                  // textDecorationColor: '#0000',
                  backgroundColor: '#f1f1f1',
                  color: '#f1f1f1',
                  mt: '5px',
                  mb: '5px',
                  width: '145px',
                  height: '56px',
                  padding: '18px 32px 18px 32px',
                  borderRadius: '6px',
                }}
                style={{
                  // marginLeft: '60px',
                  marginTop: '40px',
                }}
              >
                <Box
                  style={{
                    fontFamily: 'Poppins',
                    fontSize: '14px',
                    fontWeight: '600',
                    lineHeight: '20px',
                    letterSpacing: '0em',
                    // textAlign: 'left',
                    color: 'black',
                  }}
                >
                  Get Started
                </Box>
              </Button>
            </Grid>
          </Grid>
          {/* ####################################################################################################### */}
          <Grid item md={12} direction="row" display="flex" gap={2.5}>
            <Grid item md={12}>
              <Grid
                alignItems={{ xs: 'center', md: 'flex-start' }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                  alignSelf: 'stretch',
                  alignItems: 'center',
                }}
              >
                <Typography
                  style={{
                    fontSize: '55px',
                    fontStyle: 'normal',
                    fontWeight: '700',
                    lineHeight: '120%',
                    color: 'white',
                  }}
                >
                  FAQs
                </Typography>
              </Grid>

              <Grid
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: '10px',
                }}
                style={{
                  paddingTop: '40px',
                  // fontFamily: 'Dosis',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  lineHeight: '150%',
                  flex: '1 0 0',
                }}
              >
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{
                      backgroundColor: 'background.paper',
                      borderRadius: '0.625rem',
                    }}
                  >
                    <Typography
                      py={1.5}
                      style={{
                        // fontFamily: 'Dosis',
                        fontStyle: 'normal',
                        fontWeight: '700',
                        lineHeight: '150%',
                      }}
                    >
                      Who oversees the curation and execution of creators?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Let data curate the selection, and leave execution in our capable hands.
                      Experience a fresh approach to creator collaboration—focus on tracking sales
                      and traffic driven to your website or app hassle-free.
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    sx={{
                      backgroundColor: 'background.paper',
                      borderRadius: '0.625rem',
                    }}
                  >
                    <Typography
                      py={1.5}
                      style={{
                        fontStyle: 'normal',
                        fontWeight: '700',
                        lineHeight: '150%',
                      }}
                    >
                      How does our tech seamlessly integrate with your systems?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Our backend integration tracks sales from each influencer in just FEW seconds!
                      Seamless and quick for your convenience.
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    sx={{
                      backgroundColor: 'background.paper',
                      borderRadius: '0.625rem',
                    }}
                  >
                    <Typography
                      py={1.5}
                      style={{
                        fontStyle: 'normal',
                        fontWeight: '700',
                        lineHeight: '150%',
                      }}
                    >
                      What is the payment schedule?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Pay for performance. Tailored metrics, optimal outcomes—our commitment to your
                      success.
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    sx={{
                      backgroundColor: 'background.paper',
                      borderRadius: '0.625rem',
                    }}
                  >
                    <Typography
                      py={1.5}
                      style={{
                        fontStyle: 'normal',
                        fontWeight: '700',
                        lineHeight: '150%',
                      }}
                    >
                      Explore paid awareness campaigns on Fanseb ?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Elevate unprecedented influencer insights—beyond metrics, discover their power
                      to drive sales and traffic.
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    sx={{
                      backgroundColor: 'background.paper',
                      borderRadius: '0.625rem',
                    }}
                  >
                    <Typography
                      py={1.5}
                      style={{
                        fontStyle: 'normal',
                        fontWeight: '700',
                        lineHeight: '150%',
                      }}
                    >
                      What specific data points are monitored?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      We monitor data at every stage of the funnel, spanning from views and
                      engagement to Click-Through-Rates and Conversion. Easily calculate RoAS, CPV,
                      CPC—akin to any performance marketing channel.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

function FlagsCard({ title, numberImage, gesture }) {
  return (
    <Grid item md={4} sx={12}>
      <Box
        style={{
          background: '#F8E0C9',
          height: '340px',
          marginTop: '40px',
          objectFit: 'cover',
          paddingTop: 10.8,
          paddingBottom: 10.8,
          paddingLeft: 10.8,
          paddingRight: 10.79,
          borderRadius: 20,
        }}
      >
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingTop: 18,
            height: '320px',
            paddingBottom: 18,
            paddingLeft: 18,
            paddingRight: 18,
            borderRadius: 12,
            border: '4px #D3955A dotted',
          }}
        >
          <Box
            component="img"
            fullWidth
            display="flex"
            justifyContent="center"
            src={numberImage}
            alt="image not failed"
            style={{
              height: 92,
              width: 92,
              borderRadius: '50%',
            }}
          />
          <Typography
            style={{
              color: '#AB713B',
              marginTop: 18,
              fontSize: 24,
            }}
          >
            {title}
          </Typography>
        </Box>
        <Image
          src={gesture}
          alt="image not failed"
          sx={{
            position: 'relative',
            bottom: '30%',
            left: '70%',
            height: '200px',
            width: '200px',
          }}
        />
      </Box>
    </Grid>
  );
}

FlagsCard.propTypes = {
  title: PropTypes.string,
  numberImage: PropTypes.string,
  gesture: PropTypes.string,
};
