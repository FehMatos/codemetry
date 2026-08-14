import Card from "@/components/Card";
import { PieChart, Pie, Cell } from "recharts";
import { ArrowUp, Terminal } from "lucide-react";
import CardHeader from "@/components/CardHeader";

const todayMinutes = 155; // 1h 45m
const dailyAverageMinutes = 262; // 4h 22m

const progress = Math.min(todayMinutes / dailyAverageMinutes, 1);

const chartData = [
  { name: "Today", value: progress },
  { name: "Remaining", value: 1 - progress },
];

function formatTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes}m`;
  }

  return `${hours}h ${remainingMinutes}m`;
}

export default function DailyTimeCodedCard() {
  return (
    <div className="col-span-3 transition-all duration-300 hover:-translate-y-2">
      <Card size="md">
        <CardHeader title="Daily coding time" icon={Terminal} />
        <div className="flex h-full flex-col items-center">
          {/* Today */}
          <div className="text-center mt-4">
            <p className="text-2xl font-semibold text-text-primary">
              {formatTime(todayMinutes)}
            </p>

            <p className="text-xs text-text-secondary">today</p>
          </div>

          {/* Half donut */}
          <div className="outline-none [&_*]:outline-none">
            <PieChart width={180} height={100}>
              <Pie
                data={chartData}
                cx="50%"
                cy="100%"
                startAngle={180}
                endAngle={0}
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
                stroke=""
              >
                <Cell fill="var(--color-primary)" />
                <Cell fill="var(--color-border)" />
              </Pie>
            </PieChart>
          </div>

          {/* Increase / decrease */}
          <div className="-mt-1 flex items-center gap-1">
            <ArrowUp size={14} className="text-success" />

            <span className="text-xs mt-2 font-medium text-success">
              12% from last 30 days
            </span>
          </div>

          {/* Daily average */}
          <div className="mt-3 text-center">
            <p className="text-xl font-semibold text-text-primary">
              {formatTime(dailyAverageMinutes)}
            </p>

            <p className="text-xs text-text-secondary">daily average</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
