import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
// routes
import { usePathname } from 'src/routes/hook';
//
import Footer from './footer';
import Header from './header';

// ----------------------------------------------------------------------

export default function MainLayout({ children }) {
  const pathname = usePathname();

  const isHome = pathname === '/';
  const isBrand = pathname === '/brands';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      <Header />

      <Box
        component="main"
        Box
        sx={{
          flexGrow: 1,
          ...(!isHome && {
            pt: { xs: 8, md: 10 },
          }),
          ...(isBrand && {
            backgroundColor: 'rgb(220 65 255)',
          }),
        }}
      >
        {children}
      </Box>

      <Footer />
    </Box>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node,
};
