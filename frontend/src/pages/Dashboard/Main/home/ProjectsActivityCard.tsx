import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartNoAxesColumn } from "lucide-react";
import CardHeader from "@/components/CardHeader";
import Card from "@/components/Card";

type Period = "week" | "month" | "year";

// Dado bruto em MINUTOS. Cada linha é um ponto no eixo X.
// Substitua os arrays abaixo pelos dados reais da API, mantendo o mesmo formato:
// { label: string, [projectKey: string]: number }
const rawDataByPeriod: Record<string, Record<string, number | string>[]> = {
  week: [
    { label: "Mon", codemetry: 150, readen: 90, portfolio: 30 },
    { label: "Tue", codemetry: 180, readen: 30, portfolio: 60 },
    { label: "Wed", codemetry: 240, readen: 60, portfolio: 0 },
    { label: "Thu", codemetry: 120, readen: 120, portfolio: 60 },
    {
      label: "Fri",
      codemetry: 210,
      readen: 60,
      portfolio: 30,
      crudmanager: 140,
      mindscopefront: 40,
      kanbanboard: 13,
    },
    { label: "Sat", codemetry: 60, readen: 120, portfolio: 0 },
    { label: "Sun", codemetry: 30, readen: 60, portfolio: 0 },
  ],

  // 4 semanas do mês
  month: [
    { label: "Week 1", codemetry: 620, readen: 310, portfolio: 90 },
    { label: "Week 2", codemetry: 540, readen: 260, portfolio: 150 },
    { label: "Week 3", codemetry: 710, readen: 180, portfolio: 60 },
    { label: "Week 4", codemetry: 480, readen: 340, portfolio: 120 },
  ],

  // 12 meses do ano
  year: [
    { label: "Jan", codemetry: 2100, readen: 900, portfolio: 300 },
    { label: "Feb", codemetry: 1800, readen: 1100, portfolio: 400 },
    { label: "Mar", codemetry: 2400, readen: 700, portfolio: 200 },
    { label: "Apr", codemetry: 1950, readen: 1200, portfolio: 350 },
    { label: "May", codemetry: 2200, readen: 950, portfolio: 500 },
    { label: "Jun", codemetry: 1700, readen: 31900, portfolio: 250 },
    { label: "Jul", codemetry: 2500, readen: 800, portfolio: 300 },
    { label: "Aug", codemetry: 2050, readen: 1000, portfolio: 450 },
    { label: "Sep", codemetry: 1900, readen: 1150, portfolio: 300 },
    { label: "Oct", codemetry: 2300, readen: 900, portfolio: 400 },
    { label: "Nov", codemetry: 2000, readen: 1050, portfolio: 350 },
    { label: "Dec", codemetry: 1600, readen: 1400, portfolio: 250 },
  ],
};

// Paleta fixa por projeto — expanda conforme novos projetos aparecerem
const projectColors: Record<string, string> = {
  codemetry: "#7c3aed",
  readen: "#a78bfa",
  portfolio: "#c4b5fd",

  crudmanager: "#752d19",
  mindscopefront: "#757219",
  kanbanboard: "#757219",
};

const OTHERS_COLOR = "#3f3f46";
const MAX_VISIBLE_PROJECTS = 5;

// Converte minutos totais em formato "Xh Ym" (usado no eixo Y)
function formatMinutes(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

// Formatação usada especificamente no tooltip (ex: "2h", "30min", "1h 20min")
function formatTooltipTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes}min`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}min`;
}

interface TooltipPayloadEntry {
  dataKey: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  const total = payload.reduce((sum, entry) => sum + (entry.value || 0), 0);

