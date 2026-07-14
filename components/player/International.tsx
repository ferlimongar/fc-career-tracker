"use client";

import { useState } from "react";

type Tournament = {
  name: string;
  year: string;
  result: string;
  apps: number;
  goals: number;
  assists: number;
};


export default function International({
  international,
  tournaments,
  setTournaments,
}: {
  international: {
    country: string;
    caps: number;
    goals: number;
    assists: number;
  };

  tournaments: Tournament[];

  setTournaments: React.Dispatch<
    React.SetStateAction<Tournament[]>
  >;
}) {


  const [showForm, setShowForm] = useState(false);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const internationalTotals = tournaments.reduce(
  (total, tournament) => {
    return {
      apps: total.apps + tournament.apps,
      goals: total.goals + tournament.goals,
      assists: total.assists + tournament.assists,
    };
  },
  {
    apps: 0,
    goals: 0,
    assists: 0,
  }
);

  const [newTournament, setNewTournament] =
    useState<Tournament>({
      name: "",
      year: "",
      result: "",
      apps: 0,
      goals: 0,
      assists: 0,
    });



  function saveTournament() {

    if (editingIndex !== null) {

      const updated = [...tournaments];

      updated[editingIndex] = newTournament;

      setTournaments(updated);

    } else {

      setTournaments([
        ...tournaments,
        newTournament,
      ]);

    }


    resetForm();

  }



  function removeTournament() {

    if (editingIndex === null) return;


    setTournaments(
      tournaments.filter(
        (_, index) => index !== editingIndex
      )
    );


    resetForm();

  }



  function resetForm() {

    setNewTournament({
      name: "",
      year: "",
      result: "",
      apps: 0,
      goals: 0,
      assists: 0,
    });

    setEditingIndex(null);
    setShowForm(false);

  }



  return (

    <div className="mt-4 space-y-4 md:mt-6 md:space-y-6">


      {/* National Summary */}

      <div className="rounded-xl bg-[#0F1318] p-4 md:p-6">


        <h3 className="text-xl font-bold md:text-2xl">
          {international.country}
        </h3>


        <div className="mt-4 grid grid-cols-3 gap-3 md:mt-5 md:flex md:gap-10">


          <div>

            <p className="text-2xl font-bold md:text-3xl">
            {internationalTotals.apps}
            </p>

            <p className="text-xs text-[#A0A7B4] md:text-base">
              Caps
            </p>

          </div>



          <div>

            <p className="text-2xl font-bold md:text-3xl">
            {internationalTotals.goals}
            </p>

            <p className="text-xs text-[#A0A7B4] md:text-base">
              Goals
            </p>

          </div>

<div>

            <p className="text-2xl font-bold md:text-3xl">
            {internationalTotals.assists}
            </p>

            <p className="text-xs text-[#A0A7B4] md:text-base">
              Assists
            </p>

          </div>
        </div>


      </div>




      {/* Tournament History */}


      <div className="space-y-4 md:space-y-5">


        {tournaments.map((tournament, index) => (


          <div
            key={`${tournament.name}-${tournament.year}`}
            className="rounded-xl bg-[#0F1318] p-4 md:p-6"
          >


            <div className="flex items-start justify-between gap-2">


              <div className="min-w-0">


                <h3 className="truncate text-base font-bold md:text-xl">
                  {tournament.year} {tournament.name}
                </h3>


              </div>



              <div className="flex flex-shrink-0 items-center gap-2 md:gap-3">


                <p className="max-w-20 truncate text-xs font-bold text-[#2BA13D] md:max-w-none md:text-base">
                  🏆 {tournament.result}
                </p>



                <button
                  onClick={() => {

                    setEditingIndex(index);

                    setNewTournament(tournament);

                    setShowForm(true);

                  }}
                  className="rounded-md bg-[#2BA13D] px-2 py-1 text-xs font-medium text-white hover:bg-[#248C35] md:px-3 md:text-sm"
                >
                  Edit
                </button>


              </div>


            </div>





            <div className="mt-4 grid grid-cols-3 text-center md:mt-6">


              <div>

                <p className="text-xl font-bold md:text-2xl">
                  {tournament.apps}
                </p>

                <p className="text-xs text-[#A0A7B4] md:text-base">
                  Apps
                </p>

              </div>



              <div>

                <p className="text-xl font-bold md:text-2xl">
                  {tournament.goals}
                </p>

                <p className="text-xs text-[#A0A7B4] md:text-base">
                  Goals
                </p>

              </div>



              <div>

                <p className="text-xl font-bold md:text-2xl">
                  {tournament.assists}
                </p>

                <p className="text-xs text-[#A0A7B4] md:text-base">
                  Assists
                </p>

              </div>


            </div>



          </div>


        ))}


      </div>





      {/* Add / Edit Form */}


      {showForm && (

        <div className="rounded-xl bg-[#0F1318] p-4 space-y-2.5 md:p-6 md:space-y-3">


          <input
            value={newTournament.year}
            placeholder="Year (ex. 2034)"
            className="w-full rounded bg-[#1B2028] p-2.5 md:p-3"
            onChange={(e)=>
              setNewTournament({
                ...newTournament,
                year:e.target.value,
              })
            }
          />



          <input
            value={newTournament.name}
            placeholder="Competition"
            className="w-full rounded bg-[#1B2028] p-2.5 md:p-3"
            onChange={(e)=>
              setNewTournament({
                ...newTournament,
                name:e.target.value,
              })
            }
          />



          <input
            value={newTournament.result}
            placeholder="Result"
            className="w-full rounded bg-[#1B2028] p-2.5 md:p-3"
            onChange={(e)=>
              setNewTournament({
                ...newTournament,
                result:e.target.value,
              })
            }
          />



          <input
            value={newTournament.apps}
            type="number"
            placeholder="Apps"
            className="w-full rounded bg-[#1B2028] p-2.5 md:p-3"
            onChange={(e)=>
              setNewTournament({
                ...newTournament,
                apps:Number(e.target.value),
              })
            }
          />



          <input
            value={newTournament.goals}
            type="number"
            placeholder="Goals"
            className="w-full rounded bg-[#1B2028] p-2.5 md:p-3"
            onChange={(e)=>
              setNewTournament({
                ...newTournament,
                goals:Number(e.target.value),
              })
            }
          />



          <input
            value={newTournament.assists}
            type="number"
            placeholder="Assists"
            className="w-full rounded bg-[#1B2028] p-2.5 md:p-3"
            onChange={(e)=>
              setNewTournament({
                ...newTournament,
                assists:Number(e.target.value),
              })
            }
          />




          <div className="flex justify-between pt-2 md:pt-3">


            {editingIndex !== null && (

              <button
                onClick={removeTournament}
                className="rounded-md bg-red-600 px-3 py-2 text-xs font-medium text-white md:text-sm"
              >
                Remove
              </button>

            )}




            <button
              onClick={saveTournament}
              className="ml-auto rounded-lg bg-[#2BA13D] px-3 py-2 text-sm font-semibold text-white md:px-4"
            >
              {editingIndex !== null
                ? "Update Tournament"
                : "Add Tournament"}
            </button>


          </div>


        </div>

      )}






      <button
        onClick={()=>{
          setEditingIndex(null);

          setNewTournament({
            name:"",
            year:"",
            result:"",
            apps:0,
            goals:0,
            assists:0,
          });

          setShowForm(true);
        }}
        className="rounded-lg border border-[#2BA13D] px-4 py-2 text-sm font-semibold text-[#2BA13D] transition hover:bg-[#2BA13D] hover:text-white"
      >
        + Add Tournament
      </button>



    </div>

  );

}
