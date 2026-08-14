import TotalActiveDaysProjectCard from "./project/TotalActiveDaysProjectCard";
import CodingActivityCard from "./project/CodingActivityCard";
import CurrentStreakCard from "./project/CurrentStreakCard";
import DailyTimeCodedCard from "./project/DailyTimeCodedCard";
import MostActiveCodingTimeCard from "./project/MostActiveCodingTimesCard";
import MostActiveDaysCard from "./project/MostActiveDaysCard";
import MostActiveFilesCard from "./project/MostActiveFilesCard";
import TotalCommitsCard from "./project/TotalCommitsCard";
import LanguagesProjectCard from "./project/LanguagesProjectCard";

export default function ProjectDashboard() {
  return (
    <div className="ml-2 mr-2 flex flex-col gap-3">
      {/* Linha 1: active days + commits (empilhados) | gauge | streak | most active files */}
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-3 flex flex-col gap-3">
          <TotalActiveDaysProjectCard />
          <TotalCommitsCard />
        </div>

        <DailyTimeCodedCard />
        <CurrentStreakCard />
        <MostActiveFilesCard />
      </div>
      {/* Linha 3: coding activity (full width) */}
      <CodingActivityCard />
      {/* Linha 2: languages | (coding times + active days empilhados) */}
      <div className="grid grid-cols-10 gap-3">
        <LanguagesProjectCard />

        <div className="col-span-6 flex flex-col gap-3">
          <MostActiveCodingTimeCard />
          <MostActiveDaysCard />
        </div>
      </div>
    </div>
  );
}
