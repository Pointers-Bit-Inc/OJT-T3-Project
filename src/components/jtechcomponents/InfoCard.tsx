import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";

interface InfoCardProps {
  icon: JSX.Element;
  title: string;
  value: string;
  percentageChange: string; 
  subtitle: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  icon,
  title,
  value,
  percentageChange,
  subtitle,
}) => {
  const isChangePositive = percentageChange.includes("Up"); 
  const changeColor = isChangePositive ? "text-green-500" : "text-red-500";
  const bgColor = isChangePositive ? "bg-green-100" : "bg-red-100";

  const [percentageValue, trend] = percentageChange.split(" ");

  return (
    <Card className="rounded-lg bg-white p-4 shadow-md w-70 h-45"> 
      <CardHeader>
        <div className="flex items-center">
          <div className={`mr-2 flex h-8 w-8 items-center justify-center rounded-full ${bgColor}`}>
            <span className={changeColor}>{icon}</span>
          </div>
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            <CardDescription>
              <p className="text-xl font-bold">{value}</p>
              <p className="text-sm text-gray-500">
                <span className={changeColor}>{percentageValue}</span> {trend} from {subtitle}
              </p>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default InfoCard;

