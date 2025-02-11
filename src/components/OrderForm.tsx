import { memo, useCallback } from 'react';
import { useForm, useController } from 'react-hook-form';
import {
  Paper,
  MenuItem,
  Select,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  Typography,
} from '@mui/material';
import { useOrderStore } from '../state/orderState';
import { convertLocalToUtc, convertUtcToLocal } from '../common/helpers/time';
import {
  OrderDirection,
  Cryptocurrency,
  type OrderFormValues,
} from '../common/types';

const CRYPTOCURRENCIES = [
  { label: 'Bitcoin', value: Cryptocurrency.Bitcoin },
  { label: 'Ethereum', value: Cryptocurrency.Ethereum },
];

const usdValue = 100; // TODO: Should be fetched from an API

export const OrderForm = memo(() => {
  const addOrder = useOrderStore(state => state.addOrder);
  // const updateOrder = useOrderStore(state => state.updateOrder);

  const { control, handleSubmit } = useForm<OrderFormValues>({
    defaultValues: {
      direction: OrderDirection.Buy,
      cryptocurrency: Cryptocurrency.Bitcoin,
      quantity: '',
      expiration: '',
    },
  });

  const { field: directionField } = useController({
    name: 'direction',
    control,
    rules: { required: true },
  });

  const { field: cryptocurrencyField } = useController({
    name: 'cryptocurrency',
    control,
    rules: { required: true },
  });

  const { field: quantityField } = useController({
    name: 'quantity',
    control,
    rules: { required: true },
  });

  const { field: expirationField } = useController({
    name: 'expiration',
    control,
    rules: { required: true },
  });

  const onSubmit = useCallback(
    (data: OrderFormValues) => {
      addOrder({
        direction: data.direction,
        cryptocurrency: data.cryptocurrency,
        quantity: Number(data.quantity),
        expiration: data.expiration,
      });
    },
    [addOrder],
  );

  return (
    <Paper sx={{ p: 2, m: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Order Direction */}
        <RadioGroup row {...directionField}>
          <FormControlLabel
            value={OrderDirection.Buy}
            control={<Radio />}
            label="Buy"
          />
          <FormControlLabel
            value={OrderDirection.Sell}
            control={<Radio />}
            label="Sell"
          />
        </RadioGroup>

        {/* Cryptocurrency */}
        <Select {...cryptocurrencyField}>
          {CRYPTOCURRENCIES.map(crypto => (
            <MenuItem key={crypto.value} value={crypto.value}>
              {crypto.label}
            </MenuItem>
          ))}
        </Select>

        {/* Quantity */}
        <TextField type="number" {...quantityField} placeholder="Quantity" />
        <Typography>
          Equivalent USD: {usdValue !== null ? usdValue.toFixed(2) : '—'}
        </Typography>

        {/* Expiration Date */}
        <TextField
          type="datetime-local"
          {...expirationField}
          value={
            expirationField.value
              ? convertUtcToLocal(expirationField.value)
              : ''
          }
          onChange={e => {
            expirationField.onChange({
              ...e,
              target: { value: convertLocalToUtc(e.target.value) },
            });
          }}
        />
        <Typography>UTC Time: {expirationField.value || '—'}</Typography>

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary">
          Place Order
        </Button>
      </form>
    </Paper>
  );
});
