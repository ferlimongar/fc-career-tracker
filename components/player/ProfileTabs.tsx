"use client";

import { useState } from "react";
import Overview from "./Overview";
import SeasonManager from "./SeasonManager";
import International from "./International";
import TrophyCabinet from "./TrophyCabinet";
import AwardsCabinet from "./AwardsCabinet";

const tabs = [
  "Overview",
  "Seasons",
  "International",
  "Trophies",
  "Awards",
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
        <div className="flex gap-3 overflow-x-auto border-b border-[#2C323D] whitespace-nowrap">

        {tabs.map((tab) => (

          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 font-medium whitespace-nowrap ${
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
      <div className="mt-8 bg-[#1B2028] rounded-xl p-6">


        <h2 className="text-2xl font-bold text-white">
          {activeTab}
        </h2>



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


      </div>


    </div>
  );
}