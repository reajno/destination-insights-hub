import React from "react";

const MetricCard = ({ label, value }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-4 text-center border border-gray-100">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
};

export default MetricCard;