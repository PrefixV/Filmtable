const Field = (props) => {
    const {
        className,
        type="text",
        placeholder,
        value,
        onChange,
        id,
        disabled,
        min,
        max,
        required,
        step,
    } = props;

    return (
        <input type={type} className={className} value={value} onChange={onChange} placeholder={placeholder} id={id} disabled={disabled} min={min} max={max} required={required} step={step}/>
    )
}

export default Field;