import PropTypes from 'prop-types';
// @mui
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
// hooks
// components
import Label from 'src/components/label';
//

// ----------------------------------------------------------------------

export default function UserTableRow({ row, selected, onUpdateUserPermission, onActivateUser }) {
  const { influencer, amount, status, createdAt } = row;

  function formatDate(timestamp) {
    const currentDate = new Date();
    const date = new Date(timestamp);

    const timeDifference = currentDate - date;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
      return years === 1 ? 'a year ago' : `${years} years ago`;
      // eslint-disable-next-line no-else-return
    } else if (months > 0) {
      return months === 1 ? 'a month ago' : `${months} months ago`;
    } else if (days > 0) {
      return days === 1 ? 'yesterday' : `${days} days ago`;
    } else if (hours > 0) {
      return hours === 1 ? 'an hour ago' : `${hours} hours ago`;
    } else if (minutes > 0) {
      return minutes === 1 ? 'a minute ago' : `${minutes} minutes ago`;
    } else {
      return 'just now';
    }
  }
  return (
    <TableRow hover selected={selected}>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>{influencer?.name}</TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{amount}</TableCell>

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

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>{formatDate(createdAt)}</TableCell>
    </TableRow>
  );
}

UserTableRow.propTypes = {
  onActivateUser: PropTypes.func,
  onUpdateUserPermission: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
