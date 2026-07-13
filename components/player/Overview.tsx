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
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">
          Player Overview
        </h2>

        <button
          onClick={() => setEditing(true)}
          className="rounded-lg bg-[#2BA13D] px-4 py-2 font-semibold text-white transition hover:bg-[#248C35]"
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

      <div className="space-y-6">

        {/* Career Highlights */}
        <div className="rounded-xl bg-[#1B2028] p-6">

          <h2 className="text-2xl font-bold text-white">
            Career Highlights
          </h2>

          <div className="mt-4 space-y-3">

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
        <div className="rounded-xl bg-[#1B2028] p-6">

          <h2 className="text-2xl font-bold text-white">
            Current Club
          </h2>

          <div className="mt-4 space-y-2 text-[#A0A7B4]">

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