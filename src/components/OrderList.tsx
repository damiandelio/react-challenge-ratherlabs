import { memo, useCallback } from 'react';
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useOrderStore } from '../state/orderState';
import type { Order } from '../common/types';

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

const OrderItem = memo<Order>(
  ({ id, direction, cryptocurrency, quantity, expiration }) => {
    const deleteOrder = useOrderStore((state) => state.deleteOrder);

    const handleDeleteOrder = useCallback(
      () => deleteOrder(id),
      [deleteOrder, id],
    );

    return (
      <ListItem
        divider
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={handleDeleteOrder}
          >
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemText
          primary={
            <Typography>
              {direction} {quantity} {cryptocurrency}
            </Typography>
          }
          secondary={`Expires on: ${new Date(expiration).toLocaleString()}`}
        />
      </ListItem>
    );
  },
);
