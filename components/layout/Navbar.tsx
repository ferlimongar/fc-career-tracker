export default function Navbar() {
  return (
    <nav className="w-full flex-none border-b border-[#2C323D] bg-[#15191F] p-4 md:h-screen md:w-64 md:border-r md:border-b-0 md:p-6">
      <h1 className="whitespace-nowrap text-xl font-bold text-white md:text-2xl">
        ⚽ FC Career Tracker
      </h1>

      <div className="mt-4 flex gap-1 overflow-x-auto pb-1 text-sm text-[#A0A7B4] md:mt-10 md:block md:space-y-4 md:pb-0 md:text-base">
        <p className="cursor-pointer whitespace-nowrap rounded-md px-3 py-2 hover:bg-[#1B2028] hover:text-[#2BA13D] md:px-0 md:py-0 md:hover:bg-transparent">
          🏠 Dashboard
        </p>

        <p className="cursor-pointer whitespace-nowrap rounded-md px-3 py-2 hover:bg-[#1B2028] hover:text-[#2BA13D] md:px-0 md:py-0 md:hover:bg-transparent">
          👤 Player
        </p>

        <p className="cursor-pointer whitespace-nowrap rounded-md px-3 py-2 hover:bg-[#1B2028] hover:text-[#2BA13D] md:px-0 md:py-0 md:hover:bg-transparent">
          📅 Seasons
        </p>

        <p className="cursor-pointer whitespace-nowrap rounded-md px-3 py-2 hover:bg-[#1B2028] hover:text-[#2BA13D] md:px-0 md:py-0 md:hover:bg-transparent">
          🏆 Trophy Cabinet
        </p>

        <p className="cursor-pointer whitespace-nowrap rounded-md px-3 py-2 hover:bg-[#1B2028] hover:text-[#2BA13D] md:px-0 md:py-0 md:hover:bg-transparent">
          🥇 Awards
        </p>

        <p className="cursor-pointer whitespace-nowrap rounded-md px-3 py-2 hover:bg-[#1B2028] hover:text-[#2BA13D] md:px-0 md:py-0 md:hover:bg-transparent">
          📈 Records
        </p>
      </div>
    </nav>
  );
}
