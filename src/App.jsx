import {BrowserRouter, Routes, Route, useParams, Navigate} from "react-router-dom";
import FilmPage from "./pages/FilmsPage/FilmsPage.jsx";
import MainPage from "./pages/MainPage/MainPage.jsx";
import Layout from "./components/Layout/Layout.jsx";
import FilmsProvider from "./context/FilmsContext.jsx";
import FilmDetailsPage from "./pages/FilmDetailsPage/FilmDetailsPage.jsx";
import FilmRatingSystem from "./pages/FilmRatingSystem/FilmRatingSystem.jsx";

function App() {

    const { id, page } = useParams();

  return (
    <>
        <FilmsProvider>
            <BrowserRouter>
                <Layout />
                <Routes>
                    <Route path={"/"} element={<MainPage />} />
                    <Route path={"/films"} element={<Navigate to={"page/1"} replace />} />
                    <Route path={"/films/page/:page/:id"} element={<FilmDetailsPage />} />
                    <Route path={"/rating&system"} element={<FilmRatingSystem />}/>
                    <Route path={"/films/page/:page"} element={<FilmPage />} />
                </Routes>
            </BrowserRouter>
        </FilmsProvider>
    </>
  )
}

export default App
