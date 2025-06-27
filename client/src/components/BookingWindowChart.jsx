import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAuth from "../../hooks/useAuth";
import YearSelect from "./filters/YearSelect";
import { monthMap } from "../utils/maps";

const BookingWindowChart = ({ lgaName }) => {
  const { accessToken } = useAuth();
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2023");

  useEffect(() => {
    const fetchBookingWindow = async () => {
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
          abw: parseFloat(item.abw),
        }));

        setData(formatted);
      } catch (err) {
        console.error("Error fetching booking window data:", err);
      }
    };

    if (lgaName && accessToken) {
      fetchBookingWindow();
    }
  }, [lgaName, selectedYear, accessToken]);

  return (
    <div className="bg-white shadow rounded-xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Booking Window Trend</h2>
        <YearSelect onYearChange={setSelectedYear} />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(v) => `${v.toFixed(0)} days`} />
          <Tooltip formatter={(v) => `${v.toFixed(1)} days`} />
          <Line
            type="monotone"
            dataKey="abw"
            stroke="#3B82F6"
            strokeWidth={2}
            dot
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BookingWindowChart;
