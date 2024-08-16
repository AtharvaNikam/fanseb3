import { useScroll } from 'framer-motion';
// @mui
import Box from '@mui/material/Box';
// components
import ScrollProgress from 'src/components/scroll-progress';
//
import { useTheme } from '@mui/system';
import FaqSection from '../services-fanseb-faq';
import ServicesHero from '../services-hero';
import ServicesMonetize from '../services-monitize';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function ServicesView() {
  const { scrollYProgress } = useScroll();
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <>
      <ScrollProgress scrollYProgress={scrollYProgress} />
      <Box
        my={10}
        mx={{ xs: `5%`, md: `12%` }}
        border={isLight ? '1px solid rgba(0, 0, 0, 0.30)' : '1px solid rgba(255, 255, 255, 0.30)'}
        style={{
          borderRadius: `36px`,
        }}
      >
        <ServicesHero />

        <ServicesMonetize />

        <FaqSection />
      </Box>
    </>
  );
}
