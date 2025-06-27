import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { lgaMap } from "../utils/maps";
import SpendBreakdownChart from "../components/SpendBreakdownChart";
import TestChart from "../components/TestChart";
import ALOSChart from "../components/ALOSChart";
import OccupancyChart from "../components/OccupancyChart";
import SummarySnapshotChart from "../components/SummarySnapshotChart";
import YearlyMetricsCards from "../components/YearlyMetricsCards";
import ExportButton from "../components/ExportButton";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [region, setRegion] = useState(user?.lga_name || "Cairns");
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className={`min-h-screen bg-green-50`}>
      <div className="max-w-6xl mx-auto p-6" id="dashboard-content">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-800">
            Destination Insights Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-700 underline"
          >
            Log Out
          </button>
        </div>

        {/* Region selector */}
        <div className="mb-4">
          <label className="mr-2 font-medium">Select Region:</label>
          <select
            className="border px-3 py-1 rounded-md"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            {Object.keys(lgaMap).map((key) => (
              <option key={key} value={key}>
                {lgaMap[key].label}
              </option>
            ))}
          </select>
        </div>

        {/* Yearly Metrics Summary */}
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <h2 className="text-md font-medium text-gray-800 mb-2">
            Key Metrics (7-Week Average)
          </h2>
          <YearlyMetricsCards lgaName={region} />
        </div>

        {/* Monthly Spend Trend */}
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <h2 className="text-md font-medium text-gray-800 mb-2">
            Monthly Spend Trend
          </h2>
          <TestChart lgaName={region} />
        </div>

        {/* Spend Breakdown Chart */}
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <h2 className="text-md font-medium text-gray-800 mb-2">
            Top Spend Categories
          </h2>
          <SpendBreakdownChart lgaName={region} />
        </div>

        {/* ALOS Chart */}
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <h2 className="text-md font-medium text-gray-800 mb-2">
            Average Length of Stay (ALOS)
          </h2>
          <ALOSChart lgaName={region} />
        </div>

        {/* Occupancy Chart */}
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <h2 className="text-md font-medium text-gray-800 mb-2">
            Occupancy and ADR
          </h2>
          <OccupancyChart lgaName={region} />
        </div>

        {/* Summary Snapshot Chart */}
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <h2 className="text-md font-medium text-gray-800 mb-2">
            14-Day Snapshot (Latest Available)
          </h2>
          <SummarySnapshotChart lgaName={region} />
        </div>

        {/* Export Button */}
        <ExportButton />
      </div>
    </div>
  );
};

export default Dashboard;
