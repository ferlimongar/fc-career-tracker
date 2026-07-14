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

        {/* Career Highlights */}
        <div className="rounded-xl bg-[#1B2028] p-4 md:p-6">

          <h2 className="text-xl font-bold text-white md:text-2xl">
            Career Highlights
          </h2>

          <div className="mt-3 space-y-2 text-sm md:mt-4 md:space-y-3 md:text-base">

            {(player.highlights ?? []).map((highlight: string) => (
              <div
                key={highlight}
                className="text-[#A0A7B4]"
              >
                🏆 {highlight}
              </div>
            ))}

          </div>

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
              Shirt Number:{" "}
              <span className="text-white">
                #{player.playerInfo.shirt}
              </span>
            </p>

            <p>
              Preferred Foot:{" "}
              <span className="text-white">
                {player.playerInfo.foot}
              </span>
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
