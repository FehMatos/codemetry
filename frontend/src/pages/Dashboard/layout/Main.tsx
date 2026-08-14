import Header from "./Header";
import HomeDashboard from "../Main/HomeDashboard";
import ProjectDashboard from "../Main/ProjectDashboard";

function Main({ activeTab }: { activeTab: string }) {
  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <Header activeTab={activeTab} />

      {activeTab === "home" && <HomeDashboard />}

      {activeTab === "readen" && <ProjectDashboard />}
    </div>
  );
}

export default Main;
