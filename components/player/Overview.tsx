"use client";

import { useState } from "react";
import EditPlayerModal from "./EditPlayerModal";

type OverviewProps = {
  player: any;
  setPlayer: React.Dispatch<React.SetStateAction<any>>;
};

export default function Overview({
  player,
  setPlayer,
}: OverviewProps) {
  const [editing, setEditing] = useState(false);

  return (
    <>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between md:mb-6">
        <h2 className="text-xl font-bold text-white md:text-3xl">
          Player Overview
        </h2>

        <button
          onClick={() => setEditing(true)}
          className="rounded-lg bg-[#2BA13D] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#248C35] md:px-4"
        >
          Edit Profile
        </button>
      </div>

      {/* Modal */}
      {editing && (
  <EditPlayerModal
    player={player}
    setPlayer={setPlayer}
    onClose={() => setEditing(false)}
  />
)}

      <div className="space-y-4 md:space-y-6">

        {/* Player Details */}
        <div className="rounded-xl bg-[#1B2028] p-4 md:p-6">
          <h2 className="text-xl font-bold text-white md:text-2xl">
            Player Details
          </h2>

          <dl className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            <div className="rounded-lg bg-[#0F1318] p-3">
              <dt className="text-xs text-[#A0A7B4]">Height</dt>
              <dd className="mt-1 font-semibold text-white">{player.playerInfo.height}</dd>
            </div>
            <div className="rounded-lg bg-[#0F1318] p-3">
              <dt className="text-xs text-[#A0A7B4]">Age</dt>
              <dd className="mt-1 font-semibold text-white">{player.playerInfo.age}</dd>
              <p className="mt-1 text-xs text-[#A0A7B4]">
                {player.playerInfo.birthday || "Birthday not set"}
              </p>
            </div>
            <div className="rounded-lg bg-[#0F1318] p-3">
              <dt className="text-xs text-[#A0A7B4]">Country</dt>
              <dd className="mt-1 font-semibold text-white">{player.nationality}</dd>
            </div>
            <div className="rounded-lg bg-[#0F1318] p-3">
              <dt className="text-xs text-[#A0A7B4]">Shirt Number</dt>
              <dd className="mt-1 font-semibold text-white">#{player.playerInfo.shirt}</dd>
            </div>
            <div className="rounded-lg bg-[#0F1318] p-3">
              <dt className="text-xs text-[#A0A7B4]">Preferred Foot</dt>
              <dd className="mt-1 font-semibold text-white">{player.playerInfo.foot}</dd>
            </div>
            <div className="rounded-lg bg-[#0F1318] p-3">
              <dt className="text-xs text-[#A0A7B4]">Transfer Value</dt>
              <dd className="mt-1 font-semibold text-white">{player.playerInfo.value}</dd>
            </div>
          </dl>
        </div>

        {/* Current Club */}
        <div className="rounded-xl bg-[#1B2028] p-4 md:p-6">

          <h2 className="text-xl font-bold text-white md:text-2xl">
            Current Club
          </h2>

          <div className="mt-3 space-y-1.5 text-sm text-[#A0A7B4] md:mt-4 md:space-y-2 md:text-base">

            <p>
              Club: <span className="text-white">{player.club}</span>
            </p>

            <p>
              Position: <span className="text-white">{player.position}</span>
            </p>

            <p>
              Joined:{" "}
              <span className="text-white">
                {player.clubInfo.joined}
              </span>
            </p>

            <p>
              Contract Until:{" "}
              <span className="text-white">
                {player.clubInfo.contract}
              </span>
            </p>

          </div>

        </div>

      </div>
    </>
  );
}
