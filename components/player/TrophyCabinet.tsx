"use client";

import type { Season } from "@/types/season";


export default function TrophyCabinet({
  seasons,
}: {
  seasons: Season[];
}) {


  const trophies = seasons.flatMap((season) =>
    (season.trophies ?? []).map((trophy) => ({
      trophy,
      year: season.year,
      club: season.club,
    }))
  );



  return (

    <div className="mt-4 space-y-4 md:mt-6 md:space-y-6">


      {/* Total Trophy Count */}

      <div className="rounded-xl bg-[#0F1318] p-4 md:p-6">

        <h3 className="text-xl font-bold text-white md:text-2xl">
          Trophy Cabinet
        </h3>


        <p className="mt-2 text-3xl font-bold text-[#2BA13D] md:mt-3 md:text-4xl">
          {trophies.length}
        </p>


        <p className="text-sm text-[#A0A7B4] md:text-base">
          Career Trophies
        </p>


      </div>





      {/* Trophy Grid */}

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5">


        {trophies.map((item,index)=>(

          <div
            key={index}
            className="rounded-xl bg-[#1B2028] p-4 md:p-6"
          >


            <div className="flex items-center gap-3 md:gap-4">


              <div className="text-3xl md:text-5xl">
                🏆
              </div>



              <div className="min-w-0">

                <h4 className="truncate text-base font-bold text-white md:text-xl">
                  {item.trophy}
                </h4>


                <p className="text-xs text-[#A0A7B4] md:text-base">
                  {item.year}
                </p>


                <p className="truncate text-xs text-[#A0A7B4] md:text-base">
                  {item.club}
                </p>


              </div>


            </div>


          </div>


        ))}


      </div>




      {trophies.length === 0 && (

        <div className="rounded-xl bg-[#1B2028] p-4 text-sm text-[#A0A7B4] md:p-6 md:text-base">

          No trophies won yet.

        </div>

      )}



    </div>

  );

}
