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
            className="rounded-xl bg-[#1B2028] p-6"
          >


            <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-start">


              <div className="flex gap-5">


                <div className="h-[70px] w-[70px] flex-shrink-0">


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




                <div>


                  <h3 className="text-2xl font-bold text-white">
                    {season.year}
                  </h3>


                  <p className="font-medium text-white">
                    {season.club}
                  </p>


                  <p className="text-[#A0A7B4]">
                    {season.league}
                  </p>




                  <div className="mt-5 flex flex-wrap gap-3">


                    <div className="rounded-full bg-[#0F1318] px-4 py-2">

                      <span className="text-2xl font-bold">
                        {season.matches}
                      </span>

                      <span className="ml-2 text-[#A0A7B4]">
                        Apps
                      </span>

                    </div>



                    <div className="rounded-full bg-[#0F1318] px-4 py-2">

                      <span className="text-2xl font-bold">
                        {season.goals}
                      </span>

                      <span className="ml-2 text-[#A0A7B4]">
                        Goals
                      </span>

                    </div>




                    <div className="rounded-full bg-[#0F1318] px-4 py-2">

                      <span className="text-2xl font-bold">
                        {season.assists}
                      </span>

                      <span className="ml-2 text-[#A0A7B4]">
                        Assists
                      </span>

                    </div>




                    <div className="rounded-full bg-[#0F1318] px-4 py-2">

                      ⭐

                      <span className="text-2xl font-bold">
                        {season.rating}
                      </span>

                    </div>


                  </div>



                  {seasonTrophies.length > 0 && (

                    <div className="mt-5 flex flex-wrap gap-2">


                      {seasonTrophies.map((trophy) => (

                        <span
                          key={trophy}
                          className="rounded-full bg-[#0F1318] px-3 py-1 text-sm text-white"
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

                className="rounded-md bg-[#2BA13D] px-3 py-1 text-sm font-medium text-white hover:bg-[#248C35]"

              >

                Edit

              </button>



            </div>


          </div>


        );


      })}

      {/* FORM */}

      {showForm && (

        <div className="rounded-xl bg-[#0F1318] p-6 space-y-4">


          <div>

            <label className="mb-1 block text-sm text-[#A0A7B4]">
              Season
            </label>

            <input
              value={newSeason.year}
              placeholder="2033/34"
              className="w-full rounded bg-[#1B2028] p-3"
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

              className="w-full rounded bg-[#1B2028] p-3"

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

              className="w-full rounded bg-[#1B2028] p-3 text-[#A0A7B4]"

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
className="flex-1 rounded bg-[#1B2028] p-3"
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

              className="w-full rounded bg-[#1B2028] p-3"

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

              className="w-full rounded bg-[#1B2028] p-3"

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

              className="w-full rounded bg-[#1B2028] p-3"

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

              className="w-full rounded bg-[#1B2028] p-3"

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

              className={`rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 ${
                editingIndex === null
                  ? "invisible"
                  : ""
              }`}

            >

              Remove Season

            </button>





            <button

              onClick={saveSeason}

              className="rounded-lg bg-[#2BA13D] px-4 py-2 font-semibold text-white hover:bg-[#248C35]"

            >

              {editingIndex !== null
                ? "Update Season"
                : "Add Season"}

            </button>


          </div>


        </div>


      )}






      <button

        onClick={() => {

          setShowForm(!showForm);

          if (showForm) {
            setEditingIndex(null);
            setNewSeason(emptySeason);
          }

        }}

        className="rounded-lg border border-[#2BA13D] px-4 py-2 text-sm font-semibold text-[#2BA13D] hover:bg-[#2BA13D] hover:text-white"

      >

        + Add Season

      </button>



    </div>

  );

}