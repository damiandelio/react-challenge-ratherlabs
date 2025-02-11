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
  Box,
} from '@mui/material';
import { useOrderStore } from '../state/orderState';
import { useCryptoPrice } from '../hooks/useCryptoPrice';
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

export const OrderForm = memo(() => {
  const addOrder = useOrderStore((state) => state.addOrder);

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

  const { data: price, refetch: refetchCryptoPrice } = useCryptoPrice(
    cryptocurrencyField.value,
  );

  const handleQuantityChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      quantityField.onChange(e);
      refetchCryptoPrice(); // TODO: This call could be debounced
    },
    [quantityField, refetchCryptoPrice],
  );

  const handleExpirationChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      expirationField.onChange({
        ...e,
        target: { value: convertLocalToUtc(e.target.value) },
      });
    },
    [expirationField],
  );

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

  const valueInUsd: number =
    price !== undefined ? price * Number(quantityField.value) : 0;

  return (
    <Paper sx={{ p: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'grid', gap: '1rem' }}>
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
            {CRYPTOCURRENCIES.map((crypto) => (
              <MenuItem key={crypto.value} value={crypto.value}>
                {crypto.label}
              </MenuItem>
            ))}
          </Select>

          {/* Quantity */}
          <div>
            <TextField
              type="number"
              {...quantityField}
              onChange={handleQuantityChange}
              placeholder="Quantity"
              sx={{ width: '100%' }}
            />
            <Typography variant="body2" color="textSecondary">
              Equivalent USD: {valueInUsd.toFixed(2)}
            </Typography>
          </div>

          {/* Expiration Date */}
          <div>
            <TextField
              type="datetime-local"
              {...expirationField}
              value={
                expirationField.value
                  ? convertUtcToLocal(expirationField.value)
                  : ''
              }
              onChange={handleExpirationChange}
              sx={{ width: '100%' }}
            />
            <Typography variant="body2" color="textSecondary">
              UTC Time: {expirationField.value || '—'}
            </Typography>
          </div>

          {/* Submit Button */}
          <Button type="submit" variant="contained" color="primary">
            Place Order
          </Button>
        </Box>
      </form>
    </Paper>
  );
});
