import PropTypes from 'prop-types';
// @mui
import Stack from '@mui/material/Stack';
// utils
// components
import { Divider, ListItemText, Typography } from '@mui/material';
import { fDate } from 'src/utils/format-time';

// ----------------------------------------------------------------------

export default function ProductQuestionsItem({ questions }) {
  const { question, answer, updatedAt } = questions;

  const _question = `Q: ${question}`;
  const _answer = `A: ${answer || 'Not Answered'}`;

  return (
    <Stack
      spacing={2}
      direction={{
        xs: 'column',
        md: 'row',
      }}
      sx={{ mt: 5, mx: 2, px: { xs: 2.5, md: 0 } }}
    >
      <Stack spacing={1} flexGrow={1}>
        <ListItemText
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: { xs: 'row', md: 'column' },
          }}
          primary={_question}
          secondary={_answer}
          primaryTypographyProps={{ noWrap: true, typography: 'subtitle1', mb: 0.5 }}
          secondaryTypographyProps={{ noWrap: true, typography: 'subtitle1', component: 'span' }}
        />

        <Typography variant="caption">Date: {fDate(updatedAt)}</Typography>
      </Stack>
      <Divider sx={{ borderStyle: 'dashed' }} />
    </Stack>
  );
}

ProductQuestionsItem.propTypes = {
  questions: PropTypes.object,
};
