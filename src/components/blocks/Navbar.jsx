const Navbar = (props) => {

    const {
        children,
    } = props

    return (
        <nav className="navbar">
            <ul className="navbar__menu-list">
                {children}
            </ul>
        </nav>
    )
}

export default Navbar;