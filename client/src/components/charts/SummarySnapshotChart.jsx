import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import useAuth from "../../../hooks/useAuth";
import { Box, Flex, Text } from "@chakra-ui/react";

const serverURL = import.meta.env.VITE_SERVER_URL;

const SummarySnapshotChart = ({ lgaName, date, onFetchError }) => {
  const [data, setData] = useState([]);
  const { accessToken, isAuthLoading } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${serverURL}/api/data/summary/${lgaName}?start=${date}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const json = await res.json();

        if (json.message) throw new Error(json.message);

        const formatted = json.map((item) => ({
          date: item.date,
          spend: item.spend,
          cards: item.cards_seen,
          adr: item.average_daily_rate,
        }));

        setData(formatted);
      } catch (error) {
        onFetchError(error);
      }
    };
    if (!isAuthLoading && lgaName && accessToken && date) fetchData();
  }, [date, lgaName, accessToken, isAuthLoading]);
  return (
    <Box w="100%">
      <ResponsiveContainer width="100%" height={300}>
        {!date && (
          <Flex justifyContent="center" alignItems="center">
            <Text as="p" color={"black"}>
              {" "}
              Please select date range to show ↗️
            </Text>
          </Flex>
        )}
        {date && (
          <ComposedChart data={data} margin={{ left: 15, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              angle={-45}
              textAnchor="end"
              tickFormatter={(d) =>
                new Date(d).toLocaleDateString("en-AU", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <YAxis
              yAxisId="left"
              domain={([min, max]) => {
                const padding = (max - min) * 0.1; // 10% headroom
                return [min - padding, max + padding];
              }}
              tickFormatter={(value) =>
                value >= 1_000_000
                  ? `$${(value / 1_000_000).toFixed(0)}M`
                  : `$${(value / 1000).toFixed(0)}K`
              }
            />
            <YAxis
              yAxisId="right"
              domain={["auto"]}
              orientation="right"
              tickFormatter={(value) =>
                value >= 1_000_000
                  ? `${(value / 1_000_000).toFixed(0)}M`
                  : `${(value / 1000).toFixed(0)}K`
              }
            />
            <Tooltip
              labelFormatter={() => ""}
              formatter={(value, name) => {
                if (name === "Spend")
                  return [
                    `$${Number(value).toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}`,
                    name,
                  ];
                if (name === "Unique Visitors")
                  return [Number(value).toLocaleString(), name];
              }}
            />
            <Legend verticalAlign="top" />

            <Bar yAxisId="left" dataKey="spend" name="Spend" fill="#3b82f6" />
            <Line
              yAxisId="right"
              dataKey="cards"
              name="Unique Visitors"
              stroke="#10b981"
              strokeWidth={2}
            />
          </ComposedChart>
        )}
      </ResponsiveContainer>
    </Box>
  );
};

export default SummarySnapshotChart;
