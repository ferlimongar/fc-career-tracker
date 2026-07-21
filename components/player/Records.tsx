import { groupLeagueGoals } from "@/utils/competitionStats";
import type { Season } from "@/types/season";

export default function Records({
  records = [],
  seasons,
}: {
  records?: string[];
  seasons: Season[];
}) {
  const leagueGoalRecords = groupLeagueGoals(seasons);

  return (
    <div className="mt-4 space-y-3 md:mt-6 md:space-y-4">
      {leagueGoalRecords.map((record) => (
        <div
          key={record.name}
          className="rounded-xl bg-[#0F1318] p-4 md:p-5"
        >
          <p className="text-sm text-[#A0A7B4]">{record.name}</p>
          <p className="mt-1 text-2xl font-bold text-[#2BA13D] md:text-3xl">
            {record.goals} goals
          </p>
        </div>
      ))}

      {records.map((record) => (
        <div
          key={record}
          className="rounded-xl bg-[#0F1318] p-4 text-sm text-white md:p-5 md:text-base"
        >
          {record}
        </div>
      ))}

      {leagueGoalRecords.length === 0 && records.length === 0 && (
        <div className="rounded-xl bg-[#0F1318] p-4 text-sm text-[#A0A7B4] md:p-5 md:text-base">
          No records yet.
        </div>
      )}
    </div>
  );
}
