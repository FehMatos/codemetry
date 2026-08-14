import { PanelsTopLeft } from "lucide-react";
import Card from "@/components/Card";
import CardHeader from "@/components/CardHeader";
export default function AllProjectsCard() {
  const projects = [
    {
      name: "Readen",
      timeObserved: "2 months 4 days",
      languages: "TypeScript, NodeJS, +9",
    },
    {
      name: "Codemetry",
      timeObserved: "1 year 3 month 12 days",
      languages: "React",
    },
    {
      name: "CRUD Manager",
      timeObserved: "7 months",
      languages: "Javascript, CSS, +2",
    },
    {
      name: "Mindscope Front",
      timeObserved: "4 months 8 days",
      languages: "Python, PostgreSQL, +7",
    },
    {
      name: "Kanban Board",
      timeObserved: "2 years 7 months 23 days",
      languages: "Mongo, HTML",
    },
  ];

  const gridCols = "grid-cols-[2fr_1.5fr_2fr]";
  {
    /* //////////////// TODO: AO CLICAR NO NOME, IR PARA A TAB DO PROJETO */
  }
  {
    /* //////////////// TODO: AO CLICAR NO NOME, IR PARA A TAB DO PROJETO */
  }
  return (
    <div className="col-span-6 hover:shadow-md hover:-translate-y-2 transition-all duration-300">
      <Card size="lg">
        {" "}
        <CardHeader title="All Projects (5) " icon={PanelsTopLeft} />
        <div className="mt-4 flex flex-col ">
          {/* Header */}
          <div
            className={`grid ${gridCols} gap-4 border-b border-border px-3 pb-2 text-xs font-medium uppercase tracking-wider text-text-tertiary `}
          >
            <span>Name</span>
            <span>Time Observed</span>
            <span>Languages</span>
          </div>

          {/* Rows (scrollable) */}
          <div className="flex max-h-56 flex-col overflow-y-auto ">
            {projects.map((project, i) => (
              <div
                key={i}
                className={`grid ${gridCols} items-center gap-4 px-3 py-3 group ${
                  i !== projects.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <span className="truncate text-sm font-medium text-text-primary group-hover:text-primary cursor-pointer">
                  {project.name}
                </span>
                <span className="truncate text-sm text-text-secondary group-hover:text-primary">
                  {project.timeObserved}
                </span>
                <span className="truncate text-sm text-text-secondary group-hover:text-primary">
                  {project.languages}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
