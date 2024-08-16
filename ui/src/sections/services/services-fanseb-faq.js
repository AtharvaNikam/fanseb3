import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
// eslint-disable-next-line import/no-extraneous-dependencies
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Grid } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useResponsive } from 'src/hooks/use-responsive';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function FaqSection() {
  const mdUp = useResponsive('up', 'md');
  return (
    <Box>
      <Grid container py={{ xs: '48px', md: '80px' }} px={{ xs: '10px', md: '48px' }}>
        {mdUp && (
          <Grid container item md={4} alignContent="center" justifyContent="center">
            <Box
              className="hero-banner-image"
              component="img"
              display="flex"
              justifyContent="center"
              src="assets\images\home\key-2.png"
              style={{
                width: '304px',
                // height: '384px',
                // flexShrink: 0,
              }}
            />
          </Grid>
        )}
        <Grid item md={8}>
          <Grid
            alignItems={{ xs: 'center', md: 'flex-start' }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              alignSelf: 'stretch',
            }}
          >
            <Typography
              style={{
                // fontFamily: 'Dosis',
                fontSize: '48px',
                fontStyle: 'normal',
                fontWeight: '700',
                lineHeight: '120%',
              }}
            >
              FAQs
            </Typography>
          </Grid>

          <Grid
            style={{
              paddingTop: '40px',
              // fontFamily: 'Dosis',
              fontSize: '20px',
              fontStyle: 'normal',
              fontWeight: '700',
              lineHeight: '150%',
              flex: '1 0 0',
            }}
          >
            <Divider />
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  style={{
                    // fontFamily: 'Dosis',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: '700',
                    lineHeight: '150%',
                  }}
                >
                  How do I set up my store on Fanseb?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
                  lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Divider />
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography
                  style={{
                    // fontFamily: 'Dosis',
                    fontSize: '20px',
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
                  lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Divider />
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography
                  style={{
                    // fontFamily: 'Dosis',
                    fontSize: '20px',
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
                  lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Divider />
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography
                  style={{
                    // fontFamily: 'Dosis',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: '700',
                    lineHeight: '150%',
                  }}
                >
                  Can I collaborate with any brand on Fanseb?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
                  lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Divider />
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography
                  style={{
                    // fontFamily: 'Dosis',
                    fontSize: '20px',
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
                  lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Divider />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
