import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
// components
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const IncrementerButton = forwardRef(
  ({ quantity, onIncrease, onDecrease, disabledIncrease, disabledDecrease, isProductListing, sx, ...other }, ref) => (
    <Stack
      ref={ref}
      flexShrink={0}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        p: 0.5,
        width: 88,
        borderRadius: 1,
        typography: 'subtitle2',
        border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.2)}`,
        ...sx,
      }}
      {...other}
    >
      <IconButton
        size="small"
        onClick={onDecrease}
        disabled={disabledDecrease}
        sx={{ borderRadius: 0.75, color : isProductListing ? '#D001FF' : '' }}
      >
        <Iconify icon="eva:minus-fill" width={16} />
      </IconButton>

      {quantity}

      <IconButton
        size="small"
        onClick={onIncrease}
        disabled={disabledIncrease}
        sx={{ borderRadius: 0.75, color : isProductListing ? '#D001FF' : '' }}
      >
        <Iconify icon="mingcute:add-line" width={16} />
      </IconButton>
    </Stack>
  )
);

IncrementerButton.propTypes = {
  disabledDecrease: PropTypes.bool,
  disabledIncrease: PropTypes.bool,
  onDecrease: PropTypes.func,
  onIncrease: PropTypes.func,
  quantity: PropTypes.number,
  isProductListing : PropTypes.bool,
  sx: PropTypes.object,
};

export default IncrementerButton;
