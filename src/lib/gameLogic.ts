export function checkWin(board: (string | null)[], emojiSet: string[]): boolean {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winPatterns.some((pattern) =>
    pattern.every((index) => board[index] && emojiSet.includes(board[index]!))
  );
}

export function getRandomEmoji(emojis: string[]): string {
  return emojis[Math.floor(Math.random() * emojis.length)];
}
