// @mui
import AppBar from '@mui/material/AppBar';
import Badge, { badgeClasses } from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
// hooks
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';
// theme
import { bgBlur } from 'src/theme/css';
// routes
// components
import Logo from 'src/components/logo';
//
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useActiveLink, useParams } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import axiosInstance from 'src/utils/axios';
import { useUserRoles } from 'src/utils/constant';
import { AccountPopover, LoginButton, SettingsButton } from '../_common';
import { HEADER } from '../config-layout';
import { navConfig } from './config-navigation';
import NavDesktop from './nav/desktop';
import NavMobile from './nav/mobile';

// ----------------------------------------------------------------------

export default function Header() {
  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);

  const [reels, setReels] = useState([]);

  const isReels = useActiveLink('reels', true);
  const { reelId } = useParams();

  const permissions = useUserRoles();

  const isCustomer = permissions?.some((role) => role === 'customer');
  // const { reels } = useGetRandomReels();
  const randomReelId = reels[0]; // Replace with the actual reel id

  const upDatedNavConfig = navConfig.map((item) => {
    if (item.title === 'Reels') {
      return {
        ...item,
        path: paths.influencer.currentReel(randomReelId?.id), // Update path for the "Reels" item
      };
    }
    return item;
  });

  useEffect(() => {
    if (isReels && !reelId) {
      const FetchRandomReels = async () => {
        const res = await axiosInstance.post('/users/randomReels?filter[limit]=10');
        setReels(res.data);
      };
      FetchRandomReels();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navConfig]);

  return (
    <AppBar>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),

          ...bgBlur({
            color: theme.palette.background.default,
          }),
          ...(offsetTop && {
            height: {
              md: HEADER.H_DESKTOP_OFFSET,
            },
          }),
          marginLeft: { xs: `5%`, md: `12%` },
          marginRight: { xs: `5%`, md: `12%` },

          marginTop: { xs: `5%`, md: `2%` },
          // marginLeft: '12%',
          // marginRight: '12%',
          // backgroundColor: theme.palette.background.paper,
          borderRadius: '15px',
        }}
      >
        <Container sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
          <Badge
            sx={{
              [`& .${badgeClasses.badge}`]: {
                top: 8,
                right: -16,
              },
            }}
            // badgeContent={
            //   <Link
            //     href={paths.changelog}
            //     target="_blank"
            //     rel="noopener"
            //     underline="none"
            //     sx={{ ml: 1 }}
            //   >
            //     <Label color="info" sx={{ textTransform: 'unset', height: 22, px: 0.5 }}>
            //       v5.1.0
            //     </Label>
            //   </Link>
            // }
          >
            {/* <Link
              href={paths.changelog}
              target="_blank"
              rel="noopener"
              underline="none"
              sx={{ ml: 1 }}
            > */}
            <Logo />
            {/* </Link> */}
          </Badge>

          <Box sx={{ flexGrow: 1 }} />

          {mdUp && <NavDesktop offsetTop={offsetTop} data={upDatedNavConfig} />}

          {!isCustomer && (
            <Stack alignItems="center" direction={{ xs: 'row', md: 'row-reverse' }}>
              <SettingsButton
                sx={{
                  ml: { xs: 1, md: 0 },
                  mr: { md: 2 },
                }}
              />
              {mdUp && (
                <>
                  <Button
                    target="_blank"
                    rel="noopener"
                    href={paths.admin.register}
                    variant="contained"
                    style={{
                      marginRight: 20,
                      // backgroundImage: 'linear-gradient(90deg, #0171ed 0%, #d001ff 100%)',
                      backgroundColor : '#7635dc',
                    }}
                  >
                    <Typography
                      variant="body2"
                      style={{
                        color: 'white',
                        // textAlign: 'center',
                        fontStyle: 'normal',
                        fontWeight: '900',
                      }}
                    >
                      Join the Waitlist
                    </Typography>
                  </Button>

                  <LoginButton />
                </>
              )}
              {!mdUp && <NavMobile offsetTop={offsetTop} data={upDatedNavConfig} />}
            </Stack>
          )}
          {isCustomer && (
            <Stack alignItems="center" direction={{ xs: 'row', md: 'row' }}>
              <SettingsButton
                sx={{
                  ml: { xs: 1, md: 1 },
                  mr: { md: 2 },
                }}
              />
              <AccountPopover />
              {!mdUp && <NavMobile offsetTop={offsetTop} data={navConfig} />}
            </Stack>
          )}
        </Container>
      </Toolbar>

      {/* {offsetTop && <HeaderShadow />} */}
    </AppBar>
  );
}
