import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import useAuth from "../../../hooks/useAuth";
import { monthMap } from "@/utils/maps";
import { Box } from "@chakra-ui/react";

const SpendChart = ({ lgaName, year }) => {
  const [data, setData] = useState([]);
  const { accessToken, authError, isAuthLoading } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/data/spend/${lgaName}/${year}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const json = await res.json();

        if (authError) throw error;

        const yearData = json.filter((item) => item.month !== "all");

        const formatted = yearData.map((item) => ({
          date: monthMap[item.month],
          spend: parseFloat(item.spend),
        }));
        setData(formatted);
      } catch (error) {
        console.error("Error fetching user data:", error);
        return;
      }
    };
    if (!isAuthLoading && lgaName && accessToken) fetchData();
  }, [year, lgaName, accessToken, isAuthLoading]);
  return (
    <Box w={"100%"}>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" angle={-45} textAnchor="end" />
          <YAxis
            tickFormatter={(value) =>
              value >= 1_000_000_000
                ? `$${(value / 1_000_000_000).toFixed(1)}B`
                : `$${(value / 1_000_000).toFixed(0)}M`
            }
            domain={[500000000, 1000000000]}
          />
          <Tooltip
            labelFormatter={() => ""}
            formatter={(value) => [
              `$${Number(value).toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}`,
              "Spend",
            ]}
          />
          <Line
            type="monotone"
            dataKey="spend"
            stroke="#6366f1"
            strokeWidth={2}
            dot
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default SpendChart;
