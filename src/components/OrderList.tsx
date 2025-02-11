import { memo } from 'react';
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

export const OrderList = memo(() => {
  const orders = useOrderStore((state) => state.orders);
  const deleteOrder = useOrderStore((state) => state.deleteOrder);

  return (
    <Paper sx={{ p: 2, m: 2 }}>
      <Typography>Orders</Typography>
      {orders.length === 0 ? (
        <Typography color="textSecondary">No orders available.</Typography>
      ) : (
        <List>
          {orders.map((order) => (
            <ListItem
              key={'order-' + order.id}
              divider
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteOrder(order.id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={
                  <Typography>
                    {order.direction} {order.quantity} {order.cryptocurrency}
                  </Typography>
                }
                secondary={`Expires on: ${new Date(order.expiration).toLocaleString()}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
});
