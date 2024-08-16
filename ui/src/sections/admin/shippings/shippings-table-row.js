import PropTypes from 'prop-types';
// @mui
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
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

export default function TaxesTableRow({ row, selected, onEditRow, onDeleteRow }) {
  const { id, name, amount, is_global, type } = row;
  const confirm = useBoolean();
  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>{id}</TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{amount}</TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (is_global === true && 'success') || (is_global === false && 'error') || 'default'
            }
          >
            {(is_global === true && 'Global') || (is_global === false && 'Local')}
          </Label>
        </TableCell>
        <TableCell>{type}</TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Tooltip title="Delete" placement="top" arrow>
            <IconButton onClick={confirm.onTrue}>
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
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure, you want to delete?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDeleteRow();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

TaxesTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
