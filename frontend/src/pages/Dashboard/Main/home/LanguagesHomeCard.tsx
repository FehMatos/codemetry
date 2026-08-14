/////// FAZER FALLBACK COM ALGUM ICON LUCIDE PARA TECHS/LINGUAGENS QUE NÃO POSSUEM ICON NO SIMPLE ICONS

import CardHeader from "@/components/CardHeader";
import Card from "@/components/Card";
import { Code2 } from "lucide-react";
import {
  SiTypescript,
  SiJavascript,
  SiCss,
  SiPython,
  SiHtml5,
} from "@icons-pack/react-simple-icons";

const languageIcons = {
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  CSS: SiCss,
  Python: SiPython,
  HTML: SiHtml5,
};

const languages = [
  {
    language: "TypeScript",
    time: "14h 32m",
    minutes: 872,
  },
  {
    language: "JavaScript",
    time: "8h 41m",
    minutes: 521,
  },
  {
    language: "CSS",
    time: "4h 12m",
    minutes: 252,
  },
  {
    language: "Python",
    time: "2h 50m",
    minutes: 170,
  },
  {
    language: "HTML",
    time: "1h 32m",
    minutes: 92,
  },
];

const progressColors = [
  "bg-primary",
  "bg-primary/80",
  "bg-primary/65",
  "bg-primary/50",
  "bg-primary/35",
];

export default function LanguagesCard() {
  const maxMinutes = Math.max(...languages.map((language) => language.minutes));
  return (
    <div className="col-span-4 hover:-translate-y-2 transition-all duration-300">
      <Card className="h-96">
        {" "}
        <CardHeader
          title="Languages"
          subtitle="Most used Technologies across all projects"
          icon={Code2}
        />
        <div className="mt-6 flex flex-col gap-4 ">
          {languages.map((language, index) => {
            const progress = (language.minutes / maxMinutes) * 100;
            const Icon = languageIcons[language.language];

            return (
              <div key={language.language} className="group cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="w-5 text-xs font-medium text-text-tertiary transition-colors group-hover:text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-1 items-center gap-2">
                    <Icon size={16} color="default" />
                    <span className="flex-1 text-sm font-medium text-text-primary transition-colors group-hover:text-primary">
                      {language.language}
                    </span>{" "}
                  </div>

                  <span className="text-xs text-text-secondary transition-colors group-hover:text-primary">
                    {language.time}
                  </span>
                </div>

                <div className="mt-2 ml-8 h-1.5 overflow-hidden rounded-full bg-background/20">
                  <div
                    className={`h-full animate-[growBar_700ms_ease-out_forwards] rounded-full ${progressColors[index]}`}

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
      </Card>
    </div>
  );
}
