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

const formatDateAU = (isoDateStr) => {
  const [year, month, day] = isoDateStr.split("-");
  return `${day}-${month}-${year}`;
};

const SummarySnapshotChart = ({ lgaName }) => {
  const { accessToken } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchSnapshot = async () => {
      try {
        const defaultStartDate = "2024-01-01"; // earliest reliable data start
        const res = await fetch(
          `http://localhost:3001/api/data/summary/${lgaName}?start=${defaultStartDate}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        const json = await res.json();

        // Just get last 14 rows
        const recent = json.slice(-14);

        const formatted = recent.map((item) => ({
          date: formatDateAU(item.date),
          spend: item.spend,
          occupancy: (item.average_historical_occupancy * 100).toFixed(1),
          adr: item.average_daily_rate,
          alos: item.average_length_of_stay,
        }));

        setData(formatted);
      } catch (err) {
        console.error("Error fetching summary snapshot:", err);
      }
    };

    if (lgaName && accessToken) fetchSnapshot();
  }, [lgaName, accessToken]);

  return (
    <div className="bg-white shadow rounded-xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">14-Day Snapshot</h2>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" tickFormatter={(v) => `$${v}`} />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip
            formatter={(val, key) => {
              if (key === "occupancy") return [`${val}%`, "Occupancy"];
              if (key === "adr") return [`$${val}`, "ADR"];
              if (key === "alos") return [`${val} days`, "ALOS"];
              return [`$${Number(val).toLocaleString()}`, "Spend"];
            }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="spend"
            stroke="#6366F1"
            dot={false}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="occupancy"
            stroke="#10B981"
            dot={false}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="adr"
            stroke="#F59E0B"
            dot={false}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="alos"
            stroke="#3B82F6"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SummarySnapshotChart;
