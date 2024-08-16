import PropTypes from 'prop-types';
// @mui
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
// utils
// components
import Scrollbar from 'src/components/scrollbar';

// ----------------------------------------------------------------------

export default function BrandDetailsItems({ items }) {
  return (
    <Card>
      <CardHeader title="Cover Image" />

      <Stack p={3}>
        <Scrollbar>
          <Stack direction="column" alignItems="center">
            <Avatar
              src={items}
              alt="brand cover image"
              variant="rounded"
              sx={{ width: 480, height: 240 }}
            />
          </Stack>
        </Scrollbar>
      </Stack>
    </Card>
  );
}

BrandDetailsItems.propTypes = {
  items: PropTypes.any,
};
