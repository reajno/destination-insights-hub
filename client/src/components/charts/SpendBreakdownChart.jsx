import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import useAuth from "../../../hooks/useAuth";
import YearSelect from "../filters/YearSelect";
import { monthMap } from "../../utils/maps";

const SpendBreakdownChart = ({ lgaName, year = "2024" }) => {
  const { accessToken } = useAuth();
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(year);

  useEffect(() => {
    const fetchSpend = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/data/spend/${lgaName}/${selectedYear}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const raw = await res.json();

        const formatted = raw
          .filter((item) => item.month !== "all")
          .map((item) => ({
            month: monthMap[item.month],
            spend: Math.round(item.spend),
          }));

        setData(formatted);
      } catch (err) {
        console.error("Error fetching spend data:", err);
      }
    };

    if (lgaName && accessToken) {
      fetchSpend();
    }
  }, [lgaName, selectedYear, accessToken]);

  return (
    <div className="bg-white shadow rounded-xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Monthly Spend Breakdown</h2>
        <YearSelect onYearChange={setSelectedYear} />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(v) => `$${v / 1_000_000}M`} />
          <Tooltip formatter={(v) => `$${Number(v).toLocaleString()}`} />
          <Bar dataKey="spend" fill="#6366F1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendBreakdownChart;
