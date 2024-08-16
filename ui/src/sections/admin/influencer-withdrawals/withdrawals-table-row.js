import PropTypes from 'prop-types';
// @mui
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
// hooks
// components
import { IconButton, Tooltip } from '@mui/material';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import { formatDate } from 'src/utils/constant';
//

// ----------------------------------------------------------------------

export default function WithdrawalsTableRow({
  row,
  selected,
  onEditRow,
  onUpdateUserPermission,
  onActivateUser,
}) {
  const { influencer, amount, paymentMethod, status, createdAt } = row;

  return (
    <TableRow hover selected={selected}>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>{influencer?.name}</TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{amount}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{paymentMethod}</TableCell>

      <TableCell>
        <Label
          variant="soft"
          color={
            (status === 'approved' && 'success') ||
            (status === 'onHold' && 'info') ||
            (status === 'processing' && 'warning') ||
            (status === 'pending' && 'primary') ||
            (status === 'rejected' && 'error') ||
            'default'
          }
        >
          {(status === 'approved' && 'Approved') ||
            (status === 'onHold' && 'On Hold') ||
            (status === 'processing' && 'Processing') ||
            (status === 'pending' && 'Pending') ||
            (status === 'rejected' && 'Rejected') ||
            'Default'}
        </Label>
      </TableCell>

      <TableCell>{formatDate(createdAt)}</TableCell>
      <TableCell>
        <Tooltip title="Edit" placement="top" arrow>
          <IconButton onClick={onEditRow}>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}

WithdrawalsTableRow.propTypes = {
  onActivateUser: PropTypes.func,
  onUpdateUserPermission: PropTypes.func,
  onEditRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
