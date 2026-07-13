import { careers } from "@/data/careers";
import PlayerProfileClient from "@/components/player/PlayerProfileClient";


export default async function PlayerProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const player = careers.find(
    (career) => career.id === Number(id)
  );


  if (!player) {
    return (
      <main className="min-h-screen bg-[#0B0D10] p-10 text-white">
        Player not found
      </main>
    );
  }


  return (
    <PlayerProfileClient player={player} />
  );
}