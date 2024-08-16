import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
// components
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function CheckoutDelivery({ options, onApplyShipping, onApplyTax, ...other }) {
  const { control } = useFormContext();

  return (
    <Card {...other}>
      <CardHeader title="Delivery" />

      <Controller
        name="delivery"
        control={control}
        render={({ field }) => (
          <Box
            columnGap={2}
            rowGap={2.5}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
            sx={{ p: 3 }}
          >
            {options.map((option) => (
              <OptionItem
                key={option.amount}
                option={option}
                selected={field.value === option.amount}
                onClick={() => {
                  field.onChange(option.amount);
                  onApplyShipping(option.amount);
                }}
              />
            ))}
          </Box>
        )}
      />
    </Card>
  );
}

CheckoutDelivery.propTypes = {
  onApplyShipping: PropTypes.func,
  onApplyTax: PropTypes.func,
  options: PropTypes.array,
};

// ----------------------------------------------------------------------

function OptionItem({ option, selected, ...other }) {
  const { amount, type, name } = option;

  return (
    <Paper
      variant="outlined"
      key={amount}
      sx={{
        p: 2.5,
        cursor: 'pointer',
        display: 'flex',
        ...(selected && {
          boxShadow: (theme) => `0 0 0 2px ${theme.palette.text.primary}`,
        }),
      }}
      {...other}
    >
      {type === 'free' && <Iconify icon="carbon:bicycle" width={32} />}
      {type === 'standard' && <Iconify icon="carbon:delivery" width={32} />}
      {type === 'express' && <Iconify icon="carbon:rocket" width={32} />}

      <ListItemText
        sx={{ ml: 2 }}
        primary={
          <Stack direction="row" alignItems="center">
            <Box component="span" sx={{ flexGrow: 1 }}>
              {type}
            </Box>
            <Box component="span" sx={{ typography: 'h6' }}>{`₹${amount}`}</Box>
          </Stack>
        }
        secondary={name}
        primaryTypographyProps={{ typography: 'subtitle1', mb: 0.5 }}
        secondaryTypographyProps={{ typography: 'body2' }}
      />
    </Paper>
  );
}

OptionItem.propTypes = {
  option: PropTypes.object,
  selected: PropTypes.bool,
};
