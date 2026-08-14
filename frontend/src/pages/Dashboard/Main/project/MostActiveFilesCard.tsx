import Card from "@/components/Card";
import CardHeader from "@/components/CardHeader";
import { Files } from "lucide-react";
const files = [
  {
    file: "servesssssssssssssssr.ts",
    minutes: 272,
  },
  { file: "db.ts", minutes: 190 },
  { file: "ReadenRoutes.ts", minutes: 102 },
  { file: "global.css", minutes: 50 },
];

const progressColors = [
  "bg-primary/35",
  "bg-primary/50",
  "bg-primary/70",
  "bg-primary/85",
];

function formatTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours === 0) {
    return `${remainingMinutes}min`;
  }
  return `${hours}h ${remainingMinutes}min`;
}
export default function MostActiveFilesCard() {
  const maxMinutes = Math.max(...files.map((file) => file.minutes));
  return (
    <div className="col-span-4 transition-all duration-300 hover:-translate-y-2">
      {" "}
      <Card size="md">
        {" "}
        <CardHeader
          title="Most active files"
          subtitle="Most used files in this project"
          icon={Files}
        />{" "}
        <div className="mt-9 flex flex-col gap-5">
          {" "}
          {files.map((file, index) => {
            const colorIndex = Math.min(
              Math.floor((file.minutes / maxMinutes) * progressColors.length),
              progressColors.length - 1
            );
            const progress = (file.minutes / maxMinutes) * 100;
            return (
              <div
                key={file.file}
                className="group relative flex h-7 items-center"
              >
                {" "}
                {/* Progress background */}{" "}
                <div
                  className={`absolute cursor-pointer animate-[growBar_700ms_ease-out_forwards]  group-hover:bg-primary top-1/2 h-9 -translate-y-1/2 rounded-full transition-all duration-300 ${progressColors[colorIndex]}`}
                  style={
                    {
                      "--bar-width": `${progress}%`,
                    } as React.CSSProperties
                  }
                />{" "}
                {/* Ranking + file name */}{" "}
                <div className="relative truncate z-10 flex items-center gap-3 cursor-pointer ">
                  {" "}
                  <span className="w-5  text-xs font-medium text-text-secondary ml-2 ">
                    {" "}
                    {String(index + 1).padStart(2, "0")}{" "}
                  </span>{" "}
                  <span className="truncate font-mono text-sm font-medium text-text-primary  ">
                    {" "}
                    {file.file}{" "}
                  </span>{" "}
                </div>{" "}
                {/* Time */}{" "}
                <span className="relative z-10 ml-auto text-xs font-medium text-text-secondary ">
                  {" "}
                  {formatTime(file.minutes)}{" "}
                </span>{" "}
              </div>
            );
          })}{" "}
        </div>{" "}
      </Card>{" "}
    </div>
  );
}
