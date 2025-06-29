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
import YearSelect from "../filters/YearSelect";
import { monthMap } from "../../utils/maps";
import { Box } from "@chakra-ui/react";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#d88484", "#00C49F"];

const SpendBreakdownChart = ({ lgaName, year }) => {
  const { accessToken, authError, isAuthLoading } = useAuth();
  const [spendData, setSpendData] = useState([]);
  const [txnsData, setTxnsData] = useState([]);

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

        if (authError) throw error;

        const top5 = [...json].sort((a, b) => b.spend - a.spend).slice(0, 5);

        // Format data for Recharts
        setSpendData(
          top5.map((item) => ({
            name: item.category,
            value: item.spend,
          }))
        );

        setTxnsData(
          top5.map((item) => ({
            name: item.category,
            value: item.no_txns,
          }))
        );
      } catch (err) {
        console.error("Error fetching spend data:", err);
      }
    };

    if (!isAuthLoading && lgaName && accessToken) fetchData();
  }, [year, lgaName, accessToken, isAuthLoading]);

  return (
    <Box w={"100%"}>
      <ResponsiveContainer height={400}>
        <PieChart>
          {/* Outer ring - Spend */}
          <Pie
            data={spendData}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            innerRadius={50}
            label={({ name, value }) =>
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
