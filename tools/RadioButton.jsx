export default function RadioButton({ checked, onChecked, label, name, id }) {
    return (
        <div className="w-full flex items-center gap-2">
            <input
                type="radio"
                name={name}
                id={id}
                checked={checked}
                onChange={onChecked}
                className="form-radio w-5 h-5 rounded-full border-0 outline-0 focus:border-0 ring-0 focus:ring-0 focus:outline-0 checked:focus:outline-0 checked:focus:ring-0 checked:focus:border-0  focus:shadow-none checked:focus:bg-primary-01 checked:bg-primary-01 checked:hover:!bg-primary-01"
            />
            <label htmlFor={id} className="text-sm flex-1 text-slate-800">
                {label}
            </label>
        </div>
    )
}
