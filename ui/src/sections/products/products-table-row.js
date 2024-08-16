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
import { useState } from 'react';
import { ConfirmDialog } from 'src/components/custom-dialog';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
//

// ----------------------------------------------------------------------

export default function ProductTableRow({ row, selected, onEditRow, onDeleteRow }) {
  const { name, image, product_type, unit, quantity } = row;
  const [confirmAdmin, setConfirmAdmin] = useState({
    value: false,
    onTrue: () => setConfirmAdmin({ ...confirmAdmin, value: true }),
    onFalse: () => setConfirmAdmin({ ...confirmAdmin, value: false }),
  });

  const [confirmBlock, setConfirmBlock] = useState({
    value: false,
    onTrue: () => setConfirmBlock({ ...confirmBlock, value: true }),
    onFalse: () => setConfirmBlock({ ...confirmBlock, value: false }),
  });
  const isActive = true;

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={name} src={image?.fileUrl} sx={{ mr: 2 }} />

          <ListItemText primary={name} primaryTypographyProps={{ typography: 'body2' }} />
        </TableCell>
        <TableCell>brand</TableCell>
        <TableCell>{product_type}</TableCell>
        <TableCell>{unit}</TableCell>
        <TableCell>{quantity}</TableCell>

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
            <IconButton onClick={confirmAdmin.onTrue}>
              <Iconify
                icon="solar:trash-bin-trash-bold"
                sx={{ color: 'error.main' }}
                width="50"
                height="50"
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit" placement="top" arrow>
            <IconButton onClick={onEditRow}>
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      <ConfirmDialog
        open={confirmAdmin.value}
        onClose={confirmAdmin.onFalse}
        title="Delete"
        content="Are you sure, you want to delete?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDeleteRow();
              confirmAdmin.onFalse();
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
  onEditRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
