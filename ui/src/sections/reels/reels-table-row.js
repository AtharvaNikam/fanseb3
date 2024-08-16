import PropTypes from 'prop-types';
// @mui
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
// hooks
// components
import { useState } from 'react';
import { ConfirmDialog } from 'src/components/custom-dialog';
import Iconify from 'src/components/iconify';
//

// ----------------------------------------------------------------------

export default function UserTableRow({ row, selected, onEditRow, onDeleteRow }) {
  const { id, name } = row;
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

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{id}</TableCell>
        <TableCell sx={{}}>{name}</TableCell>

        <TableCell align="right" sx={{ px: 2, whiteSpace: 'nowrap' }}>
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

UserTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
