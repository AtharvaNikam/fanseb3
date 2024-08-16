// @mui
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import { useCheckout } from 'src/sections/hooks';

// routes
import { paths } from 'src/routes/paths';
// components
import { sum } from 'lodash';
import { useEffect, useState } from 'react';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export default function CartIcon() {
  const { checkout } = useCheckout();
  const [totalItems, setTotalItems] = useState(0);
  useEffect(() => {
    if (checkout && checkout.cart.length > 0) {
      setTotalItems(sum(checkout.cart.map((product) => product.quantity)));
    } else {
      setTotalItems(0);
    }
  }, [checkout]);
  return (
    <Box
      component={RouterLink}
      href={paths.checkout}
      sx={{
        right: 0,
        top: 152,
        zIndex: 999,
        display: 'flex',
        cursor: 'pointer',
        position: 'fixed',
        color: 'text.primary',
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        bgcolor: 'background.paper',
        padding: (theme) => theme.spacing(1, 3, 1, 2),
        boxShadow: (theme) => theme.customShadows.dropdown,
        transition: (theme) => theme.transitions.create(['opacity']),
        '&:hover': { opacity: 0.72 },
      }}
    >
      <Badge showZero badgeContent={totalItems} color="error" max={99}>
        <Iconify icon="solar:cart-3-bold" width={24} />
      </Badge>
    </Box>
  );
}
