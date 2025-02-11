import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Paper, List, Typography } from '@mui/material';
import { useOrderStore } from '../state/orderState';
import { OrderItem } from './OrderItem';
import type { OrderFormValues } from '../common/types';

export const OrderList = memo(() => {
  const orders = useOrderStore((state) => state.orders);

  const { watch, reset } = useFormContext<OrderFormValues>();

  const currentOrderId = watch('id');

  return (
    <Paper sx={{ p: 2, overflowY: 'auto' }}>
      {orders.length === 0 ? (
        <Typography color="textSecondary">No orders available.</Typography>
      ) : (
        <List>
          {orders.map((order) => (
            <OrderItem
              order={order}
              selected={order.id === currentOrderId}
              formReset={reset}
              key={`order-${order.id}`}
            />
          ))}
        </List>
      )}
    </Paper>
  );
});
