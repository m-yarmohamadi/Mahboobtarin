export function toPersianDateLong(date){
    return new Date(date).toLocaleDateString("fa-IR", {year:"numeric", month:"long", day:"2-digit"})
}

export function toPersianDateShort(date){
    return new Date(date).toLocaleDateString("fa-IR", {year:"numeric", month:"numeric", day:"numeric"})
}