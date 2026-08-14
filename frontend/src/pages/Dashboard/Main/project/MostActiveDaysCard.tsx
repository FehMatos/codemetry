import Card from "@/components/Card";
import CardHeader from "@/components/CardHeader";
import { CalendarCheck } from "lucide-react";
const weekdays = [
  { day: "Mon", minutes: 180 },
  { day: "Tue", minutes: 240 },
  { day: "Wed", minutes: 300 },
  { day: "Thu", minutes: 120 },
  { day: "Fri", minutes: 210 },
  { day: "Sat", minutes: 60 },
  { day: "Sun", minutes: 30 },
];
const progressColors = [
  "bg-primary",
  "bg-primary/80",
  "bg-primary/70",
  "bg-primary/65",
  "bg-primary/50",
  "bg-primary/43",
  "bg-primary/25",
];
function formatTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours === 0) {
    return `${remainingMinutes}min`;
  }
  return `${hours}h ${remainingMinutes}min`;
}
export default function MostActiveDaysCard() {
  const maxMinutes = Math.max(...weekdays.map((weekday) => weekday.minutes));
  return (
    <div className="col-span-4 transition-all duration-300 hover:-translate-y-2">
      {" "}
      <Card size="md">
        {" "}
        <CardHeader
          title="Most active days"
          subtitle="Average coding time by weekday"
          icon={CalendarCheck}
        />{" "}
        <div className="mt-6 flex flex-col gap-3.5">
          {" "}
          {weekdays.map((weekday) => {
            const progress = (weekday.minutes / maxMinutes) * 100;
            /* * Quanto maior o tempo em relação ao máximo, * mais forte será a cor da barra. */ const colorIndex =
              Math.min(
                Math.floor(
                  (weekday.minutes / maxMinutes) * progressColors.length
                ),
                progressColors.length - 1
              );
            return (
              <div
                key={weekday.day}
                className="flex items-center gap-3 group cursor-pointer"
              >
                {" "}
                {/* Weekday */}{" "}
                <span className="w-8 shrink-0 text-xs font-medium text-text-secondary group-hover:text-primary">
                  {" "}
                  {weekday.day}{" "}
                </span>{" "}
                {/* Progress bar */}{" "}
                <div className="relative h-4 flex-1 overflow-hidden rounded-md group-hover:bg-background/10 ">
                  {" "}
                  <div
                    className={`absolute top-0 h-full animate-[growBar_700ms_ease-out_forwards] rounded-md ${progressColors[colorIndex]}`}
                    style={
                      {
                        "--bar-width": `${progress}%`,
                      } as React.CSSProperties
                    }
                  />{" "}
                  {/* Time inside the end of the bar */}{" "}
                  <span className="absolute inset-y-0 right-2 flex items-center text-xs font-medium text-text-primary group-hover:text-primary">
                    {" "}
                    {formatTime(weekday.minutes)}{" "}
                  </span>{" "}
                </div>{" "}
              </div>
            );
          })}{" "}
        </div>{" "}
      </Card>{" "}
    </div>
  );
}
