import GameBoard from "@/app/components/GameBoard";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-purple-500 to-yellow-300">
      <h1 className="text-5xl font-bold text-white drop-shadow-lg mb-2 animate-bounce">
        Blink Tac Toe 🤪
      </h1>
      <GameBoard />
    </main>
  );
}