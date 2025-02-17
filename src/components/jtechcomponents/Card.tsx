import React from "react";

interface CardProps {
  icon: React.ReactNode; // Or a more specific type if using an icon library
  title: string;
  value: number | string; // Allow numbers or strings for value
  percentageChange: string;
}

const jCard: React.FC<CardProps> = ({
  icon,
  title,
  value,
  percentageChange,
}) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="card-icon">{icon}</div>{" "}
        {/* Wrap icon in a div for styling */}
        <div className="card-title">{title}</div>
        <div className="card-value">{value}</div>
        <div className="card-percentage">{percentageChange}</div>
      </div>
    </div>
  );
};

export default jCard;
