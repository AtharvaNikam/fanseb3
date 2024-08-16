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
import { formatDate } from 'src/utils/constant';
import { fDate } from 'src/utils/format-time';
//

// ----------------------------------------------------------------------

export default function RefundsTableRow({ row, selected, onDeleteRow, onEditRow }) {
  const { amount, createdAt, id, title, orders, user, status } = row;

  const collapse = useBoolean();

  const Status = status;
  const Reason = title;
  const TrackingNumber = orders?.trackingNumber;
  const Created = createdAt;
  const OrderDate = orders?.createdAt;
  const CustomerEmail = user?.email || 'N/A';

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell>{id}</TableCell>
        <TableCell>{Reason}</TableCell>

        <TableCell>{CustomerEmail}</TableCell>
        <TableCell>{amount}</TableCell>
        <TableCell>{TrackingNumber}</TableCell>
        <TableCell>{formatDate(Created)}</TableCell>
        <TableCell>{fDate(OrderDate)}</TableCell>

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

        <TableCell align="center" sx={{ px: 1, whiteSpace: 'nowrap' }}>
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
          <Tooltip title="Edit" placement="top" arrow>
            <IconButton
              onClick={() => {
                onEditRow(id);
              }}
            >
              <Iconify icon="solar:pen-bold" />
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

RefundsTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
