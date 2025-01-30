export default function processActivityTimes(activityTimes, today) {
  const daysMappingEN = {
    شنبه: "saturday",
    یکشنبه: "sunday",
    دوشنبه: "monday",
    سه‌شنبه: "tuesday",
    چهارشنبه: "wednesday",
    پنجشنبه: "thursday",
    جمعه: "friday",
  };

  let isRoutine;

  const activityTimeArray = JSON.parse(activityTimes);
  const currentWeekday = new Date(today).toLocaleDateString("fa-IR", {
    weekday: "long",
  });

  const extractTimes = activityTimeArray.filter((item) => {
    if (!Array.isArray(item.week)) {
      isRoutine = true;
      return item.week === daysMappingEN[currentWeekday] || null;
    } else {
      isRoutine = false;
      return item;
    }
  });

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const filteredTimes = extractTimes[0]?.times.filter((time) => {
    const [hour, minute] = time.split(":").map(Number);

    const selectData = new Date(today).toDateString();

    if (new Date().toDateString() === selectData) {
      return (
        hour > currentHour || (hour === currentHour && minute > currentMinute)
      );
    }
    return true;
  });

  return {
    result:
      extractTimes.length > 0
        ? { ...extractTimes[0], times: filteredTimes }
        : undefined,
    isRoutine,
  };
  // return { result: extractTimes[0], isRoutine };
}
