import { BrowserRouter, Routes, Route } from "react-router-dom";
import FilmPage from "./pages/FilmsPage/FilmsPage.jsx";
import MainPage from "./pages/MainPage/MainPage.jsx";
import Layout from "./components/Layout/Layout.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout />
        <Routes>
          <Route path={"/"} element={<MainPage />} />
          <Route path={"/films"} element={<FilmPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
