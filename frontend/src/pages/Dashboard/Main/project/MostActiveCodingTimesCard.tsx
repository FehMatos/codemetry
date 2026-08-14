import { Eclipse } from "lucide-react";
import Card from "@/components/Card";
import CardHeader from "@/components/CardHeader";
import CodingTimeTooltip from "@/components/CodingTimeTooltip";
const hourlyActivity = [
  { hour: 0, minutes: 30, sessions: 11 },
  { hour: 1, minutes: 10, sessions: 9 },
  { hour: 2, minutes: 15, sessions: 3 },
  { hour: 3, minutes: 0, sessions: 7 },
  { hour: 4, minutes: 0, sessions: 4 },
  { hour: 5, minutes: 120, sessions: 10 },
  { hour: 6, minutes: 42, sessions: 13 },
  { hour: 7, minutes: 0, sessions: 1 },
  { hour: 8, minutes: 30, sessions: 2 },
  { hour: 9, minutes: 0, sessions: 4 },
  { hour: 10, minutes: 0, sessions: 4 },
  { hour: 11, minutes: 0, sessions: 1 },
  { hour: 12, minutes: 15, sessions: 7 },
  { hour: 13, minutes: 178, sessions: 2 },
  { hour: 14, minutes: 0, sessions: 9 },
  { hour: 15, minutes: 45, sessions: 5 },
  { hour: 16, minutes: 0, sessions: 7 },
  { hour: 17, minutes: 15, sessions: 1 },
  { hour: 18, minutes: 30, sessions: 13 },
  { hour: 19, minutes: 45, sessions: 9 },
  { hour: 20, minutes: 0, sessions: 3 },
  { hour: 21, minutes: 0, sessions: 4 },
  { hour: 22, minutes: 15, sessions: 4 },
  { hour: 23, minutes: 30, sessions: 17 },
];

const timeLabels = [
  { hour: 0, label: "12am" },
  { hour: 3, label: "3am" },
  { hour: 6, label: "6am" },
  { hour: 9, label: "9am" },
  { hour: 12, label: "12pm" },
  { hour: 15, label: "3pm" },
  { hour: 18, label: "6pm" },
  { hour: 21, label: "9pm" },
];
const intensityColors = [
  "bg-background/10", // 0 min — visível como "vazio", mas sutil
  "bg-primary/30",
  "bg-primary/50",
  "bg-primary/70",
  "bg-primary",
];

export default function MostActiveCodingTimeCard() {
  const maxMinutes = Math.max(...hourlyActivity.map((hour) => hour.minutes));

  return (
    <div className="col-span-6 transition-all duration-300 hover:-translate-y-2">
      <Card className="h-50">
        <CardHeader
          title="Most active coding times"
          subtitle="Based on all sessions"
          icon={Eclipse}
        />
        <div className="mt-6 flex w-full gap-1">
          {hourlyActivity.map((hour) => {
            const intensity = hour.minutes / maxMinutes;

            const colorIndex =
              hour.minutes === 0
                ? 0
                : Math.min(
                    Math.ceil(intensity * (intensityColors.length - 1)),
                    intensityColors.length - 1
                  );

            return (
              <CodingTimeTooltip
                key={hour.hour}
                hour={hour.hour}
                minutes={hour.minutes}
                sessions={hour.sessions}
              >
                <div
                  className={`
            h-8 w-full cursor-pointer
            rounded-sm border border-[#3A3A38]
            ${intensityColors[colorIndex]}
            hover:border-white/80
          `}
                />
              </CodingTimeTooltip>
            );
          })}
        </div>
        <div className="mt-2 flex w-full gap-1">
          {hourlyActivity.map((hour) => {
            const label = timeLabels.find((t) => t.hour === hour.hour);

            return (
              <div
                key={hour.hour}
                className="flex-1  text-center text-[10px] text-text-primary"
              >
                {label?.label ?? ""}
              </div>
            );
          })}
        </div>
        <div className="mt-7 flex items-center gap-1.5 ">
          <span className="text-xs text-text-secondary ">Less</span>

          {intensityColors.map((color, index) => (
            <div
              key={index}
              className={`h-3 w-3  border border-[#3A3A38] rounded-sm ${color}`}
            />
          ))}

          <span className="text-xs text-text-secondary">More</span>
        </div>
      </Card>
    </div>
  );
}
