import React, { useEffect, useState } from "react";
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

const SpendChart = ({ lgaName, year }) => {
  const [data, setData] = useState([]);
  const { getAccessToken, error } = useAuth();

  useEffect(() => {
    const fetchSpendData = async () => {
      try {
        const accessToken = await getAccessToken();

        if (error) throw error; // Return to login page if error?

        const res = await fetch(
          `http://localhost:3001/api/data/spend/${lgaName}/${selectedYear}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const json = await res.json();
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

    fetchSpendData();
  }, [lgaName]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
        <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
        <Line
          type="monotone"
          dataKey="spend"
          stroke="#6366f1"
          strokeWidth={2}
          dot
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SpendChart;
