import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { InfoData, PriceData } from "../types/crypto";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import {
  Outlet,
  useLocation,
  useParams,
  Link,
  useMatch,
} from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 48px;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.accentB};
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.div`
  margin: 20px 0px;
  line-height: 1.5;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.accentA};
  cursor: pointer;
  text-decoration: underline;
  padding: 5px 0;
  margin-top: 10px;
  font-size: 14px;

  &:hover {
    color: ${(props) => props.theme.accentC};
  }
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ $isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) => props.theme.accentB};
  padding: 7px 0px;
  border-radius: 10px;
  width: 100%;
  color: ${(props) =>
    props.$isActive ? props.theme.accentA : props.theme.accentC};
  a {
    display: block;
  }
`;

// const CoinImage = styled.img`
//   width: 35px;
//   height: 35px;
// `;

interface RouteState {
  name: string;
}

function Coin() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { coinId } = useParams();
  const location = useLocation();
  const state = location.state as RouteState;

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>({
    queryKey: ["info", coinId],
    queryFn: () => fetchCoinInfo(coinId!),
  });

  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>({
    queryKey: ["tickers", coinId],
    queryFn: () => fetchCoinTickers(coinId!),
    // refetchInterval: 5000,
  });

  const loading = infoLoading || tickersLoading;

  // returns a match object if the current location matches the path prop
  const priceMatch = useMatch("coin/:coinId/price"); // Full Path Usage
  const chartMatch = useMatch(`coin/${coinId}/chart`); // Dynamic Route with coinId

  // Get the latest price from the prices array
  const currentPrice =
    tickersData?.prices?.[tickersData.prices.length - 1]?.[1];

  const truncateDescription = (text: string, maxLength: number) => {
    if (!text) return "";
    if (text.length <= maxLength || isExpanded) return text;
    return text.slice(0, maxLength) + "...";
  };

  // <Title> Ensures that the appropriate data is displayed using the state and info api data objects
  // regardless of the path used to access the page
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        {/* {!loading && infoData?.image?.small && (
          <CoinImage src={infoData.image.small} alt={infoData.name} />
        )} */}
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.market_cap_rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>{infoData?.symbol.toUpperCase()}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${currentPrice?.toFixed(2)}</span>
            </OverviewItem>
          </Overview>

          <Description>
            {truncateDescription(infoData?.description?.en || "", 200)}
            {infoData?.description?.en &&
              infoData.description.en.length > 200 && (
                <ToggleButton onClick={() => setIsExpanded(!isExpanded)}>
                  {isExpanded ? "Show Less" : "Read More"}
                </ToggleButton>
              )}
          </Description>

          <Overview>
            <OverviewItem>
              <span>Score:</span>
              <span>{infoData?.coingecko_score?.toFixed(2)}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.coingecko_rank}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab $isActive={chartMatch !== null}>
              <Link to="chart">Chart</Link>
            </Tab>
            <Tab $isActive={priceMatch !== null}>
              <Link to="price">Price</Link>
            </Tab>
          </Tabs>

          <Outlet />
        </>
      )}
    </Container>
  );
}

export default Coin;
