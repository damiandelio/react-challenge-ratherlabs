import { memo } from 'react';
import { OrderForm } from '../components/OrderForm';

export const Home = memo(() => {
  return (
    <div>
      <OrderForm />
    </div>
  );
});
