const Select = (props) => {
    const {
        className,
        id,
        children,
        value,
        onChange,
    } = props;

    return (
        <select id={id} className={`select ${className}`} value={value} onChange={onChange}>
            {children}
        </select>
    )
}

export default Select;