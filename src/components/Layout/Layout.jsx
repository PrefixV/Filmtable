import { Link } from "react-router-dom"
import Navbar from "../blocks/Navbar.jsx";

const Layout = () => {

    return (
        <>
            <Navbar>
                <li className="navbar__menu-list__links">
                    <Link to={"/"} className="link">
                        Главная
                    </Link>
                    <Link to={"/films"} className="link">
                        Фильмы
                    </Link>
                </li>
            </Navbar>
        </>
    )
}

export default Layout;