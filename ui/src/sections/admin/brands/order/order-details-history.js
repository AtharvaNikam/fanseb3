import PropTypes from 'prop-types';
// @mui

import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
  timelineItemClasses,
} from '@mui/lab';
import { Box, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import { fDateTime } from 'src/utils/format-time';
// utils

// ----------------------------------------------------------------------

export default function OrderDetailsHistory({ status, orderStatuses }) {
  let timeline = [];
  timeline = orderStatuses.map((item) => ({
    id: item.id,
    title: item.name,
    time: item.createdAt,
    serial: item.serial,
  }));
  timeline.sort((a, b) => a.serial - b.serial);
  // const renderSummary = (
  //   <Stack
  //     spacing={2}
  //     component={Paper}
  //     variant="outlined"
  //     sx={{
  //       p: 2.5,
  //       minWidth: 260,
  //       flexShrink: 0,
  //       borderRadius: 2,
  //       typography: 'body2',
  //       borderStyle: 'dashed',
  //     }}
  //   >
  //     <Stack spacing={0.5}>
  //       <Box sx={{ color: 'text.disabled' }}>Order time</Box>
  //       {fDateTime(status.orderTime)}
  //     </Stack>
  //     <Stack spacing={0.5}>
  //       <Box sx={{ color: 'text.disabled' }}>Payment time</Box>
  //       {fDateTime(status.orderTime)}
  //     </Stack>
  //     <Stack spacing={0.5}>
  //       <Box sx={{ color: 'text.disabled' }}>Delivery time for the carrier</Box>
  //       {fDateTime(status.orderTime)}
  //     </Stack>
  //     <Stack spacing={0.5}>
  //       <Box sx={{ color: 'text.disabled' }}>Completion time</Box>
  //       {fDateTime(status.orderTime)}
  //     </Stack>
  //   </Stack>
  // );

  const renderTimeline = (
    <Timeline
      sx={{
        p: 0,
        m: 0,
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      {timeline.map((item, index) => {
        const firstTimeline = item.serial === status;

        const lastTimeline = index === timeline.length - 1;

        return (
          <TimelineItem key={item.title}>
            <TimelineSeparator>
              <TimelineDot color={(firstTimeline && 'primary') || 'grey'} />
              {lastTimeline ? null : <TimelineConnector />}
            </TimelineSeparator>

            <TimelineContent>
              <Typography variant="subtitle2">{item.title}</Typography>

              <Box sx={{ color: 'text.disabled', typography: 'caption', mt: 0.5 }}>
                {fDateTime(item.time)}
              </Box>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );

  return (
    <Card>
      <CardHeader title="History" />
      <Stack
        spacing={3}
        alignItems={{ md: 'flex-start' }}
        direction={{ xs: 'column-reverse', md: 'row' }}
        sx={{ p: 3 }}
      >
        {renderTimeline}
        {/* {renderSummary} */}
      </Stack>
    </Card>
  );
}

OrderDetailsHistory.propTypes = {
  status: PropTypes.any,
  orderStatuses: PropTypes.any,
};
