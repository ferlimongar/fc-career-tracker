import CareerCard from "@/components/career/CareerCard";
import { careers } from "@/data/careers";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0D10] p-4 sm:p-6 md:p-10">
      <section className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Career Library
            </h2>

            <p className="mt-2 text-sm text-[#A0A7B4] sm:mt-3 sm:text-base">
              Manage your EA FC player careers.
            </p>
          </div>

          <button className="self-start rounded-lg bg-[#2BA13D] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#248C35] sm:px-5 sm:py-3 sm:text-base">
            + New Career
          </button>

        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-6 md:gap-6 xl:grid-cols-3">
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
