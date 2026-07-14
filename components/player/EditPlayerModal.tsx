"use client";

import { clubs } from "@/data/clubs";

type Props = {
  player: any;
  setPlayer: React.Dispatch<React.SetStateAction<any>>;
  onClose: () => void;
};

export default function EditPlayerModal({
  player,
  setPlayer,
  onClose,
}: Props) {
  function updatePlayer(field: string, value: any) {
    setPlayer((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  }

  function updatePlayerInfo(field: string, value: any) {
    setPlayer((prev: any) => ({
      ...prev,
      playerInfo: {
        ...prev.playerInfo,
        [field]: value,
      },
    }));
  }

  function updateClubInfo(field: string, value: any) {
    setPlayer((prev: any) => ({
      ...prev,
      clubInfo: {
        ...prev.clubInfo,
        [field]: value,
      },
    }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 md:items-center md:p-6">
      <div className="my-auto max-h-[calc(100dvh-2rem)] w-full max-w-3xl overflow-y-auto rounded-2xl bg-[#1B2028] p-5 shadow-2xl md:p-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Edit Player
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700 md:px-4"
          >
            Close
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5">

          {/* Name */}
          <div>
            <label className="mb-1 block text-sm text-[#A0A7B4]">
              Name
            </label>

            <input
              value={player.name}
              onChange={(e) =>
                updatePlayer("name", e.target.value)
              }
              className="w-full rounded bg-[#0F1318] p-2.5 md:p-3"
            />
          </div>

          {/* Overall */}
          <div>
            <label className="mb-1 block text-sm text-[#A0A7B4]">
              Overall
            </label>

            <input
              type="number"
              value={player.overall}
              onChange={(e) =>
                updatePlayer("overall", Number(e.target.value))
              }
              className="w-full rounded bg-[#0F1318] p-2.5 md:p-3"
            />
          </div>

          {/* Club */}
          <div>
            <label className="mb-1 block text-sm text-[#A0A7B4]">
              Club
            </label>

            <select
              value={player.club}
              className="w-full rounded bg-[#0F1318] p-2.5 md:p-3"
              onChange={(e) => {
                const club = clubs.find(
                  (c) => c.name === e.target.value
                );

                if (!club) return;

                setPlayer((prev: any) => ({
                  ...prev,
                  club: club.name,
                  clubCrest: club.crest,
                }));
              }}
            >
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

          {/* Position */}
          <div>
            <label className="mb-1 block text-sm text-[#A0A7B4]">
              Position
            </label>

            <select
              value={player.position}
              onChange={(e) =>
                updatePlayer("position", e.target.value)
              }
              className="w-full rounded bg-[#0F1318] p-2.5 md:p-3"
            >
              <option>GK</option>
              <option>LB</option>
              <option>CB</option>
              <option>RB</option>
              <option>CDM</option>
              <option>CM</option>
              <option>CAM</option>
              <option>LW</option>
              <option>RW</option>
              <option>ST</option>
            </select>
          </div>

          {/* Height */}
          <div>
            <label className="mb-1 block text-sm text-[#A0A7B4]">
              Height
            </label>

            <input
              value={player.playerInfo.height}
              onChange={(e) =>
                updatePlayerInfo("height", e.target.value)
              }
              className="w-full rounded bg-[#0F1318] p-2.5 md:p-3"
            />
          </div>

          {/* Age */}
          <div>
            <label className="mb-1 block text-sm text-[#A0A7B4]">
              Age
            </label>

            <input
              type="number"
              value={player.playerInfo.age}
              onChange={(e) =>
                updatePlayerInfo("age", Number(e.target.value))
              }
              className="w-full rounded bg-[#0F1318] p-2.5 md:p-3"
            />
          </div>

          {/* Shirt */}
          <div>
            <label className="mb-1 block text-sm text-[#A0A7B4]">
              Shirt Number
            </label>

            <input
              type="number"
              value={player.playerInfo.shirt}
              onChange={(e) =>
                updatePlayerInfo("shirt", Number(e.target.value))
              }
              className="w-full rounded bg-[#0F1318] p-2.5 md:p-3"
            />
          </div>

          {/* Preferred Foot */}
          <div>
            <label className="mb-1 block text-sm text-[#A0A7B4]">
              Preferred Foot
            </label>

            <select
              value={player.playerInfo.foot}
              onChange={(e) =>
                updatePlayerInfo("foot", e.target.value)
              }
              className="w-full rounded bg-[#0F1318] p-2.5 md:p-3"
            >
              <option>Right</option>
              <option>Left</option>
            </select>
          </div>

          {/* Value */}
          <div>
            <label className="mb-1 block text-sm text-[#A0A7B4]">
              Market Value
            </label>

            <input
              value={player.playerInfo.value}
              onChange={(e) =>
                updatePlayerInfo("value", e.target.value)
              }
              className="w-full rounded bg-[#0F1318] p-2.5 md:p-3"
            />
          </div>

          {/* Joined */}
          <div>
            <label className="mb-1 block text-sm text-[#A0A7B4]">
              Joined Club
            </label>

            <input
              value={player.clubInfo.joined}
              onChange={(e) =>
                updateClubInfo("joined", e.target.value)
              }
              className="w-full rounded bg-[#0F1318] p-2.5 md:p-3"
            />
          </div>

          {/* Contract */}
          <div>
            <label className="mb-1 block text-sm text-[#A0A7B4]">
              Contract Until
            </label>

            <input
              value={player.clubInfo.contract}
              onChange={(e) =>
                updateClubInfo("contract", e.target.value)
              }
              className="w-full rounded bg-[#0F1318] p-2.5 md:p-3"
            />
          </div>

        </div>

        <div className="mt-6 flex justify-end md:mt-8">
          <button
            onClick={onClose}
            className="rounded-lg bg-[#2BA13D] px-5 py-2.5 font-semibold text-white hover:bg-[#248C35] md:px-6 md:py-3"
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}
