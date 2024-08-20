
const priceTypes = [
    { id: 1, label: 'رایگان', value: 'free' },
    { id: 2, label: 'خیریه', value: 'charity' },
    { id: 3, label: 'قیمت دلخواه', value: 'custom' },
]

export default function getPriceService(price_type) {
    return priceTypes.filter((p) => p.value === price_type)[0].label;
}
