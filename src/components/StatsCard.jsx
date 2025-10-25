import React from "react";

const StatsCard = ({
  title,
  value,
  bgColor = "bg-white",
  textColor = "text-gray-800",
}) => {
  return (
    <div className={`${bgColor} p-6 rounded-lg shadow`}>
      <div className={`${textColor} text-sm opacity-75`}>{title}</div>
      <div className={`text-3xl font-bold ${textColor}`}>{value}</div>
    </div>
  );
};

export default StatsCard;
