import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import FormHelperText from '@mui/material/FormHelperText';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Iconify from 'src/components/iconify';
import PaymentNewCardDialog from '../payment/payment-new-card-dialog';
//

// ----------------------------------------------------------------------

export default function CheckoutPaymentMethods({ options, cardOptions, ...other }) {
  const { control } = useFormContext();

  const newCard = useBoolean();

  return (
    <>
      <Card {...other}>
        <CardHeader title="Payment" />

        <Controller
          name="payment"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Stack sx={{ px: 3, pb: 3 }}>
              {options.map((option) => (
                <OptionItem
                  option={option}
                  key={option.label}
                  onOpen={newCard.onTrue}
                  cardOptions={cardOptions}
                  selected={field.value === option.value}
                  isCredit={option.value === 'credit' && field.value === 'credit'}
                  onClick={() => {
                    field.onChange(option.value);
                  }}
                />
              ))}

              {!!error && (
                <FormHelperText error sx={{ pt: 1, px: 2 }}>
                  {error.message}
                </FormHelperText>
              )}
            </Stack>
          )}
        />
      </Card>

      <PaymentNewCardDialog open={newCard.value} onClose={newCard.onFalse} />
    </>
  );
}

CheckoutPaymentMethods.propTypes = {
  cardOptions: PropTypes.array,
  options: PropTypes.array,
};

// ----------------------------------------------------------------------

function OptionItem({ option, cardOptions, selected, isCredit, onOpen, ...other }) {
  const { value, label, description } = option;

  return (
    <Paper
      variant="outlined"
      key={value}
      sx={{
        p: 2.5,
        mt: 2.5,
        cursor: 'pointer',
        ...(selected && {
          boxShadow: (theme) => `0 0 0 2px ${theme.palette.text.primary}`,
        }),
      }}
      {...other}
    >
      <ListItemText
        primary={
          <Stack direction="row" alignItems="center">
            <Box component="span" sx={{ flexGrow: 1 }}>
              {label}
            </Box>
            <Stack spacing={1} direction="row" alignItems="center">
              {value === 'credit' && (
                <>
                  <Iconify icon="logos:mastercard" width={24} />,
                  <Iconify icon="logos:visa" width={24} />
                </>
              )}
              {value === 'PHONEPE' && (
                <Iconify icon="simple-icons:phonepe" style={{ color: '#5f259f' }} width={32} />
              )}
              {value === 'CASH_ON_DELIVERY' && (
                <Iconify icon="mdi:cash-on-delivery" style={{ color: '#367d39' }} width={32} />
              )}
            </Stack>
          </Stack>
        }
        secondary={description}
        primaryTypographyProps={{ typography: 'subtitle1', mb: 0.5 }}
        secondaryTypographyProps={{ typography: 'body2' }}
      />

      {isCredit && (
        <Stack
          spacing={2.5}
          alignItems="flex-end"
          sx={{
            pt: 2.5,
          }}
        >
          <TextField select fullWidth label="Cards" SelectProps={{ native: true }}>
            {cardOptions.map((card) => (
              <option key={card.value} value={card.value}>
                {card.label}
              </option>
            ))}
          </TextField>

          <Button
            size="small"
            color="primary"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={onOpen}
          >
            Add New Card
          </Button>
        </Stack>
      )}
    </Paper>
  );
}

OptionItem.propTypes = {
  cardOptions: PropTypes.array,
  isCredit: PropTypes.bool,
  onOpen: PropTypes.func,
  option: PropTypes.object,
  selected: PropTypes.bool,
};
