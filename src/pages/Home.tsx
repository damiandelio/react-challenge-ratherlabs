import { memo } from 'react';
import { Box } from '@mui/material';
import { OrderFormProvider } from '../providers/OrderFormProvider';
import { OrderForm } from '../components/OrderForm';
import { OrderList } from '../components/OrderList';

export const Home = memo(() => {
  return (
    <OrderFormProvider>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { md: '23rem 1fr' },
          gap: '1rem',
          width: '100%',
          height: '100vh',
          p: 2,
          background: '#f3f4f6',
        }}
      >
        <OrderForm />
        <OrderList />
      </Box>
    </OrderFormProvider>
  );
});
