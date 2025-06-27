import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const YearlyMetricsCards = ({ lgaName }) => {
  const { accessToken } = useAuth();
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/data/metrics/${lgaName}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        const json = await res.json();
        setMetrics(json[0]); // API returns array with one object
      } catch (err) {
        console.error("Error fetching metrics summary:", err);
      }
    };

    if (lgaName && accessToken) fetchMetrics();
  }, [lgaName, accessToken]);

  if (!metrics) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-xl shadow text-center">
        <p className="text-sm text-gray-500">Total Spend</p>
        <p className="text-xl font-bold text-blue-600">
          ${Number(metrics.spend).toLocaleString()}
        </p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow text-center">
        <p className="text-sm text-gray-500">Occupancy</p>
        <p className="text-xl font-bold text-emerald-600">
          {(metrics.occupancy * 100).toFixed(1)}%
        </p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow text-center">
        <p className="text-sm text-gray-500">Average Daily Rate (ADR)</p>
        <p className="text-xl font-bold text-orange-500">
          ${Number(metrics.adr).toFixed(2)}
        </p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow text-center">
        <p className="text-sm text-gray-500">ALOS</p>
        <p className="text-xl font-bold text-indigo-500">
          {Number(metrics.alos).toFixed(2)} days
        </p>
      </div>
    </div>
  );
};

export default YearlyMetricsCards;
