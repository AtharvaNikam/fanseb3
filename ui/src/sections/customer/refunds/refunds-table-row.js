import PropTypes from 'prop-types';
// @mui
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
// hooks
// components
import { ConfirmDialog } from 'src/components/custom-dialog';
import Label from 'src/components/label';
import { useBoolean } from 'src/hooks/use-boolean';
import { fToNow } from 'src/utils/format-time';
//

// ----------------------------------------------------------------------

export default function ProductTableRow({ row, selected, onDeleteRow }) {
  const { name, image, title, description, orders, amount, status, createdAt } = row;
  console.log('🚀 ~ row:', row);

  const collapse = useBoolean();

  return (
    <>
      <TableRow hover selected={selected}>
        {/* <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={name} src={image?.original} sx={{ mr: 2 }} />

          <ListItemText primary={name} primaryTypographyProps={{ typography: 'body2' }} />
        </TableCell> */}
        <TableCell>{title}</TableCell>
        <TableCell>{description}</TableCell>
        <TableCell>
          <Label
            variant="soft"
            color={
              (status === 'reject' && 'error') ||
              (status === 'pending' && 'warning') ||
              (status === 'processing' && 'warning') ||
              (status === 'approved' && 'success') ||
              'default'
            }
          >
            {(status === 'pending' && 'Pending') ||
              (status === 'processing' && 'Processing') ||
              (status === 'complete' && 'Complete') ||
              (status === 'reject' && 'Reject') ||
              'Unknown'}
          </Label>
        </TableCell>
        <TableCell>{orders.trackingNumber}</TableCell>
        <TableCell>₹{amount}</TableCell>
        <TableCell>{fToNow(createdAt)}</TableCell>

        {/* <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
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
        </TableCell> */}
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