  return (
    <div className="rounded-lg border border-border bg-surface p-3 shadow-lg">
      <p className="mb-2 text-sm font-semibold text-text-primary">{label}</p>

      <div className="flex flex-col gap-1.5">
        {payload.map((entry) => (
          <div key={entry.dataKey} className="flex items-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="capitalize text-text-secondary">
                {entry.dataKey}
              </span>
            </div>
            <span className="ml-auto font-medium text-text-primary">
              {formatTooltipTime(entry.value)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-border pt-2 text-xs">
        <span className="text-text-secondary">Total</span>
        <span className="font-semibold text-text-primary">
          {formatTooltipTime(total)}
        </span>
      </div>
    </div>
  );
}

export default function ProjectsActivityCard() {
  const [period, setPeriod] = useState<Period>("week");

  const rawData = rawDataByPeriod[period];

  // 1. Descobre quais são as chaves de projeto presentes nesse período
  const allProjectKeys = useMemo(() => {
    const keys = new Set<string>();
    rawData.forEach((row) => {
      Object.keys(row).forEach((key) => {
        if (key !== "label") keys.add(key);
      });
    });
    return Array.from(keys);
  }, [rawData]);

  // 2. Soma o total de cada projeto (em todo o período) para ranquear
  const rankedProjects = useMemo(() => {
    const totals: Record<string, number> = {};
    allProjectKeys.forEach((key) => {
      totals[key] = rawData.reduce(
        (sum, row) => sum + (Number(row[key]) || 0),
        0
      );
    });
    return Object.entries(totals)
      .sort((a, b) => b[1] - a[1])
      .map(([key]) => key);
  }, [allProjectKeys, rawData]);

  const topProjects = rankedProjects.slice(0, MAX_VISIBLE_PROJECTS);
  const otherProjects = rankedProjects.slice(MAX_VISIBLE_PROJECTS);
  const hasOthers = otherProjects.length > 0;

  // 3. Reconstrói os dados: mantém os top 5, soma o resto em "others"
  const chartData = useMemo(() => {
    return rawData.map((row) => {
      const entry: Record<string, number | string> = { label: row.label };

      topProjects.forEach((key) => {
        entry[key] = Number(row[key]) || 0;
      });

      if (hasOthers) {
        entry.others = otherProjects.reduce(
          (sum, key) => sum + (Number(row[key]) || 0),
          0
        );
      }

      return entry;
    });
  }, [rawData, topProjects, otherProjects, hasOthers]);

  // 4. Eixo Y em incrementos de 30min, até o total máximo empilhado
  const yTicks = useMemo(() => {
    const maxStacked = Math.max(
      ...chartData.map((row) =>
        [...topProjects, ...(hasOthers ? ["others"] : [])].reduce(
          (sum, key) => sum + (Number(row[key]) || 0),
          0
        )
      )
    );
    const roundedMax = Math.ceil(maxStacked / 30) * 30;
    const ticks: number[] = [];
    for (let t = 0; t <= roundedMax; t += 30) ticks.push(t);
    return ticks;
  }, [chartData, topProjects, hasOthers]);

  return (
    <div className="col-span-6 transition-all duration-300 hover:-translate-y-2">
      <Card size="lg">
        <div className="relative flex items-start">
          <div className="flex-1">
            <CardHeader
              title="Projects activity"
              subtitle="Coding time across all projects"
              icon={ChartNoAxesColumn}
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

        <div className="mt-6 h-64 outline-none [&_*]:outline-none">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 5, left: -10, bottom: 5 }}
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
                width={87}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(255,255,255,0.03)" }}
              />

              {topProjects.map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  stackId="projects"
                  fill={projectColors[key] ?? "#7c3aed"}
                  radius={
                    index === topProjects.length - 1 && !hasOthers
                      ? [4, 4, 0, 0]
                      : [0, 0, 0, 0]
                  }
                  className="cursor-pointer"
                />
              ))}

              {hasOthers && (
                <Bar
                  dataKey="others"
                  stackId="projects"
                  fill={OTHERS_COLOR}
                  radius={[4, 4, 0, 0]}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legenda de projetos, em ordem de atividade */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
          {topProjects.map((key) => (
            <div key={key} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: projectColors[key] ?? "#7c3aed" }}
              />
              <span className="text-xs capitalize text-text-secondary">
                {key}
              </span>
            </div>
          ))}

          {hasOthers && (
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: OTHERS_COLOR }}
              />
              <span className="text-xs text-text-secondary">Others</span>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
