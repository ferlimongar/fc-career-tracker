"use client";

import { useState } from "react";
import Image from "next/image";
import { clubs } from "@/data/clubs";
import { leagueTrophies } from "@/data/trophies";

type Season = {
  year: string;
  club: string;
  league: string;
  clubCrest: string;
  matches: number;
  goals: number;
  assists: number;
  rating: number;
  trophies: string[];
  awards: string[];
};


export default function SeasonManager({
  seasons,
  setSeasons,
}: {
  seasons: Season[];
  setSeasons: React.Dispatch<React.SetStateAction<Season[]>>;
}) {


  const [showForm, setShowForm] = useState(false);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);


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
  };


  const [newSeason, setNewSeason] = useState<Season>(emptySeason);



  const availableTrophies =
    leagueTrophies[
      newSeason.league as keyof typeof leagueTrophies
    ] ?? [];



  function resetForm() {

    setNewSeason(emptySeason);

    setEditingIndex(null);

    setShowForm(false);

  }




  function saveSeason() {


    const seasonToSave = {
      ...newSeason,
      trophies: newSeason.trophies ?? [],
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

        const seasonTrophies = season.trophies ?? [];


        return (

          <div
            key={index}
            className="rounded-xl bg-[#1B2028] p-4 md:p-6"
          >


            <div className="flex items-start justify-between gap-3">


              <div className="flex min-w-0 flex-1 gap-3 md:gap-5">


                <div className="h-12 w-12 flex-shrink-0 md:h-[70px] md:w-[70px]">


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




                <div className="min-w-0 flex-1">


                  <h3 className="text-lg font-bold text-white md:text-2xl">
                    {season.year}
                  </h3>


                  <p className="truncate text-sm font-medium text-white md:text-base">
                    {season.club}
                  </p>


                  <p className="truncate text-xs text-[#A0A7B4] md:text-base">
                    {season.league}
                  </p>




                  <div className="mt-4 grid grid-cols-4 gap-2 md:mt-5 md:flex md:flex-wrap md:gap-3">


                    <div className="flex flex-col items-center rounded-lg bg-[#0F1318] px-2 py-1.5 text-center md:block md:rounded-full md:px-4 md:py-2">

                      <span className="text-base font-bold md:text-2xl">
                        {season.matches}
                      </span>

                      <span className="text-[10px] text-[#A0A7B4] md:ml-2 md:text-base">
                        Apps
                      </span>

                    </div>



                    <div className="flex flex-col items-center rounded-lg bg-[#0F1318] px-2 py-1.5 text-center md:block md:rounded-full md:px-4 md:py-2">

                      <span className="text-base font-bold md:text-2xl">
                        {season.goals}
                      </span>

                      <span className="text-[10px] text-[#A0A7B4] md:ml-2 md:text-base">
                        Goals
                      </span>

                    </div>




                    <div className="flex flex-col items-center rounded-lg bg-[#0F1318] px-2 py-1.5 text-center md:block md:rounded-full md:px-4 md:py-2">

                      <span className="text-base font-bold md:text-2xl">
                        {season.assists}
                      </span>

                      <span className="text-[10px] text-[#A0A7B4] md:ml-2 md:text-base">
                        Assists
                      </span>

                    </div>




                    <div className="flex flex-col items-center rounded-lg bg-[#0F1318] px-2 py-1.5 text-center md:block md:rounded-full md:px-4 md:py-2">

                      ⭐

                      <span className="text-base font-bold md:text-2xl">
                        {season.rating}
                      </span>

                    </div>


                  </div>



                  {seasonTrophies.length > 0 && (

                    <div className="mt-4 flex flex-wrap gap-2 md:mt-5">


                      {seasonTrophies.map((trophy) => (

                        <span
                          key={trophy}
                          className="rounded-full bg-[#0F1318] px-2 py-1 text-xs text-white md:px-3 md:text-sm"
                        >
                          🏆 {trophy}
                        </span>

                      ))}


                    </div>

                  )}


                </div>


              </div>





              <button

                onClick={() => {

                  setEditingIndex(index);

                 setNewSeason({
  ...season,
  trophies: season.trophies ?? [],
  awards: season.awards ?? [],
});

                  setShowForm(true);

                }}

                className="flex-shrink-0 rounded-md bg-[#2BA13D] px-2 py-1 text-xs font-medium text-white hover:bg-[#248C35] md:px-3 md:text-sm"

              >

                Edit

              </button>



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


          <div>

            <label className="mb-1 block text-sm text-[#A0A7B4]">
              Apps
            </label>

            <input

              type="number"

              value={newSeason.matches}

              className="w-full rounded bg-[#1B2028] p-2.5 md:p-3"

              onChange={(e) =>
                setNewSeason({
                  ...newSeason,
                  matches: Number(e.target.value),
                })
              }

            />

          </div>





          <div>

            <label className="mb-1 block text-sm text-[#A0A7B4]">
              Goals
            </label>


            <input

              type="number"

              value={newSeason.goals}

              className="w-full rounded bg-[#1B2028] p-2.5 md:p-3"

              onChange={(e) =>
                setNewSeason({
                  ...newSeason,
                  goals: Number(e.target.value),
                })
              }

            />


          </div>





          <div>

            <label className="mb-1 block text-sm text-[#A0A7B4]">
              Assists
            </label>


            <input

              type="number"

              value={newSeason.assists}

              className="w-full rounded bg-[#1B2028] p-2.5 md:p-3"

              onChange={(e) =>
                setNewSeason({
                  ...newSeason,
                  assists: Number(e.target.value),
                })
              }

            />


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






      <button

        onClick={() => {

          setEditingIndex(null);
          setNewSeason(emptySeason);
          setShowForm(true);

        }}

        className="rounded-lg border border-[#2BA13D] px-4 py-2 text-sm font-semibold text-[#2BA13D] hover:bg-[#2BA13D] hover:text-white"

      >

        + Add Season

      </button>



    </div>

  );

}
