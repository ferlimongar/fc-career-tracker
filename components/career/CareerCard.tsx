import Image from "next/image";
import Link from "next/link";

type Career = {
  id: number;
  name: string;
  nationality: string;
  position: string;
  club: string;
  clubCrest: string;
  overall: number;
  careerStats: {
    matches: number;
    goals: number;
    assists: number;
  };
};

export default function CareerCard({
  career,
}: {
  career: Career;
}) {
  return (
    <div className="rounded-xl bg-[#1B2028] p-6 transition hover:bg-[#232A35]">

      {/* Header */}
      <div className="flex items-center justify-between">

        <Image
          src={career.clubCrest}
          alt={career.club}
          width={55}
          height={55}
        />

        <div className="text-right">
          <p className="text-4xl font-bold text-[#2BA13D]">
            {career.overall}
          </p>

          <p className="text-xs uppercase tracking-widest text-[#A0A7B4]">
            OVR
          </p>
        </div>

      </div>

      {/* Player */}
      <div className="mt-5">

        <h2 className="text-2xl font-bold text-white">
          {career.name}
        </h2>

        <p className="mt-1 text-[#A0A7B4]">
          {career.position} • {career.club}
        </p>

      </div>

      <Link
        href={`/player/${career.id}`}
        className="mt-6 block rounded-lg bg-[#2BA13D] py-3 text-center font-semibold text-white transition hover:bg-[#248C35]"
      >
        Continue Career →
      </Link>

    </div>
  );
}