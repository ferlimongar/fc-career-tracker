"use client";

type Season = {
  year: string;
  club: string;
  trophies?: string[];
};


console.log("Trophy Cabinet Loaded");


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

    <div className="mt-6 space-y-6">


      {/* Total Trophy Count */}

      <div className="rounded-xl bg-[#0F1318] p-6">

        <h3 className="text-2xl font-bold text-white">
          Trophy Cabinet
        </h3>


        <p className="mt-3 text-4xl font-bold text-[#2BA13D]">
          {trophies.length}
        </p>


        <p className="text-[#A0A7B4]">
          Career Trophies
        </p>


      </div>





      {/* Trophy Grid */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">


        {trophies.map((item,index)=>(

          <div
            key={index}
            className="rounded-xl bg-[#1B2028] p-6"
          >


            <div className="flex items-center gap-4">


              <div className="text-5xl">
                🏆
              </div>



              <div>

                <h4 className="text-xl font-bold text-white">
                  {item.trophy}
                </h4>


                <p className="text-[#A0A7B4]">
                  {item.year}
                </p>


                <p className="text-[#A0A7B4]">
                  {item.club}
                </p>


              </div>


            </div>


          </div>


        ))}


      </div>




      {trophies.length === 0 && (

        <div className="rounded-xl bg-[#1B2028] p-6 text-[#A0A7B4]">

          No trophies won yet.

        </div>

      )}



    </div>

  );

}