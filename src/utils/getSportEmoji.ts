/**
 * Get sport emoji based on identifier.
 * @param sport - Sport identifier string.
 * @returns a string of a sport emoji.
 */
const getSportEmoji = (sport: string): string | undefined => {
  let emoji: string | undefined;

  const str = sport.toLowerCase();

  switch (str) {
    case "tennis":
      return (emoji = "🎾");
    case "football":
      return (emoji = "🏈");
    case "mma" || "boxing":
      return (emoji = "🥊");
    case "soccer":
      return (emoji = "⚽");
    case "hockey":
      return (emoji = "🏒");
    case "multi":
      return (emoji = "🔥");
  }

  return emoji;
};

export { getSportEmoji };
