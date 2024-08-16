import PropTypes from 'prop-types';
// @mui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
// hooks
// components
import { ConfirmDialog } from 'src/components/custom-dialog';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import { useBoolean } from 'src/hooks/use-boolean';
//

// ----------------------------------------------------------------------

export default function ProductTableRow({ row, selected, onDeleteRow }) {
  const { type, products, featureInfluencerImageUrl } = row;
  console.log('🚀 ~ row:', row);

  const collapse = useBoolean();

  const isActive = true;
  console.log(products);
  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={type} src={products?.image?.fileUrl} sx={{ mr: 2 }} />

          <ListItemText primary={products?.name} primaryTypographyProps={{ typography: 'body2' }} />
        </TableCell>
        <TableCell>{products?.brand?.name}</TableCell>
        <TableCell>{type}</TableCell>
        <TableCell>₹{products?.price}</TableCell>
        {/* <TableCell>{products?.quantity}</TableCell> */}

        <TableCell>
          <Label
            variant="soft"
            color={(isActive === true && 'success') || (isActive === false && 'error') || 'default'}
          >
            {(isActive === true && 'Active') || (isActive === false && 'Inactive')}
          </Label>
        </TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Tooltip title="Delete" placement="top" arrow>
            <IconButton onClick={collapse.onTrue}>
              <Iconify
                icon="solar:trash-bin-trash-bold"
                sx={{ color: 'error.main' }}
                width="50"
                height="50"
              />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      <ConfirmDialog
        open={collapse.value}
        onClose={collapse.onFalse}
        title="Delete"
        content="Are you sure, you want to delete?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDeleteRow();
              collapse.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

ProductTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
