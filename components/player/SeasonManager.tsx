"use client";

import { useState } from "react";
import Image from "next/image";
import { clubs } from "@/data/clubs";
import { leagueTrophies } from "@/data/trophies";
import type { CompetitionStats, CompetitionType, Season } from "@/types/season";


export default function SeasonManager({
  seasons,
  setSeasons,
}: {
  seasons: Season[];
  setSeasons: React.Dispatch<React.SetStateAction<Season[]>>;
}) {

  function getRatingHighlight(rating: number) {
    if (rating >= 8) return "bg-[#146C43]/30 text-[#55D98C]";
    if (rating >= 7) return "bg-[#A3E635]/20 text-[#BEF264]";
    if (rating >= 6) return "bg-[#EAB308]/20 text-[#FACC15]";
    if (rating >= 5) return "bg-[#F97316]/20 text-[#FB923C]";
    return "bg-[#EF4444]/20 text-[#F87171]";
  }


  const [showForm, setShowForm] = useState(false);
  const [competitionError, setCompetitionError] = useState("");

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [expandedSeasonIndex, setExpandedSeasonIndex] = useState<number | null>(null);
  const [isSelectingSeasonToEdit, setIsSelectingSeasonToEdit] = useState(false);


  const emptySeason: Season = {
    year: "",
    club: "",
    league: "",
    clubCrest: "",
    matches: 0,
    goals: 0,
    assists: 0,
    rating: 0,
    trophies: [],
    awards: [],
    competitions: [],
  };


  const [newSeason, setNewSeason] = useState<Season>(emptySeason);

  const competitions = newSeason.competitions ?? [];
  const totalAppearances = competitions.reduce(
    (sum, competition) => sum + competition.appearances,
    0,
  );
  const totalGoals = competitions.reduce(
    (sum, competition) => sum + competition.goals,
    0,
  );
  const totalAssists = competitions.reduce(
    (sum, competition) => sum + competition.assists,
    0,
  );

  function parseStatistic(value: string | number) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
  }

  function createCompetition(): CompetitionStats {
    return {
      id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
      name: "",
      type: "league",
      appearances: 0,
      goals: 0,
      assists: 0,
    };
  }

  function updateCompetition(
    id: string,
    update: Partial<CompetitionStats>,
  ) {
    setNewSeason({
      ...newSeason,
      competitions: competitions.map((competition) =>
        competition.id === id ? { ...competition, ...update } : competition,
      ),
    });
  }



  const availableTrophies =
    leagueTrophies[
      newSeason.league as keyof typeof leagueTrophies
    ] ?? [];



  function resetForm() {

    setNewSeason(emptySeason);

    setEditingIndex(null);

    setShowForm(false);
    setCompetitionError("");
    setIsSelectingSeasonToEdit(false);

  }

  function openSeasonForEditing(index: number) {
    const season = seasons[index];

    setEditingIndex(index);
    setNewSeason({
      ...season,
      trophies: season.trophies ?? [],
      awards: season.awards ?? [],
      competitions: season.competitions ?? [],
    });
    setIsSelectingSeasonToEdit(false);
    setShowForm(true);
  }




  function saveSeason() {

    const rowsWithStatsButNoName = competitions.some(
      (competition) =>
        !competition.name.trim() &&
        (competition.appearances > 0 || competition.goals > 0 || competition.assists > 0),
    );

    if (rowsWithStatsButNoName) {
      setCompetitionError("Add a competition name for each row with statistics.");
      return;
    }

    const cleanedCompetitions = competitions
      .filter(
        (competition) =>
          competition.name.trim() ||
          competition.appearances > 0 ||
          competition.goals > 0 ||
          competition.assists > 0,
      )
      .map((competition) => ({
        ...competition,
        name: competition.name.trim(),
        appearances: parseStatistic(competition.appearances),
        goals: parseStatistic(competition.goals),
        assists: parseStatistic(competition.assists),
      }));

    const competitionNames = cleanedCompetitions.map((competition) =>
      competition.name.toLocaleLowerCase(),
    );

    if (new Set(competitionNames).size !== competitionNames.length) {
      setCompetitionError("Competition names must be unique within a season.");
      return;
    }


    const seasonToSave = {
      ...newSeason,
      trophies: newSeason.trophies ?? [],
      competitions: cleanedCompetitions,
      matches: cleanedCompetitions.reduce(
        (sum, competition) => sum + competition.appearances,
        0,
      ),
      goals: cleanedCompetitions.reduce(
        (sum, competition) => sum + competition.goals,
        0,
      ),
      assists: cleanedCompetitions.reduce(
        (sum, competition) => sum + competition.assists,
        0,
      ),
    };


    if (editingIndex !== null) {

      const updated = [...seasons];

      updated[editingIndex] = seasonToSave;

      setSeasons(updated);


    } else {


      setSeasons([
        ...seasons,
        seasonToSave
      ]);


    }


    resetForm();

  }




  function removeSeason() {


    if (editingIndex === null)
      return;


    setSeasons(
      seasons.filter(
        (_, index) => index !== editingIndex
      )
    );


    resetForm();

  }





  return (

    <div className="space-y-5">


      {/* SEASON CARDS */}

      {seasons.map((season, index) => {

        const seasonCompetitions = season.competitions ?? [];


        return (

          <div
            key={index}
            onClick={() => isSelectingSeasonToEdit && openSeasonForEditing(index)}
            className={`relative border-b border-[#2C323D] py-3 last:border-b-0 md:min-h-[72px] md:px-3 ${
              isSelectingSeasonToEdit
                ? "cursor-pointer rounded-lg outline outline-1 outline-[#2BA13D]/50 hover:bg-[#2BA13D]/10"
                : ""
            }`}
          >


            <div className="flex items-start justify-between gap-3 md:block">


                <div className="flex min-w-0 flex-1 items-start gap-2 md:gap-3 md:pr-[330px]">


                <div className="h-8 w-8 flex-shrink-0 self-start md:h-11 md:w-11">


                  {season.clubCrest && (

                    <Image
                      src={season.clubCrest}
                      alt={season.club}
                      width={70}
                      height={70}
                      className="h-full w-full object-contain"
                    />

                  )}


                </div>




                <div className="grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)_136px] md:block">


                  <h3 className="col-start-1 truncate text-xs font-semibold text-white md:text-base">
                    {season.club}
                  </h3>


                  <p className="col-start-1 truncate text-[10px] text-[#A0A7B4] md:text-xs">
                    {season.year}
                  </p>




                  <div className="col-start-2 row-span-2 row-start-1 grid flex-shrink-0 grid-cols-[16px_24px_24px_24px_32px] gap-1 text-center md:absolute md:right-0 md:top-3 md:grid-cols-[40px_54px_54px_54px_72px] md:gap-0">

                    <button
                      type="button"
                      aria-label={
                        expandedSeasonIndex === index
                          ? "Collapse season details"
                          : "Expand season details"
                      }
                      disabled={seasonCompetitions.length === 0}
                      onClick={(event) => {
                        event.stopPropagation();
                        setExpandedSeasonIndex(
                          expandedSeasonIndex === index ? null : index,
                        );
                      }}
                      className="pt-1 text-[#A0A7B4] disabled:cursor-default disabled:opacity-30"
                    >
                      ⌄
                    </button>


                    <div className="flex flex-col items-center py-1 text-center">

                      <span className="text-xs font-semibold text-white md:text-base">
                        {season.matches}
                      </span>

                    </div>



                    <div className="flex flex-col items-center py-1 text-center">

                      <span className="text-xs font-semibold text-white md:text-base">
                        {season.goals}
                      </span>

                    </div>




                    <div className="flex flex-col items-center py-1 text-center">

                      <span className="text-xs font-semibold text-white md:text-base">
                        {season.assists}
                      </span>

                    </div>




                    <div
                      className={`mt-1 flex self-start justify-self-center rounded-md px-0.5 py-px text-center leading-none ${getRatingHighlight(Number(season.rating))}`}
                    >

                      <span className="text-xs font-semibold md:text-sm">
                        {Number(season.rating).toFixed(1)}
                      </span>

                    </div>


                  </div>



                  {seasonCompetitions.length > 0 && expandedSeasonIndex === index && (
                    <div className="col-span-2 mt-4 md:mt-5 md:w-[calc(100%+330px)]">
                      <div
                        aria-label="Toggle competition statistics"
                        className="hidden"
                      >
                        <span aria-hidden="true">⌄</span>
                        <span className="sr-only">Toggle competition statistics</span>
                      </div>

                      <div className="space-y-3 md:hidden">
                        {seasonCompetitions.map((competition) => (
                          <div
                            key={competition.id}
                            className="grid grid-cols-[minmax(0,1fr)_16px_24px_24px_24px_32px] items-center gap-1 py-1 text-center text-xs"
                          >
                            <p className="truncate text-left text-sm font-medium text-white">
                              {competition.name}
                            </p>
                            <span aria-hidden="true" />
                            <span className="font-semibold text-[#A0A7B4]">{competition.appearances}</span>
                            <span className="font-semibold text-[#A0A7B4]">{competition.goals}</span>
                            <span className="font-semibold text-[#A0A7B4]">{competition.assists}</span>
                            <span aria-hidden="true" />
                          </div>
                        ))}
                      </div>

                      <div className="hidden text-sm md:block">
                        {seasonCompetitions.map((competition) => (
                          <div
                            key={competition.id}
                            className="grid grid-cols-[minmax(0,1fr)_40px_54px_54px_54px_72px] items-center py-2"
                          >
                            <span className="truncate text-white">{competition.name}</span>
                            <span aria-hidden="true" />
                            <span className="text-center text-[#A0A7B4]">{competition.appearances}</span>
                            <span className="text-center text-[#A0A7B4]">{competition.goals}</span>
                            <span className="text-center text-[#A0A7B4]">{competition.assists}</span>
                            <span aria-hidden="true" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}


                </div>


              </div>
            </div>


          </div>


        );


      })}

      {/* FORM */}

      {showForm && (

        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 md:items-center md:p-6">

          <div className="my-auto max-h-[calc(100dvh-2rem)] w-full max-w-3xl overflow-y-auto rounded-2xl bg-[#1B2028] p-4 shadow-2xl md:p-8">

            <div className="mb-4 flex items-center justify-between md:mb-6">

              <h2 className="text-xl font-bold text-white md:text-3xl">
                {editingIndex !== null ? "Edit Season" : "Add Season"}
              </h2>

              <button
                onClick={resetForm}
                className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700 md:px-4"
              >
                Close
              </button>

            </div>

            <div className="space-y-3 md:space-y-4">


          <div>

            <label className="mb-1 block text-sm text-[#A0A7B4]">
              Season
            </label>

            <input
              value={newSeason.year}
              placeholder="2033/34"
              className="w-full rounded bg-[#1B2028] p-2.5 md:p-3"
              onChange={(e) =>
                setNewSeason({
                  ...newSeason,
                  year: e.target.value,
                })
              }
            />

          </div>




          <div>

            <label className="mb-1 block text-sm text-[#A0A7B4]">
              Club
            </label>


            <select

              value={newSeason.club}

              className="w-full rounded bg-[#1B2028] p-2.5 md:p-3"

              onChange={(e) => {

                const selectedClub = clubs.find(
                  (club) => club.name === e.target.value
                );


                if (!selectedClub)
                  return;



                setNewSeason({

                  ...newSeason,

                  club: selectedClub.name,

                  league: selectedClub.league,

                  clubCrest: selectedClub.crest,

                });


              }}

            >


              <option value="">
                Select Club
              </option>



              {clubs.map((club) => (

                <option
                  key={club.name}
                  value={club.name}
                >
                  {club.name}
                </option>

              ))}


            </select>


          </div>





          <div>

            <label className="mb-1 block text-sm text-[#A0A7B4]">
              League
            </label>


            <input

              value={newSeason.league}

              disabled

              className="w-full rounded bg-[#1B2028] p-2.5 text-[#A0A7B4] md:p-3"

            />


          </div>





          <div>

            <p className="mb-2 text-[#A0A7B4]">
              Trophies Won
            </p>


            {availableTrophies.map((trophy) => (

              <label
                key={trophy}
                className="flex items-center gap-3 text-white"
              >


                <input

                  type="checkbox"

                  checked={
                    newSeason.trophies.includes(trophy)
                  }


                  onChange={() => {


                    const updatedTrophies =
                      newSeason.trophies.includes(trophy)

                        ?

                        newSeason.trophies.filter(
                          (item) => item !== trophy
                        )

                        :

                        [
                          ...newSeason.trophies,
                          trophy
                        ];



                    setNewSeason({

                      ...newSeason,

                      trophies: updatedTrophies,

                    });


                  }}

                />


                {trophy}


              </label>


            ))}


          </div>


<div>

<p className="mb-2 text-[#A0A7B4]">
Individual Awards
</p>


<div className="flex gap-2">

<input
placeholder="Example: Golden Boot"
id="awardInput"
className="flex-1 rounded bg-[#1B2028] p-2.5 md:p-3"
/>


<button
className="rounded bg-[#2BA13D] px-4"
onClick={() => {

const input =
document.getElementById("awardInput") as HTMLInputElement;


if(!input.value)
return;


setNewSeason({

...newSeason,

awards:[
...newSeason.awards,
input.value
]

});


input.value="";

}}
>
Add
</button>

</div>


<div className="mt-3 flex flex-wrap gap-2">

{newSeason.awards.map((award)=>(

<span
key={award}
className="rounded-full bg-[#1B2028] px-3 py-1"
>
🏅 {award}
</span>

))}

</div>


</div>


          <details className="rounded-lg border border-[#2C323D] bg-[#0F1318] p-3">
            <summary className="cursor-pointer text-sm font-semibold text-white">
              Competition breakdown
            </summary>

            <div className="mt-3 space-y-3">
              {competitions.map((competition) => (
                <div
                  key={competition.id}
                  className="grid grid-cols-2 gap-2 rounded-lg bg-[#1B2028] p-3 md:grid-cols-[minmax(0,1fr)_150px_90px_90px_90px_auto]"
                >
                  <input
                    value={competition.name}
                    placeholder="Competition name"
                    className="col-span-2 min-w-0 rounded bg-[#0F1318] p-2 text-sm md:col-span-1"
                    onChange={(event) =>
                      updateCompetition(competition.id, { name: event.target.value })
                    }
                  />

                  <select
                    value={competition.type}
                    className="min-w-0 rounded bg-[#0F1318] p-2 text-sm"
                    onChange={(event) =>
                      updateCompetition(competition.id, {
                        type: event.target.value as CompetitionType,
                      })
                    }
                  >
                    <option value="league">League</option>
                    <option value="domestic-cup">Domestic cup</option>
                    <option value="continental-cup">Continental cup</option>
                    <option value="other">Other</option>
                  </select>

                  {(
                    [
                      ["appearances", "Apps"],
                      ["goals", "Goals"],
                      ["assists", "Assists"],
                    ] as const
                  ).map(([field, label]) => (
                    <input
                      key={field}
                      type="number"
                      min="0"
                      inputMode="numeric"
                      value={competition[field] || ""}
                      aria-label={label}
                      placeholder={label}
                      className="min-w-0 rounded bg-[#0F1318] p-2 text-sm"
                      onChange={(event) =>
                        updateCompetition(competition.id, {
                          [field]: parseStatistic(event.target.value),
                        })
                      }
                    />
                  ))}

                  <button
                    type="button"
                    onClick={() =>
                      setNewSeason({
                        ...newSeason,
                        competitions: competitions.filter(
                          (item) => item.id !== competition.id,
                        ),
                      })
                    }
                    className="rounded bg-red-600 px-2 py-1 text-xs font-medium text-white hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  setNewSeason({
                    ...newSeason,
                    competitions: [...competitions, createCompetition()],
                  })
                }
                className="rounded border border-[#2BA13D] px-3 py-2 text-sm font-semibold text-[#2BA13D] hover:bg-[#2BA13D] hover:text-white"
              >
                + Add competition
              </button>

              {competitionError && (
                <p className="text-sm text-red-400">{competitionError}</p>
              )}
            </div>
          </details>

          <div className="grid grid-cols-3 gap-2 rounded-lg bg-[#0F1318] p-3 text-center">
            <div>
              <p className="text-lg font-bold text-white">{totalAppearances}</p>
              <p className="text-xs text-[#A0A7B4]">Apps</p>
            </div>
            <div>
              <p className="text-lg font-bold text-white">{totalGoals}</p>
              <p className="text-xs text-[#A0A7B4]">Goals</p>
            </div>
            <div>
              <p className="text-lg font-bold text-white">{totalAssists}</p>
              <p className="text-xs text-[#A0A7B4]">Assists</p>
            </div>
          </div>





          <div>

            <label className="mb-1 block text-sm text-[#A0A7B4]">
              Rating
            </label>


            <input

              type="number"

              step="0.01"

              value={newSeason.rating}

              className="w-full rounded bg-[#1B2028] p-2.5 md:p-3"

              onChange={(e) =>
                setNewSeason({
                  ...newSeason,
                  rating: Number(e.target.value),
                })
              }

            />


          </div>





          <div className="flex justify-between pt-3">


            <button

              onClick={removeSeason}

              className={`rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700 md:px-4 ${
                editingIndex === null
                  ? "invisible"
                  : ""
              }`}

            >

              Remove Season

            </button>





            <button

              onClick={saveSeason}

              className="rounded-lg bg-[#2BA13D] px-3 py-2 text-sm font-semibold text-white hover:bg-[#248C35] md:px-4"

            >

              {editingIndex !== null
                ? "Update Season"
                : "Add Season"}

            </button>


          </div>


            </div>

          </div>

        </div>


      )}






      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setIsSelectingSeasonToEdit((isSelecting) => !isSelecting)}
          disabled={seasons.length === 0}
          className="rounded-lg border border-[#A0A7B4] px-4 py-2 text-sm font-semibold text-[#A0A7B4] hover:bg-[#A0A7B4] hover:text-[#0F1318] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isSelectingSeasonToEdit ? "Cancel Edit" : "Edit Season"}
        </button>

        <button
          type="button"
          onClick={() => {
            setIsSelectingSeasonToEdit(false);
            setEditingIndex(null);
            setNewSeason(emptySeason);
            setShowForm(true);
          }}
          className="rounded-lg border border-[#2BA13D] px-4 py-2 text-sm font-semibold text-[#2BA13D] hover:bg-[#2BA13D] hover:text-white"
        >
          + Add Season
        </button>
      </div>



    </div>

  );

}
