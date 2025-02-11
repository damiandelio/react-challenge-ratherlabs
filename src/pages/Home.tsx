import { memo } from 'react';
import { OrderForm } from '../components/OrderForm';
import { OrderList } from '../components/OrderList';

export const Home = memo(() => {
  return (
    <div>
      <OrderForm />
      <OrderList />
    </div>
  );
});
