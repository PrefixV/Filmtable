import {useContext} from "react";
import {FilmsContext} from "../../context/FilmsContext.jsx";
import DashboardFilmsLength from "../../components/blocks/DashboardFilmsLength.jsx";
import DashboardRating from "../../components/blocks/DashboardRating.jsx";
import DashboardFilmsCategories from "../../components/blocks/DashboardFillmsCategories.jsx";
import DashboardBestFilm from "../../components/blocks/DashboardBestFilm.jsx";

const MainPage = () => {
    const {films} = useContext(FilmsContext)

    return (
        <div className="main-page__wrapper">
            <h1>Dashboard</h1>
            <div className="dashboard">
                <DashboardFilmsLength films={films}/>
                <DashboardRating films={films}/>
                <DashboardFilmsCategories films={films}/>
                <DashboardBestFilm films={films}/>
            </div>
        </div>
    )
}

export default MainPage;