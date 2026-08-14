import SidebarFooter from "./SidebarFooter";
import SidebarLogo from "./SidebarLogo";
import SidebarNavigation from "./SidebarNavigation";

interface SidebarProps {
  activeTab: string;
  onChangeTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, onChangeTab }: SidebarProps) {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-border bg-surface overflow-hidden">
      <SidebarLogo />

      <SidebarNavigation activeTab={activeTab} onChangeTab={onChangeTab} />

      <SidebarFooter />
    </aside>
  );
}
