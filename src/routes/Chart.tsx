import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchCoinTickers } from "../api";
import { PriceData } from "../types/crypto";
import ApexChart from "react-apexcharts";
import styled from "styled-components";

const ChartContainer = styled.div`
  padding: 20px;
`;

function Chart() {
  const { coinId } = useParams();
  const { isLoading, data } = useQuery<PriceData>({
    queryKey: ["chartTickers", coinId],
    queryFn: () => fetchCoinTickers(coinId!),
    // refetchInterval: 10000,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  // Convert timestamp to readable date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const options: ApexCharts.ApexOptions = {
    chart: {
      height: 350,
      toolbar: { show: false },
      background: "transparent",
    },
    grid: { show: false },
    theme: {
      mode: "dark" as const, // 여기를 수정
    },
    xaxis: {
      type: "datetime",
      categories: data?.prices.map((price) => formatDate(price[0])),
      labels: {
        show: false,
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      show: false,
    },
    stroke: {
      curve: "smooth",
      width: 4,
    },
    fill: {
      type: "gradient",
      gradient: {
        gradientToColors: ["#0be881"],
        stops: [0, 100],
      },
    },
    colors: ["#0fbcf9"],
    tooltip: {
      y: {
        formatter: (value: number) => `$${value.toFixed(2)}`,
      },
    },
  };

  return (
    <ChartContainer>
      <ApexChart
        type="line"
        options={options}
        series={[
          {
            name: "Price",
            data: data?.prices?.map((price) => price[1]) ?? [],
          },
        ]}
        height={350}
      />
    </ChartContainer>
  );
}

export default Chart;
