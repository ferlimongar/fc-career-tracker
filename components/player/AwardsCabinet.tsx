"use client";

export default function AwardsCabinet({
  seasons,
}:{
  seasons:any[];
}) {


const awards =
seasons.flatMap((season)=>(
  season.awards?.map((award:string)=>({
    award,
    year:season.year,
    club:season.club
  })) ?? []
));


return (

<div className="space-y-4 md:space-y-5">


<h2 className="text-xl font-bold md:text-3xl">
🏅 Awards Cabinet
</h2>


<div className="grid gap-3 md:grid-cols-2 md:gap-4">


{awards.map((item,index)=>(

<div
key={index}
className="rounded-xl bg-[#0F1318] p-4 md:p-5"
>


<h3 className="truncate text-base font-bold md:text-xl">
🏅 {item.award}
</h3>


<p className="truncate text-xs text-[#A0A7B4] md:text-base">
{item.year} • {item.club}
</p>


</div>

))}


</div>


</div>

);

}
