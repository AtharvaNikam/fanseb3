import PropTypes from 'prop-types';
// @mui
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
// utils
import { fCurrency } from 'src/utils/format-number';
// components
import Iconify from 'src/components/iconify';
//
import IncrementerButton from '../common/incrementer-button';

// ----------------------------------------------------------------------

export default function CheckoutCartProduct({ row, onDelete, onDecrease, onIncrease }) {
  const { name, size, sale_price, colors, image, quantity, inventoryQuantity } = row;
  return (
    <TableRow>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant="rounded"
          alt={name}
          src={image.fileUrl}
          sx={{ width: 64, height: 64, mr: 2 }}
        />

        <Stack spacing={0.5}>
          <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240 }}>
            {name}
          </Typography>

          {/* <Stack
            direction="row"
            alignItems="center"
            sx={{ typography: 'body2', color: 'text.secondary' }}
          >
            size: <Label sx={{ ml: 0.5 }}> {size} </Label>
            <Divider orientation="vertical" sx={{ mx: 1, height: 16 }} />
            <ColorPreview colors={colors} />
          </Stack> */}
        </Stack>
      </TableCell>

      <TableCell>₹{fCurrency(sale_price)}</TableCell>

      <TableCell>
        <Box sx={{ width: 88, textAlign: 'right' }}>
          <IncrementerButton
            quantity={quantity}
            onDecrease={onDecrease}
            onIncrease={onIncrease}
            disabledDecrease={quantity <= 1}
            disabledIncrease={quantity >= inventoryQuantity}
          />

          <Typography variant="caption" component="div" sx={{ color: 'text.secondary', mt: 1 }}>
            available: {inventoryQuantity}
          </Typography>
        </Box>
      </TableCell>

      <TableCell align="right">₹{fCurrency(sale_price * quantity)}</TableCell>

      <TableCell align="right" sx={{ px: 1 }}>
        <IconButton onClick={onDelete}>
          <Iconify icon="solar:trash-bin-trash-bold" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

CheckoutCartProduct.propTypes = {
  row: PropTypes.object,
  onDelete: PropTypes.func,
  onDecrease: PropTypes.func,
  onIncrease: PropTypes.func,
};
