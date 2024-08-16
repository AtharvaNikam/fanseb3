import PropTypes from 'prop-types';
// @mui
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
// hooks
// components
import { Avatar, Rating } from '@mui/material';
import { ConfirmDialog } from 'src/components/custom-dialog';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { fDate } from 'src/utils/format-time';
//

// ----------------------------------------------------------------------

export default function ReviewsTableRow({ row, selected, onDeleteRow }) {
  const { id, review, ratings, products, Reports, updatedAt } = row;

  const collapse = useBoolean();

  const isActive = true;

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell>
          <Avatar alt={review} src={products.image.fileUrl} sx={{ mr: 2 }} />
        </TableCell>
        <TableCell>{review}</TableCell>
        <TableCell>
          <Rating name="simple-controlled" value={ratings} readOnly />
        </TableCell>
        <TableCell>{products.name}</TableCell>
        <TableCell>{Reports}</TableCell>
        <TableCell>{fDate(updatedAt)}</TableCell>

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
              onDeleteRow(products.id);
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

ReviewsTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
