import { memo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import {
  Cryptocurrency,
  OrderDirection,
  type OrderFormValues,
} from '../common/types';

interface OrderFormProviderProps {
  children: React.ReactNode;
}

export const OrderFormProvider = memo<OrderFormProviderProps>(
  ({ children }) => {
    const methods = useForm<OrderFormValues>({
      defaultValues: {
        id: '',
        direction: OrderDirection.Buy,
        cryptocurrency: Cryptocurrency.Bitcoin,
        quantity: '',
        expiration: '',
      },
    });

    return <FormProvider {...methods}>{children}</FormProvider>;
  },
);
