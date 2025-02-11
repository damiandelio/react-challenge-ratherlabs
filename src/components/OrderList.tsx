import { memo } from 'react';
import { Paper, List, Typography } from '@mui/material';
import { useOrderStore } from '../state/orderState';
import { OrderItem } from './OrderItem';

export const OrderList = memo(() => {
  const orders = useOrderStore((state) => state.orders);

  return (
    <Paper sx={{ p: 2, overflowY: 'auto' }}>
      {orders.length === 0 ? (
        <Typography color="textSecondary">No orders available.</Typography>
      ) : (
        <List>
          {orders.map((order) => (
            <OrderItem {...order} key={`order-${order.id}`} />
          ))}
        </List>
      )}
    </Paper>
  );
});
