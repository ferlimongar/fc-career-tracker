import Image from "next/image";

type Season = {
  year: string;
  club: string;
  clubCrest: string;
  league: string;
  matches: number;
  goals: number;
  assists: number;
  rating: number;
  trophies: string[];
};


export default function Seasons({
  seasons,
}: {
  seasons: Season[];
}) {

  return (
    <div className="mt-6 space-y-5">


      {seasons.map((season) => (

        <div
          key={season.year}
          className="rounded-xl bg-[#0F1318] p-6"
        >


          {/* Header */}
          <div className="flex items-center justify-between">


            <div className="flex items-center gap-4">

              <Image
                src={season.clubCrest}
                alt={season.club}
                width={50}
                height={50}
              />


              <div>

                <h3 className="text-xl font-bold">
                  {season.year}
                </h3>

                <p className="text-[#A0A7B4]">
                  {season.club} • {season.league}
                </p>

              </div>

            </div>


            <div className="text-right">

              <p className="text-3xl font-bold text-[#2BA13D]">
                {season.rating}
              </p>

              <p className="text-sm text-[#A0A7B4]">
                Rating
              </p>

            </div>


          </div>



          {/* Stats */}
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">


            <div>
              <p className="text-2xl font-bold">
                {season.matches}
              </p>

              <p className="text-sm text-[#A0A7B4]">
                Apps
              </p>
            </div>


            <div>
              <p className="text-2xl font-bold">
                {season.goals}
              </p>

              <p className="text-sm text-[#A0A7B4]">
                Goals
              </p>
            </div>


            <div>
              <p className="text-2xl font-bold">
                {season.assists}
              </p>

              <p className="text-sm text-[#A0A7B4]">
                Assists
              </p>
            </div>


          </div>



          {/* Trophies */}
            {season.trophies?.length > 0 && (
            <div className="mt-5">

              <p className="text-sm text-[#A0A7B4]">
                Trophies
              </p>


              <div className="mt-2 flex flex-wrap gap-2">

                {season.trophies.map((trophy) => (

                  <span
                    key={trophy}
                    className="rounded-full bg-[#2BA13D]/20 px-3 py-1 text-sm text-[#2BA13D]"
                  >
                    🏆 {trophy}
                  </span>

                ))}

              </div>

            </div>

          )}


        </div>

      ))}


    </div>
  );
}