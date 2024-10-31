import { useScroll } from 'framer-motion';
// @mui
import Box from '@mui/material/Box';
// components
import ScrollProgress from 'src/components/scroll-progress';
//
import { useTheme } from '@mui/system';
import CartIcon from 'src/sections/common/cart-icon';
import { useCheckout } from 'src/sections/hooks';
import CardDesign from '../home-fanseb-card-design';
import FaqSection from '../home-fanseb-faq';
import Features from '../home-fanseb-features';
import HomeHero from '../home-hero';
import HomeMinimal from '../home-minimal';
import StickyScroll from '../sticky-scroll';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function HomeView() {
  const { scrollYProgress } = useScroll();
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const { checkout } = useCheckout();

  return (
    <>
      <ScrollProgress scrollYProgress={scrollYProgress} />
      <Box
        pb={{ xs: 5, md: 8 }}
        px={{ xs: `5%`, md: `12%` }}
        sx={{
          backgroundColor: 'rgb(220 65 255)',
        }}
      >
        <Box className="heroSection">
          <CartIcon totalItems={checkout.totalItems} />

          <HomeHero />

          <StickyScroll />
          <HomeMinimal />
        </Box>
        {/* <TheFansebExperience /> */}

        {/* <Monetize /> */}

        <Features />

        <CardDesign />

        <section id="faqSection">
          <FaqSection />
        </section>
      </Box>
    </>
  );
}
