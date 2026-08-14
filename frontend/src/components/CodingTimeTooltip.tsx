import type { ReactNode } from "react";
interface CodingTimeTooltipProps {
  hour: number;
  minutes: number;
  sessions: number;
  children: ReactNode;
}
function formatHour(hour: number) {
  const period = hour >= 12 ? "pm" : "am";
  const displayHour = hour % 12 || 12;
  return `${displayHour}${period}`;
}
function formatTimeRange(hour: number) {
  const start = formatHour(hour);
  const end = formatHour((hour + 1) % 24);
  return `${start} - ${end}`;
}
function formatTooltipTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours === 0) {
    return `${remainingMinutes}min`;
  }
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${remainingMinutes}min`;
}
export default function CodingTimeTooltip({
  hour,
  minutes,
  sessions,
  children,
}: CodingTimeTooltipProps) {
  const isFirst = hour === 0;
  const isLast = hour === 22 || 23;
  return (
    <div className="group relative flex-1">
      {" "}
      {children}{" "}
      <div
        className={` pointer-events-none absolute bottom-full z-50 mb-2 w-48 translate-y-1 rounded-lg border border-border bg-surface px-3 py-2.5 shadow-lg opacity-0 transition-all duration-150 group-hover:translate-y-0 group-hover:opacity-100 ${isFirst ? "left-0" : isLast ? "right-0" : "left-1/2 -translate-x-1/2"} `}
      >
        {" "}
        <p className="mb-2 text-xs font-medium text-text-primary">
          {" "}
          {formatTimeRange(hour)}{" "}
        </p>{" "}
        <div className="mb-2 h-px bg-border" />{" "}
        <div className="flex flex-col gap-1.5 text-xs">
          {" "}
          <div className="flex items-center justify-between gap-6">
            {" "}
            <span className="text-text-secondary">Coding time</span>{" "}
            <span className="font-medium text-text-primary">
              {" "}
              {formatTooltipTime(minutes)}{" "}
            </span>{" "}
          </div>{" "}
          <div className="flex items-center justify-between gap-6">
            {" "}
            <span className="text-text-secondary">Sessions</span>{" "}
            <span className="font-medium text-text-primary">
              {" "}
              {sessions}{" "}
            </span>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
