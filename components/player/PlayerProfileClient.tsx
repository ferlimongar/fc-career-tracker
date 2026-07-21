"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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

      <Link
        href="/"
        className="mb-4 inline-flex items-center rounded-md border border-[#2C323D] px-3 py-2 text-sm font-medium text-[#A0A7B4] transition hover:border-[#2BA13D] hover:text-white md:mb-6"
      >
        ← Back to home
      </Link>

      {/* PLAYER HEADER */}
      <section className="rounded-xl bg-[#1B2028] p-3 md:p-8">

        <div className="flex flex-nowrap items-center justify-between gap-2 md:gap-6">


          {/* LEFT SIDE */}
          <div className="flex min-w-0 flex-1 items-center gap-2 md:gap-6">


            <Image
            src={playerData.clubCrest}
            alt={playerData.club}
            width={90}
            height={90}
            className="h-10 w-10 flex-shrink-0 md:h-[90px] md:w-[90px]"
/>


            <div className="min-w-0">


              <div className="flex min-w-0 items-center gap-1.5 md:gap-3">


                <Image
                  src={playerData.flag}
                  alt={playerData.nationality}
                  width={30}
                  height={20}
                  className="h-auto w-4 flex-shrink-0 md:w-[30px]"
                />


                <h1 className="truncate text-lg font-bold leading-tight md:text-5xl">
                  {playerData.name}
                </h1>


              </div>


              <p className="mt-0.5 truncate text-xs text-[#A0A7B4] md:mt-2 md:text-xl">
                {playerData.position} • {playerData.club}
              </p>


              <div className="mt-5 hidden text-[#A0A7B4] md:flex md:gap-8">


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
          <div className="flex h-11 w-11 flex-shrink-0 flex-col items-center justify-center md:h-28 md:w-28">


            <p className="text-2xl font-bold leading-none text-[#2BA13D] md:text-5xl">
              {playerData.overall}
            </p>


            <p className="mt-0.5 text-[9px] tracking-widest text-[#A0A7B4] md:text-sm">
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



        <div className="grid grid-cols-5 gap-2 md:gap-4">


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

    <div className="rounded-xl bg-[#1B2028] p-2 text-center md:p-5">


      <p className="text-lg font-bold md:text-3xl">
        {value}
      </p>


      <p className="mt-0.5 text-[10px] text-[#A0A7B4] md:mt-1 md:text-sm">
        {label}
      </p>


    </div>
    );  
}
