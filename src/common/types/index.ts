export enum Cryptocurrency {
  Bitcoin = 'Bitcoin',
  Ethereum = 'Ethereum',
}

export enum OrderDirection {
  Buy = 'Buy',
  Sell = 'Sell',
}

export interface Order {
  id: string;
  direction: OrderDirection;
  cryptocurrency: Cryptocurrency;
  quantity: number;
  expiration: string; // ISO string in UTC
}

export interface OrderFormValues {
  id: string;
  direction: OrderDirection;
  cryptocurrency: Cryptocurrency;
  quantity: string;
  expiration: string;
}
