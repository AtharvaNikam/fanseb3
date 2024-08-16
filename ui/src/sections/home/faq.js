import { Card, CardContent, Stack, Typography, Grid } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Faq() {
  const renderfaq = (
    <Card sx={{ maxWidth: 779, margin: 'auto', height: 'auto', mb: 3 }}>
      <CardContent>
        <Stack spacing={0.3} sx={{ mt: 5, mb: 5 }} px={{ xs: `5%`, md: `12%` }}>
            <Typography variant="h4" sx={{ textAlign: 'center' }}>
            FAQ & helps
            </Typography>
        </Stack>
        <Grid
            sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: '10px',
            }}
            style={{
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
      </CardContent>
    </Card>
  );

  return <div>{renderfaq}</div>;
}