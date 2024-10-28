export default function CheckBoxInput({ checked, onChecked, label, name }) {
    return (
        <div className="w-full flex items-center gap-2">
            <input
                type="checkbox"
                name={name}
                id={name}
                checked={checked}
                onChange={onChecked}
                className="form-checkbox w-5 h-5 rounded-md focus:ring-0 focus:outline-none focus:outline-offset-0 focus:shadow-none checked:focus:bg-primary-01 checked:bg-primary-01 checked:hover:!bg-primary-01"
            />            <label htmlFor={name} className="text-sm flex-1 text-slate-800">
                {label}
            </label>
        </div>
    )
}
