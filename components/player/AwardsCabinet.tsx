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

<div className="space-y-5">


<h2 className="text-3xl font-bold">
🏅 Awards Cabinet
</h2>


<div className="grid gap-4 md:grid-cols-2">


{awards.map((item,index)=>(

<div
key={index}
className="rounded-xl bg-[#0F1318] p-5"
>


<h3 className="text-xl font-bold">
🏅 {item.award}
</h3>


<p className="text-[#A0A7B4]">
{item.year} • {item.club}
</p>


</div>

))}


</div>


</div>

);

}