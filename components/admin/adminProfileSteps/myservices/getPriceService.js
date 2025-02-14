const priceTypes = [
  { label: "تعرفه دلخواه", value: "custom" },
  { label: "تعرفه پیشنهادی", value: "suggestion" },
  { label: "رایگان", value: "free" },
  { label: "در حد وسع", value: "charity" },
];

export default function getPriceService(price_type) {
  return priceTypes.filter((p) => p.value === price_type)[0]?.label;
}
