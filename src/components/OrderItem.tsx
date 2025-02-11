import { memo, useCallback } from 'react';
import { ListItem, ListItemText, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useOrderStore } from '../state/orderState';
import type { Order } from '../common/types';

export const OrderItem = memo<Order>(
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
