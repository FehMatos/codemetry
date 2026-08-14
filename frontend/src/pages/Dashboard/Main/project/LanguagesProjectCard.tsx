////// CRIAR UM RANKING DINÂMICO DE CORES PARA A BARRA DE CADA LINGUAGEM; SENDO O TOP 1 A COR MAIS CLARA, E O ÚLTIMO A COR MAIS ESCURA; E AS TECHS NESSE GAP ADQUIRIREM SUAS CORES DE ACORDO

import { Code2 } from "lucide-react";
import {
  SiTypescript,
  SiJavascript,
  SiCss,
  SiPython,
  SiHtml5,
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiExpress,
} from "@icons-pack/react-simple-icons";

import Card from "@/components/Card";
import CardHeader from "@/components/CardHeader";

const languages = [
  {
    language: "TypeScript",
    time: "14h 32m",
    minutes: 872,
    icon: SiTypescript,
  },
  {
    language: "JavaScript",
    time: "8h 41m",
    minutes: 521,
    icon: SiJavascript,
  },
  {
    language: "CSS",
    time: "4h 12m",
    minutes: 452,
    icon: SiCss,
  },
  {
    language: "Python",
    time: "2h 50m",
    minutes: 370,
    icon: SiPython,
  },
  {
    language: "HTML",
    time: "1h 32m",
    minutes: 292,
    icon: SiHtml5,
  },
  {
    language: "React",
    time: "1h 12m",
    minutes: 172,
    icon: SiReact,
  },
  {
    language: "Node.js",
    time: "58m",
    minutes: 158,
    icon: SiNodedotjs,
  },
  {
    language: "MongoDB",
    time: "42m",
    minutes: 142,
    icon: SiMongodb,
  },
  {
    language: "Tailwind CSS",
    time: "35m",
    minutes: 90,
    icon: SiTailwindcss,
  },
  {
    language: "Git",
    time: "28m",
    minutes: 28,
    icon: SiGit,
  },
  {
    language: "GitHub",
    time: "21m",
    minutes: 21,
    icon: SiGithub,
  },
  {
    language: "Express",
    time: "15m",
    minutes: 15,
    icon: SiExpress,
  },
];

const progressColors = [
  "bg-primary",
  "bg-primary/90",
  "bg-primary/80",
  "bg-primary/70",
  "bg-primary/60",
  "bg-primary/50",
  "bg-primary/45",
  "bg-primary/40",
  "bg-primary/35",
  "bg-primary/30",
  "bg-primary/25",
  "bg-primary/20",
];

export default function LanguagesProjectCard() {
  const maxMinutes = Math.max(...languages.map((language) => language.minutes));

  return (
    <div className="col-span-4 transition-all duration-300 hover:-translate-y-2">
      <Card className="h-129">
        <CardHeader
          title="Languages"
          subtitle="Most used technologies"
          icon={Code2}
        />

        <div className="mt-6 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-surface-secondary">
          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
            {languages.map((language, index) => {
              const progress = (language.minutes / maxMinutes) * 100;
              const Icon = language.icon;

              return (
                <div
                  key={language.language}
                  className="group min-w-0 cursor-pointer m-2"
                >
                  <div className="flex items-center gap-2 ">
                    <span className="w-5 shrink-0 text-xs font-medium text-text-tertiary group-hover:text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <Icon size={16} color="default" className="shrink-0" />

                    <span className="min-w-0 flex-1 truncate text-sm font-medium text-text-primary transition-colors group-hover:text-primary">
                      {language.language}
                    </span>

                    <span className="shrink-0 text-xs text-text-secondary group-hover:text-primary">
                      {language.time}
                    </span>
                  </div>

                  <div className="mt-2 ml-7 h-1.5 overflow-hidden rounded-full bg-background/20">
                    <div
                      className={`h-full rounded-full ${progressColors[index] ?? "bg-primary/20"} animate-[growBar_700ms_ease-out_forwards] transition-all duration-500`}
                      style={
                        {
                          "--bar-width": `${progress}%`,
                        } as React.CSSProperties
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
}
