import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import { Code } from "lucide-react";
import CardHeader from "@/components/CardHeader";
import Card from "@/components/Card";

type Period = "week" | "month" | "year";

interface ActivityPoint {
  label: string;
  minutes: number;
  sessions: number;
  topFile: string;
}

// Dado bruto em MINUTOS. Substitua pelos dados reais da API, mantendo o formato:
// { label, minutes, sessions, topFile }
const dataByPeriod: Record<Period, ActivityPoint[]> = {
  week: [
    { label: "Mon", minutes: 90, sessions: 2, topFile: "server.ts" },
    { label: "Tue", minutes: 180, sessions: 4, topFile: "auth.controller.ts" },
    { label: "Wed", minutes: 60, sessions: 1, topFile: "db.ts" },
    { label: "Thu", minutes: 150, sessions: 3, topFile: "routes.ts" },
    { label: "Fri", minutes: 228, sessions: 4, topFile: "auth.controller.ts" },
    { label: "Sat", minutes: 30, sessions: 1, topFile: "index.ts" },
    { label: "Sun", minutes: 45, sessions: 1, topFile: "index.ts" },
  ],

  month: [
    { label: "Week 1", minutes: 620, sessions: 12, topFile: "server.ts" },
    {
      label: "Week 2",
      minutes: 540,
      sessions: 10,
      topFile: "auth.controller.ts",
    },
    { label: "Week 3", minutes: 710, sessions: 14, topFile: "db.ts" },
    { label: "Week 4", minutes: 480, sessions: 9, topFile: "routes.ts" },
  ],

  year: [
    { label: "Jan", minutes: 2100, sessions: 40, topFile: "server.ts" },
    { label: "Feb", minutes: 1800, sessions: 35, topFile: "db.ts" },
    {
      label: "Mar",
      minutes: 2400,
      sessions: 46,
      topFile: "auth.controller.ts",
    },
    { label: "Apr", minutes: 1950, sessions: 38, topFile: "routes.ts" },
    { label: "May", minutes: 2200, sessions: 42, topFile: "server.ts" },
    { label: "Jun", minutes: 1700, sessions: 33, topFile: "db.ts" },
    {
      label: "Jul",
      minutes: 2500,
      sessions: 48,
      topFile: "auth.controller.ts",
    },
    { label: "Aug", minutes: 2050, sessions: 39, topFile: "routes.ts" },
    { label: "Sep", minutes: 1900, sessions: 36, topFile: "server.ts" },
    { label: "Oct", minutes: 2300, sessions: 44, topFile: "db.ts" },
    {
      label: "Nov",
      minutes: 2000,
      sessions: 37,
      topFile: "auth.controller.ts",
    },
    { label: "Dec", minutes: 1600, sessions: 30, topFile: "routes.ts" },
  ],
};

// Variação sutil de tonalidade de roxo, barra a barra
const barShades = ["#7c3aed", "#8b4ff0", "#6d28d9", "#9061f2", "#7c3aed"];

// Formatação do eixo Y: "Xh Ym"
function formatMinutes(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

// Formatação do tooltip: "Xh Ymin"
function formatTooltipTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes}min`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}min`;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: ActivityPoint }[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  const point = payload[0].payload;

  return (
    <div className="rounded-lg border border-border bg-surface p-3 shadow-lg">
      <p className="mb-2 text-sm font-semibold text-text-primary">{label}</p>

      <div className="flex flex-col gap-1.5 text-xs">
        <div className="flex items-center justify-between gap-6">
          <span className="text-text-secondary">Coding time</span>
          <span className="font-medium text-text-primary">
            {formatTooltipTime(point.minutes)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-6">
          <span className="text-text-secondary">Sessions</span>
          <span className="font-medium text-text-primary">
            {point.sessions}
          </span>
        </div>

        <div className="flex items-center justify-between gap-6">
          <span className="text-text-secondary">Top File</span>
          <span className="truncate font-medium text-text-primary">
            {point.topFile}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function CodingActivityCard() {
  const [period, setPeriod] = useState<Period>("week");

  const chartData = dataByPeriod[period];

  // Total geral do período, exibido no título do card (ex: "324h 40min")
  const totalMinutes = useMemo(
    () => chartData.reduce((sum, point) => sum + point.minutes, 0),
    [chartData]
  );

  // Eixo Y em incrementos de 30min, até o máximo do período
  const yTicks = useMemo(() => {
    const maxMinutes = Math.max(...chartData.map((point) => point.minutes));
    const roundedMax = Math.ceil(maxMinutes / 30) * 30;
    const ticks: number[] = [];
    for (let t = 0; t <= roundedMax; t += 30) ticks.push(t);
    return ticks;
  }, [chartData]);

  return (
    <div className="w-full transition-all duration-300 hover:-translate-y-2">
      <Card size="md">
        <div className="relative flex items-start">
          <div className="flex-1">
            <CardHeader
              title={formatTooltipTime(totalMinutes)}
              subtitle="Total Coding Activity"
              icon={Code}
            />
          </div>

          <div className="absolute left-1/2 top-0 flex -translate-x-1/2 rounded-lg bg-surface-secondary p-1">
            {(["week", "month", "year"] as Period[]).map((option) => (
              <button
                key={option}
                onClick={() => setPeriod(option)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                  period === option
                    ? "bg-surface text-text-primary"
                    : "text-text-tertiary hover:text-text-secondary"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 h-64 outline-none [&_*]:outline-none ">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 5, left: 10, bottom: 40 }}
            >
              <CartesianGrid
                vertical={false}
                stroke="#2f2f34"
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#a1a1aa", fontSize: 12 }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                ticks={yTicks}
                domain={[0, yTicks[yTicks.length - 1]]}
                tick={{ fill: "#a1a1aa", fontSize: 12 }}
                tickFormatter={formatMinutes}
                width={76}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(255,255,255,0.03)" }}
              />

              <Bar dataKey="minutes" radius={[4, 4, 0, 0]}>
                {chartData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={barShades[index % barShades.length]}
                    className="cursor-pointer"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
