import {useContext} from "react";
import {FilmsContext} from "../../context/FilmsContext.jsx";
import DashboardFilmsLength from "../../components/blocks/DashboardFilmsLength.jsx";
import DashboardRating from "../../components/blocks/DashboardRating.jsx";

const MainPage = () => {
    const {films} = useContext(FilmsContext)

    return (
        <div className="main-page__wrapper">
            <h1>Dashboard</h1>
            <div className="dashboard">
                <DashboardFilmsLength films={films}/>
                <DashboardRating films={films}/>
            </div>
        </div>
    )
}

export default MainPage;