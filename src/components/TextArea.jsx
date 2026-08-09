const TextArea = (props) => {
    const {
        className,
        id,
        cols,
        rows,
        onChange,
        value,
        placeholder
    } = props;

    return (
        <textarea  id={id} cols={cols} rows={rows} className={`textarea ${className}`} onChange={onChange} value={value} placeholder={placeholder}/>
    )
}

export default TextArea;