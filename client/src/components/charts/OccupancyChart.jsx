import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ComposedChart,
} from "recharts";
import useAuth from "../../../hooks/useAuth";
import { monthMap } from "@/utils/maps";
import { Box } from "@chakra-ui/react";

const OccupancyADRChart = ({ lgaName, year }) => {
  const [data, setData] = useState([]);
  const { accessToken, authError, isAuthLoading } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/data/occupancy/${lgaName}/${year}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const json = await res.json();

        if (authError) throw new Error("Auth error");

        const formatted = json.map((item) => ({
          month: monthMap[item.month],
          avg_occupancy: parseFloat(item.avg_occupancy),
          avg_adr: parseFloat(item.avg_adr),
        }));

        setData(formatted);
      } catch (error) {
        console.error("Error fetching occupancy & ADR data:", error);
      }
    };

    if (!isAuthLoading && lgaName && accessToken) fetchData();
  }, [year, lgaName, accessToken, isAuthLoading]);

  return (
    <Box w={"100%"}>
      <ResponsiveContainer width="100%" height={200}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" angle={-45} textAnchor="end" />
          <YAxis
            yAxisId="left"
            domain={[0, 1]}
            tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
          />
          <YAxis yAxisId="right" orientation="right" domain={[250, 400]} />
          <Tooltip
            formatter={(value, name) => {
              if (name === "AO") {
                return [(value * 100).toFixed(1) + "%", "AO"];
              }
              if (name === "ADR") {
                return [`$${value.toFixed(2)}`, "ADR"];
              }
              return [value, name];
            }}
            labelFormatter={() => ""}
          />
          <Legend verticalAlign="top" />
          <Bar
            yAxisId="left"
            dataKey="avg_occupancy"
            fill="#6366f1"
            name="AO"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="avg_adr"
            stroke="#f97316"
            name="ADR"
            strokeWidth={2}
            dot
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default OccupancyADRChart;
