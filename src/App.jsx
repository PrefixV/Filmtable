import {BrowserRouter, Routes, Route, useParams} from "react-router-dom";
import FilmPage from "./pages/FilmsPage/FilmsPage.jsx";
import MainPage from "./pages/MainPage/MainPage.jsx";
import Layout from "./components/Layout/Layout.jsx";
import FilmsProvider from "./context/FilmsContext.jsx";
import FilmDetailsPage from "./pages/FilmDetailsPage/FilmDetailsPage.jsx";

function App() {

    const { id } = useParams();

  return (
    <>
        <FilmsProvider>
            <BrowserRouter>
                <Layout />
                <Routes>
                    <Route path={"/"} element={<MainPage />} />
                    <Route path={"/films"} element={<FilmPage />} />
                    <Route path={"/films/:id"} element={<FilmDetailsPage />} />
                </Routes>
            </BrowserRouter>
        </FilmsProvider>
    </>
  )
}

export default App
