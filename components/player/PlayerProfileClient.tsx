"use client";

import { useEffect, useState } from "react";import Image from "next/image";
import ProfileTabs from "./ProfileTabs";
import { calculateCareerStats } from "@/utils/careerStats";

export default function PlayerProfileClient({
  player,
}: {
  player: any;
}) {

 const [playerData, setPlayerData] = useState(() => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(`player-${player.id}`);

    if (saved) {
      return JSON.parse(saved);
    }
  }

  return player;
});

const [seasons, setSeasons] = useState(() => {
  if (typeof window === "undefined") {
    return player.seasons;
  }

  const saved = localStorage.getItem(
    `player-${player.id}-seasons`
  );

  if (!saved) {
    return player.seasons;
  }

  return JSON.parse(saved).map((season: any) => ({
    ...season,
    trophies: season.trophies ?? [],
    clubCrest: season.clubCrest ?? "",
  }));
});

const [internationalTournaments, setInternationalTournaments] = useState(() => {

  if (typeof window !== "undefined") {

    const saved = localStorage.getItem(
      `player-${player.id}-international`
    );

    if (saved) {
      return JSON.parse(saved);
    }

  }

  return player.international.tournaments;

});
useEffect(() => {

  localStorage.setItem(
    `player-${playerData.id}-seasons`,
    JSON.stringify(seasons)
  );

}, [seasons, playerData.id]);



useEffect(() => {

  localStorage.setItem(
    `player-${playerData.id}-international`,
    JSON.stringify(internationalTournaments)
  );

}, [internationalTournaments, playerData.id]);

useEffect(() => {
  localStorage.setItem(
    `player-${playerData.id}`,
    JSON.stringify(playerData)
  );
}, [playerData, playerData.id]);

  const stats = calculateCareerStats(seasons);



  return (
    <main className="min-h-screen bg-[#0B0D10] p-4 md:p-10 text-white">

      {/* PLAYER HEADER */}
      <section className="rounded-xl bg-[#1B2028] p-8">

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">


          {/* LEFT SIDE */}
          <div className="flex items-center gap-6">


            <Image
            src={playerData.clubCrest}
            alt={playerData.club}
            width={90}
            height={90}
            className="h-[70px] w-[70px] md:h-[90px] md:w-[90px]"
/>


            <div>


              <div className="flex items-center gap-3">


                <Image
                  src={playerData.flag}
                  alt={playerData.nationality}
                  width={30}
                  height={20}
                />


                <h1 className="text-3xl md:text-5xl font-bold">
                  {playerData.name}
                </h1>


              </div>


              <p className="mt-2 text-xl text-[#A0A7B4]">
                {playerData.position} • {playerData.club}
              </p>


              <div className="mt-5 grid grid-cols-2 gap-4 text-[#A0A7B4] md:flex md:gap-8">


                <div>
                  <p className="text-sm">
                    Height
                  </p>

                  <p className="font-semibold text-white">
                    {playerData.playerInfo.height}
                  </p>
                </div>


                <div>
                  <p className="text-sm">
                    Age
                  </p>

                  <p className="font-semibold text-white">
                    {playerData.playerInfo.age}
                  </p>
                </div>


                <div>
                  <p className="text-sm">
                    Shirt
                  </p>

                  <p className="font-semibold text-white">
                    #{playerData.playerInfo.shirt}
                  </p>
                </div>


                <div>
                  <p className="text-sm">
                    Foot
                  </p>

                  <p className="font-semibold text-white">
                    {playerData.playerInfo.foot}
                  </p>
                </div>


                <div>
                  <p className="text-sm">
                    Value
                  </p>

                  <p className="font-semibold text-white">
                    {playerData.playerInfo.value}
                  </p>
                </div>


              </div>


            </div>


          </div>




          {/* OVERALL */}
          <div className="flex h-24 w-24 md:h-28 md:w-28 flex-col items-center justify-center self-center">


            <p className="text-5xl font-bold text-[#2BA13D]">
              {playerData.overall}
            </p>


            <p className="text-sm tracking-widest text-[#A0A7B4]">
              OVR
            </p>


          </div>


        </div>


      </section>





      {/* CAREER STATS */}
      <section className="mt-8">


        <h2 className="mb-4 text-3xl font-bold">
          Career Statistics
        </h2>



        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">


          <StatCard
            value={stats.matches}
            label="Apps"
          />


          <StatCard
            value={stats.goals}
            label="Goals"
          />


          <StatCard
            value={stats.assists}
            label="Assists"
          />


          <StatCard
            value={stats.goals + stats.assists}
            label="G+A"
          />


          <StatCard
            value={stats.rating}
            label="Rating"
          />


        </div>


      </section>





      {/* PROFILE TABS */}
      <ProfileTabs
  player={playerData}
  setPlayer={setPlayerData}
  seasons={seasons}
  setSeasons={setSeasons}
  internationalTournaments={internationalTournaments}
  setInternationalTournaments={setInternationalTournaments}
/>


    </main>
  );
}

function StatCard({
  value,
  label,
}: {
  value: string | number;
  label: string;
}) {

  return (

    <div className="rounded-xl bg-[#1B2028] p-5 text-center">


      <p className="text-3xl font-bold">
        {value}
      </p>


      <p className="mt-1 text-sm text-[#A0A7B4]">
        {label}
      </p>


    </div>
    );  
}
