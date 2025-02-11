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
import EditIcon from '@mui/icons-material/Edit';
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

    const handleEditOrder = useCallback(() => {
      // TODO: Add the logic to edit the order
    }, []);

    return (
      <ListItem
        divider
        secondaryAction={
          <>
            <IconButton
              aria-label="edit"
              onClick={handleEditOrder}
              sx={{ m: 0 }}
              disabled
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={handleDeleteOrder}
              sx={{ m: 0 }}
            >
              <DeleteIcon />
            </IconButton>
          </>
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
