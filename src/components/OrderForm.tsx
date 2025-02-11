import { memo } from 'react';
import { useForm, useController } from 'react-hook-form';
import {
  MenuItem,
  Select,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
} from '@mui/material';
import { convertLocalToUtc, convertUtcToLocal } from '../common/helpers/time';
import {
  OrderDirection,
  OrderFormValues,
  Cryptocurrency,
} from '../common/types';

const CRYPTOCURRENCIES = [
  { label: 'Bitcoin', value: Cryptocurrency.Bitcoin },
  { label: 'Ethereum', value: Cryptocurrency.Ethereum },
];

const usdValue = 100; // TODO: Should be fetched from an API

export const OrderForm = memo(() => {
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

  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
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
      <p>Equivalent USD: {usdValue !== null ? usdValue.toFixed(2) : '—'}</p>

      {/* Expiration Date */}
      <TextField
        type="datetime-local"
        {...expirationField}
        value={
          expirationField.value ? convertUtcToLocal(expirationField.value) : ''
        }
        onChange={e => {
          expirationField.onChange({
            ...e,
            target: { value: convertLocalToUtc(e.target.value) },
          });
        }}
      />
      <p>UTC Time: {expirationField.value || '—'}</p>

      {/* Submit Button */}
      <Button type="submit" variant="contained" color="primary">
        Place Order
      </Button>
    </form>
  );
});
