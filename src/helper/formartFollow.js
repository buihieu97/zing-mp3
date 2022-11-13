export const formatNumber = (num) => {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);
};

export const formatDuration = (numSecs) => {
  if (!numSecs) return "0:00";

  let boolean = 3600 > numSecs;
  let secNum = parseInt(numSecs, 10);
  let hours = Math.floor(secNum / 3600)
    .toString()
    .padStart(2, "0");
  let minutes = Math.floor((secNum - hours * 3600) / 60).toString();

  let seconds =
    secNum - hours * 3600 - (minutes * 60).toString().padStart(2, "0");
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return boolean ? `${minutes}:${seconds}` : `${hours}:${minutes}:${seconds}`;
};
