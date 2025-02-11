import { memo, useCallback } from 'react';
import type { UseFormReset } from 'react-hook-form';
import { ListItem, ListItemText, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useOrderStore } from '../state/orderState';
import type { Order, OrderFormValues } from '../common/types';

interface OrderItemProps {
  order: Order;
  selected: boolean;
  formReset: UseFormReset<OrderFormValues>;
}

export const OrderItem = memo<OrderItemProps>(
  ({ order, selected, formReset }) => {
    const deleteOrder = useOrderStore((state) => state.deleteOrder);

    const handleDeleteOrder = useCallback(
      () => deleteOrder(order.id),
      [deleteOrder, order.id],
    );

    const handleEditOrder = useCallback(() => {
      formReset({ ...order, quantity: String(order.quantity) });
    }, [order, formReset]);

    return (
      <ListItem
        divider
        secondaryAction={
          !selected ? (
            <>
              <IconButton
                aria-label="edit"
                onClick={handleEditOrder}
                sx={{ m: 0 }}
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
          ) : null
        }
        sx={{
          backgroundColor: selected ? 'rgba(156, 39, 176, 0.1)' : 'none',
          transition: 'background-color 0.2s ease-in-out',
        }}
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
    );
  },
);
