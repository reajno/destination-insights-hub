import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAuth from "../../../hooks/useAuth";
import { Box } from "@chakra-ui/react";

// Define colors for pie chart segments
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#d88484", "#00C49F"];

const SpendBreakdownChart = ({ lgaName, year, onFetchError }) => {
  const { accessToken, isAuthLoading } = useAuth();
  const [spendData, setSpendData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/data/spend-breakdown/${lgaName}/${year}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const json = await res.json();

        if (json.message) throw new Error(json.message);

        const top5 = [...json].sort((a, b) => b.spend - a.spend).slice(0, 5);

        setSpendData(
          top5.map((item) => ({
            name: item.category,
            value: item.spend,
          }))
        );
      } catch (error) {
        onFetchError(error);
      }
    };

    if (!isAuthLoading && lgaName && accessToken) fetchData();
  }, [year, lgaName, accessToken, isAuthLoading]);

  return (
    <Box w={"100%"}>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={spendData}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            innerRadius={50}
            label={({ value }) =>
              value >= 1_000_000_000
                ? `$${(value / 1_000_000_000).toFixed(1)}B`
                : `$${(value / 1_000_000).toFixed(1)}M`
            }>
            {spendData.map((_, index) => (
              <Cell key={`spend-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip
            formatter={(value, name) => [
              `$${Number(value).toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}`,
              name,
            ]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default SpendBreakdownChart;
