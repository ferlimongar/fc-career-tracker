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
    <div className="rounded-xl bg-[#1B2028] p-3 transition hover:bg-[#232A35] sm:p-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        <Image
          src={career.clubCrest}
          alt={career.club}
          width={55}
          height={55}
          className="h-10 w-10 sm:h-[55px] sm:w-[55px]"
        />

        <div className="text-right">
          <p className="text-2xl font-bold text-[#2BA13D] sm:text-4xl">
            {career.overall}
          </p>

          <p className="text-[10px] uppercase tracking-wider text-[#A0A7B4] sm:text-xs sm:tracking-widest">
            OVR
          </p>
        </div>

      </div>

      {/* Player */}
      <div className="mt-4 sm:mt-5">

        <h2 className="truncate text-base font-bold text-white sm:text-2xl">
          {career.name}
        </h2>

        <p className="mt-1 truncate text-xs text-[#A0A7B4] sm:text-base">
          {career.position} • {career.club}
        </p>

      </div>

      <Link
        href={`/player/${career.id}`}
        className="mt-4 block rounded-lg bg-[#2BA13D] py-2 text-sm text-center font-semibold text-white transition hover:bg-[#248C35] sm:mt-6 sm:py-3 sm:text-base"
      >
        Continue Career →
      </Link>

    </div>
  );
}
