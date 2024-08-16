import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
// eslint-disable-next-line import/no-extraneous-dependencies
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Grid } from '@mui/material';
import { useResponsive } from 'src/hooks/use-responsive';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function FaqSection() {
  const mdUp = useResponsive('up', 'md');
  return (
    <Box>
      <Grid container py={{ xs: '48px', md: '80px' }} px={{ xs: '0px', md: '48px' }}>
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
                  How do I setup my fanseb store?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Log in to social media, link products to posts, share Fanseb, and track earnings
                  effortlessly
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
                    // fontFamily: 'Dosis',

                    fontStyle: 'normal',
                    fontWeight: '700',
                    lineHeight: '150%',
                  }}
                >
                  What kind of products can I feature in my store?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Craft your store with beloved brands featured on our platform
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
                    // fontFamily: 'Dosis',

                    fontStyle: 'normal',
                    fontWeight: '700',
                    lineHeight: '150%',
                  }}
                >
                  How do I track my earnings on Fanseb?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Track commissions and hunt into detailed analytics of your followers buying
                  behavior on your fanseb Dashboard. Redeem commissions at your convenience.
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
                    // fontFamily: 'Dosis',

                    fontStyle: 'normal',
                    fontWeight: '700',
                    lineHeight: '150%',
                  }}
                >
                  Do you know on what we are specialized on ?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  We excel in quality to ensure your followers satisfaction when they receive orders
                  from your store.
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
                    // fontFamily: 'Dosis',

                    fontStyle: 'normal',
                    fontWeight: '700',
                    lineHeight: '150%',
                  }}
                >
                  What sets Fanseb apart from other creator platforms?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Fanseb stands out with its creator-centric approach, offering seamless
                  collaboration, diverse brand choices, and unparalleled support, setting us apart
                  in the creator platform landscape. Explore more at fanseb.com.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
