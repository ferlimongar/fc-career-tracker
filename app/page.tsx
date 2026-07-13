import Navbar from "@/components/layout/Navbar";
import CareerCard from "@/components/career/CareerCard";
import { careers } from "@/data/careers";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-[#0B0D10]">
      <Navbar />

      <section className="flex-1 p-10">
        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-4xl font-bold text-white">
              Career Library
            </h2>

            <p className="mt-3 text-[#A0A7B4]">
              Manage your EA FC player careers.
            </p>
          </div>

          <button className="rounded-lg bg-[#2BA13D] px-5 py-3 font-semibold text-white hover:bg-[#248C35] transition">
            + New Career
          </button>

        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {careers.map((career) => (
            <CareerCard
              key={career.id}
              career={career}
            />
          ))}
        </div>
      </section>
    </main>
  );
}