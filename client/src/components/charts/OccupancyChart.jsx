import React, { useEffect, useState } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAuth from "../../../hooks/useAuth";
import YearSelect from "../filters/YearSelect";
import { monthMap } from "../../utils/maps";

const OccupancyChart = ({ lgaName }) => {
  const { accessToken } = useAuth();
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2023");

  useEffect(() => {
    const fetchOccupancy = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/data/occupancy/${lgaName}/${selectedYear}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const json = await res.json();

        const formatted = json.map((item) => ({
          month: monthMap[item.month.padStart(2, "0")],
          occupancy: +(item.avg_occupancy * 100).toFixed(1),
          adr: +item.avg_adr.toFixed(2),
        }));

        setData(formatted);
      } catch (err) {
        console.error("Error fetching occupancy data:", err);
      }
    };

    if (lgaName && accessToken) {
      fetchOccupancy();
    }
  }, [lgaName, selectedYear, accessToken]);

  return (
    <div className="bg-white shadow rounded-xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Occupancy and ADR</h2>
        <YearSelect onYearChange={setSelectedYear} />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis
            yAxisId="left"
            tickFormatter={(v) => `${v}%`}
            domain={[0, 100]}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickFormatter={(v) => `$${v}`}
          />
          <Tooltip
            formatter={(val, key) =>
              key === "occupancy"
                ? `${val}%`
                : `$${Number(val).toLocaleString()}`
            }
          />
          <Bar
            yAxisId="left"
            dataKey="occupancy"
            fill="#6366f1"
            name="Occupancy %"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="adr"
            stroke="#f97316"
            strokeWidth={2}
            dot
            name="ADR"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OccupancyChart;
