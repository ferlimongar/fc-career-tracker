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

    <div className="mt-6 space-y-6">


      {/* National Summary */}

      <div className="rounded-xl bg-[#0F1318] p-6">


        <h3 className="text-2xl font-bold">
          {international.country}
        </h3>


        <div className="mt-5 flex gap-10">


          <div>

            <p className="text-3xl font-bold">
            {internationalTotals.apps}
            </p>

            <p className="text-[#A0A7B4]">
              Caps
            </p>

          </div>



          <div>

            <p className="text-3xl font-bold">
            {internationalTotals.goals}
            </p>

            <p className="text-[#A0A7B4]">
              Goals
            </p>

          </div>

<div>

            <p className="text-3xl font-bold">
            {internationalTotals.assists}
            </p>

            <p className="text-[#A0A7B4]">
              Assists
            </p>

          </div>
        </div>


      </div>




      {/* Tournament History */}


      <div className="space-y-5">


        {tournaments.map((tournament, index) => (


          <div
            key={`${tournament.name}-${tournament.year}`}
            className="rounded-xl bg-[#0F1318] p-6"
          >


            <div className="flex justify-between items-start">


              <div>


                <h3 className="text-xl font-bold">
                  {tournament.year} {tournament.name}
                </h3>


              </div>



              <div className="flex items-center gap-3">


                <p className="font-bold text-[#2BA13D]">
                  🏆 {tournament.result}
                </p>



                <button
                  onClick={() => {

                    setEditingIndex(index);

                    setNewTournament(tournament);

                    setShowForm(true);

                  }}
                  className="rounded-md bg-[#2BA13D] px-3 py-1 text-sm font-medium text-white hover:bg-[#248C35]"
                >
                  Edit
                </button>


              </div>


            </div>





            <div className="mt-6 grid grid-cols-3 text-center">


              <div>

                <p className="text-2xl font-bold">
                  {tournament.apps}
                </p>

                <p className="text-[#A0A7B4]">
                  Apps
                </p>

              </div>



              <div>

                <p className="text-2xl font-bold">
                  {tournament.goals}
                </p>

                <p className="text-[#A0A7B4]">
                  Goals
                </p>

              </div>



              <div>

                <p className="text-2xl font-bold">
                  {tournament.assists}
                </p>

                <p className="text-[#A0A7B4]">
                  Assists
                </p>

              </div>


            </div>



          </div>


        ))}


      </div>





      {/* Add / Edit Form */}


      {showForm && (

        <div className="rounded-xl bg-[#0F1318] p-6 space-y-3">


          <input
            value={newTournament.year}
            placeholder="Year (ex. 2034)"
            className="w-full rounded bg-[#1B2028] p-3"
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
            className="w-full rounded bg-[#1B2028] p-3"
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
            className="w-full rounded bg-[#1B2028] p-3"
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
            className="w-full rounded bg-[#1B2028] p-3"
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
            className="w-full rounded bg-[#1B2028] p-3"
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
            className="w-full rounded bg-[#1B2028] p-3"
            onChange={(e)=>
              setNewTournament({
                ...newTournament,
                assists:Number(e.target.value),
              })
            }
          />




          <div className="flex justify-between pt-3">


            {editingIndex !== null && (

              <button
                onClick={removeTournament}
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white"
              >
                Remove
              </button>

            )}




            <button
              onClick={saveTournament}
              className="ml-auto rounded-lg bg-[#2BA13D] px-4 py-2 font-semibold text-white"
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