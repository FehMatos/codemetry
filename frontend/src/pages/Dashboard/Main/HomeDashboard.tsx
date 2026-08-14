import AllProjectsCard from "./home/AllProjectsCard";
import LanguagesCard from "./home/LanguagesHomeCard";
import MostActiveHomeCard from "./home/MostActiveHomeCard";
import OverallStreakCard from "./home/OverallStreakCard";
import ProjectsActivityCard from "./home/ProjectsActivityCard";
import TotalActiveDaysHomeCard from "./home/TotalActiveDaysHomeCard";
import TotalCodingTimeCard from "./home/TotalCodingTimeCard";

export default function HomeDashboard() {
  return (
    <div className="ml-2 mr-2 flex flex-col gap-3 ">
      <div className="grid grid-cols-10 gap-3 ">
        {/* Bloco esquerdo: 2 linhas (top pequenos + most active embaixo) */}
        <div className="col-span-4 flex flex-col gap-3">
          <div className="grid grid-cols-4 gap-3">
            <TotalCodingTimeCard />
            <TotalActiveDaysHomeCard />
          </div>
          <MostActiveHomeCard />
        </div>

        {/* Bloco direito: cards que esticam pra altura toda */}
        <ProjectsActivityCard />
      </div>

      <div className="grid grid-cols-12 gap-3">
        <OverallStreakCard />
        <LanguagesCard />
        <AllProjectsCard />
      </div>
    </div>
  );
}
