import DashboardItem from "../DashboardItem.jsx";

const DashboardBestFilm = (props) => {

    const {
        films
    } = props

    return (
        <DashboardItem tags={["#films", "#bestfilm"]}>

        </DashboardItem>
    )
}

export default DashboardBestFilm;