const BASE_URL = `https://api.coingecko.com/api/v3`;

export async function fetchCoins() {
  const response = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
  );
  return response.json();
}

export async function fetchCoinInfo(coinId: string) {
  const response = await fetch(
    `${BASE_URL}/coins/${coinId}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false`
  );
  return response.json();
}

export async function fetchCoinTickers(coinId: string) {
  const response = await fetch(
    `${BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=7&interval=daily`
  );
  return response.json();
}
