import { BrowserRouter, Routes, Route } from "react-router-dom";
import FilmPage from "./pages/FilmsPage/FilmsPage.jsx";
import MainPage from "./pages/MainPage/MainPage.jsx";
import Layout from "./components/Layout/Layout.jsx";
import FilmsProvider from "./context/FilmsContext.jsx";

function App() {
  return (
    <>
        <FilmsProvider>
            <BrowserRouter>
                <Layout />
                <Routes>
                    <Route path={"/"} element={<MainPage />} />
                    <Route path={"/films"} element={<FilmPage />} />
                </Routes>
            </BrowserRouter>
        </FilmsProvider>
    </>
  )
}

export default App
