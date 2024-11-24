import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchCoinTickers } from "../api";
import { PriceData } from "../types/crypto";
import styled from "styled-components";

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 0;
`;

const PriceItem = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.accentB};
  padding: 20px;
  border-radius: 10px;
`;

const Label = styled.span`
  font-weight: bold;
`;

const Value = styled.span<{ $isPositive?: boolean }>`
  color: ${(props) =>
    props.$isPositive === undefined
      ? "inherit"
      : props.$isPositive
      ? "#00b894"
      : "#d63031"};
`;

function Price() {
  const { coinId } = useParams();
  const { isLoading, data } = useQuery<PriceData>({
    queryKey: ["price", coinId],
    queryFn: () => fetchCoinTickers(coinId!),
    // refetchInterval: 5000,
  });

  if (isLoading) return <span>Loading...</span>;

  // Get the latest and previous day's prices
  const currentPrice = data?.prices[data.prices.length - 1][1];
  const yesterdayPrice = data?.prices[data.prices.length - 2][1];

  // Calculate price change
  const priceChange =
    currentPrice && yesterdayPrice
      ? ((currentPrice - yesterdayPrice) / yesterdayPrice) * 100
      : 0;

  // Get highest and lowest prices from the week
  const highestPrice = Math.max(
    ...(data?.prices.map((price) => price[1]) ?? [])
  );
  const lowestPrice = Math.min(
    ...(data?.prices.map((price) => price[1]) ?? [])
  );

  return (
    <PriceContainer>
      <PriceItem>
        <Label>Current Price:</Label>
        <Value>${currentPrice?.toFixed(2)}</Value>
      </PriceItem>

      <PriceItem>
        <Label>24h Change:</Label>
        <Value $isPositive={priceChange > 0}>{priceChange.toFixed(2)}%</Value>
      </PriceItem>

      <PriceItem>
        <Label>7d Highest:</Label>
        <Value>${highestPrice.toFixed(2)}</Value>
      </PriceItem>

      <PriceItem>
        <Label>7d Lowest:</Label>
        <Value>${lowestPrice.toFixed(2)}</Value>
      </PriceItem>
    </PriceContainer>
  );
}

export default Price;
