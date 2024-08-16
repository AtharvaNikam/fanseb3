import PropTypes from 'prop-types';
// @mui
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
// hooks
// components
import Label from 'src/components/label';
import { formatDate } from 'src/utils/constant';
//

// ----------------------------------------------------------------------

export default function UserTableRow({ row, selected, onUpdateUserPermission, onActivateUser }) {
  const { brand, amount, paymentMethod, status, created_at } = row;
  console.log('🚀 ~ row:', row);

  return (
    <TableRow hover selected={selected}>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>{brand?.name}</TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{amount}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{paymentMethod}</TableCell>

      <TableCell>
        <Label
          variant="soft"
          color={
            (status === 'approved' && 'success') ||
            (status === 'onHold' && 'info') ||
            (status === 'processing' && 'warning') ||
            (status === 'Pending' && 'primary') ||
            (status === 'rejected' && 'error') ||
            'default'
          }
        >
          {(status === 'approved' && 'Approved') ||
            (status === 'onHold' && 'On Hold') ||
            (status === 'processing' && 'Processing') ||
            (status === 'Pending' && 'Pending') ||
            (status === 'rejected' && 'Rejected') ||
            'Default'}
        </Label>
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>{formatDate(created_at)}</TableCell>
    </TableRow>
  );
}

UserTableRow.propTypes = {
  onActivateUser: PropTypes.func,
  onUpdateUserPermission: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
