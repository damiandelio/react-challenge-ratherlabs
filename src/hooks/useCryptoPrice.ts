import { useQuery } from 'react-query';
import { fetchCryptoPrice } from '../common/api/cryptoApi';
import type { Cryptocurrency } from '../common/types';

export function useCryptoPrice(crypto: Cryptocurrency) {
  return useQuery(['cryptoPrice', crypto], () => fetchCryptoPrice(crypto), {
    refetchOnWindowFocus: true,
  });
}
