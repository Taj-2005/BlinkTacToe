"use client";
export default function EmojiPicker({ onSelect, options }: {
  onSelect: (categories: { player1: string[], player2: string[] }) => void,
  options: Record<string, string[]>
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-xl text-center max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-black">Choose your Emoji Categories</h2>
      <div className="flex flex-col gap-4">
        {Object.entries(options).map(([name, emojis]) => (
          <div key={name}>
            <p className="font-bold mb-1 capitalize text-black">{name}</p>
            <div className="text-2xl">{emojis.join(" ")}</div>
          </div>
        ))}
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => onSelect({ player1: options.animals, player2: options.food })}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}