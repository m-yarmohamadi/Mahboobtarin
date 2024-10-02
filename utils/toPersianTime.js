import toEnglishNumber from "./toEnglishNumber";

export default function toPersianTimeShort(time) {
  return toEnglishNumber(
    new Date(time).toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
}
