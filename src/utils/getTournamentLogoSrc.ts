/**
 * Get tournament logo based on identifier.
 * @param tournament - Tournament identifier string.
 * @returns a string of a tournament logo.
 */
const getTournamentLogoSrc = (tournament: string): string => {
  let src: string = "";

  const str = tournament.toLowerCase();

  switch (str) {
    case "atp":
      return (src = "/tournaments/atp.png");
    case "wta":
      return (src = "/tournaments/wta.png");
    case "itf":
      return (src = "/tournaments/itf.png");
    case "laver":
      return (src = "/tournaments/laver.png");
    case "australian-open":
      return (src = "/tournaments/grandslams/australian.png");
    case "roland-garros":
      return (src = "/tournaments/grandslams/roland.png");
    case "us-open":
      return (src = "/tournaments/grandslams/us.webp");
    case "wimbledon":
      return (src = "/tournaments/grandslams/wimbledon.png");
  }

  return src;
};

export { getTournamentLogoSrc };
