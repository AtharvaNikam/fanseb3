import PropTypes from 'prop-types';
import { useEffect } from 'react';
// @mui
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// routes
import { usePathname } from 'src/routes/hook';
// components
import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';
import SvgColor from 'src/components/svg-color';
//
import { Typography } from '@mui/material';
import { Button } from 'react-bootstrap';
import { useUserRoles } from 'src/utils/constant';
import NavList from './nav-list';

// ----------------------------------------------------------------------

export default function NavMobile({ offsetTop, data }) {
  console.log('🚀 ~ data:', data);
  const pathname = usePathname();

  const nav = useBoolean();

  const permissions = useUserRoles();

  const isCustomer = permissions === 'customer';

  const updateData = [
    ...data,
    {
      title: 'Login',
      path: '/auth/customer/login',
    },
  ];

  useEffect(() => {
    if (nav.value) {
      nav.onFalse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <IconButton
        onClick={nav.onTrue}
        sx={{
          ml: 1,
          ...(offsetTop && {
            color: 'text.primary',
          }),
        }}
      >
        <SvgColor src="/assets/icons/navbar/ic_menu_item.svg" />
      </IconButton>

      <Drawer
        open={nav.value}
        onClose={nav.onFalse}
        PaperProps={{
          sx: {
            pb: 5,
            width: 260,
          },
        }}
      >
        <Scrollbar>
          <Logo sx={{ mx: 2.5, my: 3 }} />

          <List component="nav" disablePadding>
            {updateData.map((link) => (
              <NavList key={link.title} item={link} />
            ))}
          </List>

          {!isCustomer && (
            <>
              {/* <span
                style={{
                  marginLeft: 30,
                }}
              >
                <LoginButton />
              </span> */}
              <Button
                target="_blank"
                rel="noopener"
                // href={paths.minimalUI}
                variant="contained"
                style={{
                  display: 'flex',
                  marginLeft: 30,
                  marginRight: 30,
                  marginTop: 15,
                  borderRadius: 10,
                  justifyContent: 'center',
                  // backgroundImage: 'linear-gradient(90deg, #0171ed 0%, #d001ff 100%)',
                  background: '#00e9e7 ',
                }}
              >
                <Typography
                  variant="body1"
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontStyle: 'normal',
                    fontWeight: '800',
                  }}
                >
                  Join the Waitlist
                </Typography>
              </Button>
            </>
          )}
        </Scrollbar>
      </Drawer>
    </>
  );
}

NavMobile.propTypes = {
  data: PropTypes.array,
  offsetTop: PropTypes.bool,
};
