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
import { monthMap } from "@/utils/maps";
import { Box, Flex, Text } from "@chakra-ui/react";

const SummarySnapshotChart = ({ lgaName, date }) => {
  const [data, setData] = useState([]);
  const { accessToken, authError, isAuthLoading } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/data/summary/${lgaName}?start=${date}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const json = await res.json();

        if (authError) throw error;

        const formatted = json.map((item) => ({
          date: item.date,
          spend: item.spend,
          cards: item.cards_seen,
          adr: item.average_daily_rate,
        }));

        setData(formatted);
      } catch (error) {
        console.error("Error fetching summary data:", error);
        return;
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
              domain={[10000000, 300000000]}
              tickFormatter={(value) =>
                value >= 1_000_000
                  ? `$${(value / 1_000_000).toFixed(0)}M`
                  : `$${(value / 100_000).toFixed(0)}K`
              }
            />
            <YAxis
              yAxisId="right"
              domain={[1000000, 5000000]}
              orientation="right"
              tickFormatter={(value) =>
                value >= 1_000_000
                  ? `${(value / 1_000_000).toFixed(0)}M`
                  : `${(value / 100_000).toFixed(0)}K`
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
