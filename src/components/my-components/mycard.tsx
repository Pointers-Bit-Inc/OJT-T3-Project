import React from 'react';
import { Card } from '../ui/card';

interface MyCardProps {
  title: string;
  quantity?: number;
  analytics?: number;
}

const MyCard: React.FC<MyCardProps> = ({ title, quantity, analytics }) => {
  return (
    <Card className="p-6 shadow-md flex flex-col items-start hover:bg-gray-200 transition">
      <h3 className="text-md font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{quantity || "0"}</p>
      <p className={`text-sm ${analytics && analytics > 0 ? 'text-green-600' : 'text-red-600'}`}>
        {analytics !== undefined ? ( 
          analytics > 0 ? `${analytics}% Up from past week` : `${Math.abs(analytics)}% Down from past week`
        ) : (
          "No data" 
        )}
      </p>
    </Card>
  );
};

export default MyCard;