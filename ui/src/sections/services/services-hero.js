// @mui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
// routes
// hooks
// theme
// layouts
// components
import './home-hero.css';
import ServicesCard from './services-card';
// ----------------------------------------------------------------------
const mockData = [
  {
    id: 1,
    title: 'SPONSORED INFLUENCER CONTENT',
    icon: 'assets\\images\\home\\Laptops\\Version-1.png',
    description:
      'We build authentic relationships between consumers and products through sponsored',
  },
  {
    id: 2,
    title: 'INFLUENCER GIFTING',
    icon: 'assets\\images\\home\\Laptops\\Version-1.png',
    description:
      'We offer a gifting program that allows brands to send products directly to influencers in our network in exchange for coverage',
  },
  {
    id: 3,
    title: 'INFLUENCER EVENTS',
    icon: 'assets\\images\\home\\Laptops\\Version-1.png',
    description:
      'We help brands host influencer events such as launch parties, product releases, and media tours that boost brand awareness and sales.',
  },
  {
    id: 4,
    title: 'INFLUENCER TRIPS',
    icon: 'assets\\images\\home\\Laptops\\Version-1.png',
    description:
      'Our team works with influencers to create. experiences that give back to their followers and create positive ROl and brand awareness for the trips sponsors',
  },
  {
    id: 5,
    title: 'INFLUENCER PRODUCT LAUNCHES',
    icon: 'assets\\images\\home\\Laptops\\Version-1.png',
    description:
      'We work with top-tier influencers to create and launch their products as a collaboration with brands',
  },
  {
    id: 6,
    title: 'INFLUENCER BRAND AMBASSADORS',
    icon: 'assets\\images\\home\\Laptops\\Version-1.png',
    description:
      'We have worked with brands to develop top-© tier influencers into brand ambassadors so they promote products authentically and organically',
  },
];
// ----------------------------------------------------------------------

export default function ServicesHero() {
  const theme = useTheme();
  return (
    <>
      <Grid
        item
        md={12}
        gap={{ xs: '28px', md: '80px' }}
        padding={{ xs: '24px 16px', md: '52px 48px' }}
        sx={{
          paddingBottom: '0px',
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* <Grid item justifyContent="center">
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
            }}
            style={{
              // color: '#111',
              // fontFamily: 'Dosis',
              // fontSize: '70px',
              fontStyle: 'normal',
              fontWeight: '700',
              lineHeight: 'normal',
              textTransform: 'uppercase',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            Our Services
          </Typography>
        </Grid> */}

        <Grid
          container
          item
          p={{ xs: 3, md: 0 }}
          justifyContent={{ xs: 'center', md: 'start' }}
          columns={13}
        >
          {mockData.map((service) => (
            <ServicesCard
              margin="0px 10px 20px 10px"
              key={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </Grid>

        <Button
          variant="contained"
          className="link"
          style={{
            marginRight: 20,
            width: 190,
            backgroundImage: 'linear-gradient(90deg, #0171ed 0%, #d001ff 100%)',
          }}
        >
          <span
            style={{
              fontWeight: '800',
              color: '#fff',
            }}
          >
            Join the Waitlist
          </span>
        </Button>
      </Grid>

      {/* <Box sx={{ height: { md: '100vh' } }} /> */}
    </>
  );
}
