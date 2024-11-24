import { Helmet } from "react-helmet";
import { fetchCoins } from "../api";
import { CoinInterface } from "../types/crypto";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.accentB};
  color: ${(props) => props.theme.accentA};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentC};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const CoinInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

// const Symbol = styled.span`
//   font-size: 0.8em;
//   color: ${(props) => props.theme.accentC};
// `;

function Coins() {
  const { isLoading, data } = useQuery<CoinInterface[]>({
    queryKey: ["allCoins"],
    queryFn: fetchCoins,
  });

  return (
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header>
        <Title>COINS</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`coin/${coin.id}`} state={{ name: coin.name }}>
                <Img src={coin.image} alt={coin.name} />
                <CoinInfo>
                  {coin.name}
                  {/* <Symbol>{coin.symbol.toUpperCase()}</Symbol> */}
                </CoinInfo>
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
export default Coins;
