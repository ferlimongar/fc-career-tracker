"use client";

import { useState } from "react";
import Overview from "./Overview";
import SeasonManager from "./SeasonManager";
import International from "./International";
import TrophyCabinet from "./TrophyCabinet";
import AwardsCabinet from "./AwardsCabinet";
import Records from "./Records";

const tabs = [
  "Overview",
  "Seasons",
  "International",
  "Trophies",
  "Awards",
  "Records",
];


export default function ProfileTabs({
  player,
  setPlayer,
  seasons,
  setSeasons,
  internationalTournaments,
  setInternationalTournaments,
}: {
  player: any;
  setPlayer: React.Dispatch<React.SetStateAction<any>>;
  seasons: any[];
  setSeasons: React.Dispatch<React.SetStateAction<any[]>>;
  internationalTournaments: any[];
  setInternationalTournaments: React.Dispatch<
    React.SetStateAction<any[]>
  >;
}) {

  const [activeTab, setActiveTab] = useState("Overview");


  return (
    <div className="mt-10">


      {/* TAB BUTTONS */}
        <div className="grid grid-cols-6 border-b border-[#2C323D] md:flex md:gap-3">

        {tabs.map((tab) => (

          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`min-w-0 px-0.5 py-2 text-center text-[9px] font-medium whitespace-nowrap sm:text-xs md:px-4 md:py-3 md:text-base ${
              activeTab === tab
                ? "text-[#2BA13D] border-b-2 border-[#2BA13D]"
                : "text-[#A0A7B4]"
            }`}
          >
            {tab}
          </button>

        ))}


      </div>




      {/* TAB CONTENT */}
      <div className="mt-6 rounded-xl bg-[#1B2028] p-4 md:mt-8 md:p-6">


        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white md:text-2xl">
            {activeTab}
          </h2>

          {activeTab === "Seasons" && (
            <div className="grid grid-cols-[16px_24px_24px_24px_32px] items-center gap-1 md:grid-cols-[40px_54px_54px_54px_72px] md:gap-0">
              <span aria-hidden="true" />
              <span aria-label="Appearances" className="text-center">👕</span>
              <span aria-label="Goals" className="text-center">⚽</span>
              <span aria-label="Assists" className="text-center">👟</span>
              <span aria-label="Average rating" className="text-center">⭐</span>
            </div>
          )}
        </div>



        {activeTab === "Overview" && (
  <Overview
    player={player}
    setPlayer={setPlayer}
  />
)}



        {activeTab === "Seasons" && (
          <SeasonManager
            seasons={seasons}
            setSeasons={setSeasons}
          />
        )}



       {activeTab === "International" && (
  <International
    international={player.international}
    tournaments={internationalTournaments}
    setTournaments={setInternationalTournaments}
  />
)}



        {activeTab === "Trophies" && (

<TrophyCabinet
  seasons={seasons}
/>

)}



        {activeTab === "Awards" && (

<AwardsCabinet
seasons={seasons}
/>

)}



        {activeTab === "Records" && (

<Records
  records={player.records}
  seasons={seasons}
/>

)}


      </div>


    </div>
  );
}
