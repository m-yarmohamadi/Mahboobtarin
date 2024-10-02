export default function sortedTimes(times) {
  const sortedTimes = times.sort((a, b) => {
    const [hoursA, minutesA] = a.split(":").map(Number);
    const [hoursB, minutesB] = b.split(":").map(Number);
    return hoursA * 60 + minutesA - (hoursB * 60 + minutesB);
  });

  return sortedTimes
}
