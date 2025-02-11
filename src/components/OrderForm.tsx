import { memo, useCallback } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
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
  const updateOrder = useOrderStore((state) => state.updateOrder);

  const {
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useFormContext<OrderFormValues>();

  const { field: directionField } = useController({
    name: 'direction',
    rules: { required: true },
  });

  const { field: cryptocurrencyField } = useController({
    name: 'cryptocurrency',
    rules: { required: true },
  });

  const { field: quantityField } = useController({
    name: 'quantity',
    rules: { required: 'Quantity required.' },
  });

  const { field: expirationField } = useController({
    name: 'expiration',
    rules: { required: 'Expiration date required.' },
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

  const stopEditing = useCallback(() => setValue('id', ''), [setValue]);

  const orderId = watch('id');
  const isEditing: boolean = !!orderId;

  const onSubmit = useCallback(
    (data: OrderFormValues) => {
      const newOrder = {
        direction: data.direction,
        cryptocurrency: data.cryptocurrency,
        quantity: Number(data.quantity),
        expiration: data.expiration,
      };

      if (isEditing) {
        updateOrder({ ...newOrder, id: orderId });
        stopEditing();
      } else {
        addOrder(newOrder);
      }
    },
    [addOrder, isEditing, orderId, stopEditing, updateOrder],
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
              label="Quantity"
              placeholder="Quantity"
              sx={{ width: '100%' }}
            />
            <Typography variant="body2" color="textSecondary">
              Equivalent USD: {valueInUsd.toFixed(2)}
            </Typography>
            <ErrorMessage errors={errors} name="quantity" render={ErrorText} />
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
            <ErrorMessage
              errors={errors}
              name="expiration"
              render={ErrorText}
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" variant="contained" color="primary">
            {isEditing ? 'Update Order' : 'Place New Order'}
          </Button>

          {/* Stop Editing Button */}
          {isEditing && (
            <Button onClick={stopEditing} variant="contained" color="secondary">
              Stop Editing
            </Button>
          )}
        </Box>
      </form>
    </Paper>
  );
});

const ErrorText = ({ message }: { message: string }) => {
  return (
    <Typography variant="body2" color="error">
      {message}
    </Typography>
  );
};
