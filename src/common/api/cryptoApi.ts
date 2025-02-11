import type { Cryptocurrency } from '../types';

export async function fetchCryptoPrice(
  crypto: Cryptocurrency,
): Promise<number> {
  const coinGeckoIds: Record<Cryptocurrency, string> = {
    Bitcoin: 'bitcoin',
    Ethereum: 'ethereum',
  };

  const id = coinGeckoIds[crypto];

  const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch');
  }

  const data = await response.json();

  return data[id].usd;
}
