import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";

// Define types for the props
interface InfoCardProps {
  icon: JSX.Element;
  title: string;
  value: string;
  percentageChange: string;
  subtitle: string;
}

export default function InfoCard({
  icon,
  title,
  value,
  percentageChange,
  subtitle,
}: InfoCardProps) {
  return (
    <Card className="rounded-lg bg-white p-6 shadow-md">
      <CardHeader>
        <div className="flex items-center">
          <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
            <span className="text-green-500">{icon}</span>
          </div>
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-sm text-gray-500">
                <span className="text-green-500">{percentageChange}</span>{" "}
                {subtitle}
              </p>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
