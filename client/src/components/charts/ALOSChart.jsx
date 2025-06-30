import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import useAuth from "../../../hooks/useAuth";
import { monthMap } from "../../utils/maps";
import YearSelect from "../filters/YearSelect";

const ALOSChart = ({ lgaName, year }) => {
  const { accessToken } = useAuth();
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2023");

  useEffect(() => {
    const fetchALOS = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/data/alos/${lgaName}/${selectedYear}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const json = await res.json();

        const formatted = json.map((item) => ({
          month: monthMap[item.month.padStart(2, "0")],
          alos: parseFloat(item.alos),
        }));

        setData(formatted);
      } catch (err) {
        console.error("Error fetching ALOS data:", err);
      }
    };

    if (lgaName && accessToken) {
      fetchALOS();
    }
  }, [lgaName, selectedYear, accessToken]);

  return (
    <div className="bg-white shadow rounded-xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Average Length of Stay (ALOS)</h2>
        <YearSelect onYearChange={setSelectedYear} />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(v) => `${v.toFixed(1)} days`} />
          <Tooltip formatter={(v) => `${v.toFixed(2)} days`} />
          <Line
            type="monotone"
            dataKey="alos"
            stroke="#10B981"
            strokeWidth={2}
            dot
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ALOSChart;
