import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import useAuth from "../../../hooks/useAuth";
import { monthMap } from "@/utils/maps";
import { Box } from "@chakra-ui/react";

const serverURL = import.meta.env.VITE_SERVER_URL;


const ALOSChart = ({ lgaName, year, onFetchError }) => {
  const [data, setData] = useState([]);
  const { accessToken, isAuthLoading } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${serverURL}/api/data/alos/${lgaName}/${year}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const json = await res.json();

        if (json.message) throw new Error(json.message);

        const formatted = json.map((item) => ({
          month: monthMap[item.month],
          alos: parseFloat(item.alos),
          abw: parseFloat(item.abw),
        }));
        setData(formatted);
      } catch (error) {
        onFetchError(error);
      }
    };

    if (!isAuthLoading && lgaName && accessToken) fetchData();
  }, [year, lgaName, accessToken, isAuthLoading]);

  return (
    <Box w={"100%"}>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" angle={-45} textAnchor="end" />
          <YAxis yAxisId="left" domain={[0, "auto"]} />
          <YAxis yAxisId="right" orientation="right" domain={[0, "auto"]} />
          <Tooltip
            labelFormatter={() => ""}
            formatter={(value) => value.toFixed(2) + " days"}
          />
          <Legend verticalAlign="top" />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="alos"
            stroke="#6366f1"
            name="ALOS"
            strokeWidth={2}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="abw"
            stroke="#f97316"
            name="ABW"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ALOSChart;
