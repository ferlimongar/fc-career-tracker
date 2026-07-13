export default function Navbar() {
  return (
    <nav className="h-screen w-64 bg-[#15191F] border-r border-[#2C323D] p-6">
      <h1 className="text-2xl font-bold text-white">
        ⚽ FC Career Tracker
      </h1>

      <div className="mt-10 space-y-4 text-[#A0A7B4]">
        <p className="hover:text-[#2BA13D] cursor-pointer">
          🏠 Dashboard
        </p>

        <p className="hover:text-[#2BA13D] cursor-pointer">
          👤 Player
        </p>

        <p className="hover:text-[#2BA13D] cursor-pointer">
          📅 Seasons
        </p>

        <p className="hover:text-[#2BA13D] cursor-pointer">
          🏆 Trophy Cabinet
        </p>

        <p className="hover:text-[#2BA13D] cursor-pointer">
          🥇 Awards
        </p>

        <p className="hover:text-[#2BA13D] cursor-pointer">
          📈 Records
        </p>
      </div>
    </nav>
  );
}