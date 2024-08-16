import PropTypes from 'prop-types';
// @mui
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
// hooks
// components
import { Avatar, ListItemText } from '@mui/material';
import { ConfirmDialog } from 'src/components/custom-dialog';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { fToNow } from 'src/utils/format-time';
import QuestionsNewForm from './questions-new-form';
//

// ----------------------------------------------------------------------

export default function QuestionsTableRow({ row, selected, onDeleteRow }) {
  const { id, productsId, question, answer, user, products, updatedAt } = row;

  const collapse = useBoolean();
  const reply = useBoolean();

  const Question = `Q: ${question} ?`;
  const Answer = `A: ${answer || 'Not Answered'}`;

  const QuestionAnswer = (
    <ListItemText
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: { xs: 'row', md: 'column' },
      }}
      primary={Question}
      secondary={Answer}
      primaryTypographyProps={{ noWrap: true, typography: 'subtitle2', mb: 0.5 }}
      secondaryTypographyProps={{ noWrap: true, typography: 'subtitle2', component: 'span' }}
    />
  );

  const CustomerName = user?.name;
  const Image = products?.image?.fileUrl;
  const ProductName = products?.name;
  const Date = fToNow(updatedAt);

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell>
          <Avatar alt={CustomerName} src={Image} sx={{ mr: 2 }} />
        </TableCell>
        <TableCell>{QuestionAnswer}</TableCell>
        <TableCell>{CustomerName}</TableCell>
        <TableCell>{ProductName}</TableCell>
        <TableCell>{Date}</TableCell>

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

      <QuestionsNewForm
        id={id}
        row={row}
        productId={productsId}
        open={reply.value}
        onClose={reply.onFalse}
      />

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
              onDeleteRow(productsId, id);
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

QuestionsTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
