import { Home, Code } from "lucide-react";

const projects = [
  {
    id: "readen",
    name: "Readen",
  },
  {
    id: "crud-manager",
    name: "CRUD Manager",
  },
  {
    id: "kanban-board",
    name: "Kanban Board",
  },
];

function NavItem({
  icon: Icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
        active
          ? "bg-surface-secondary text-text-primary"
          : "text-text-secondary hover:bg-surface-secondary hover:text-text-primary"
      }`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="truncate">{label}</span>
    </button>
  );
}

interface SidebarNavigationProps {
  activeTab: string;
  onChangeTab: (tab: string) => void;
}

export default function SidebarNavigation({
  activeTab,
  onChangeTab,
}: SidebarNavigationProps) {
  return (
    <div className="flex-1 overflow-auto px-3 py-4">
      <nav className="flex flex-col">
        <section className="mb-8 flex flex-col gap-1">
          <NavItem
            icon={Home}
            label="Home"
            active={activeTab === "home"}
            onClick={() => onChangeTab("home")}
          />
        </section>

        <section>
          <h2 className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-text-tertiary">
            Projects
          </h2>

          <div className="flex flex-col gap-1">
            {projects.map((project) => (
              <NavItem
                key={project.name}
                icon={Code}
                label={project.name}
                active={activeTab === project.id}
                onClick={() => onChangeTab(project.id)}
              />
            ))}
          </div>
        </section>
      </nav>
    </div>
  );
}
