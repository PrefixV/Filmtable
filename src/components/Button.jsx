const Button = (props) => {
    const {
        className,
        type="button",
        children,
        onClick,
    } = props;

    return (
        <button className={`button ${className}`} onClick={onClick} type={type}>
            {children}
        </button>
    )
}

export default Button;