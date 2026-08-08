import Button from "../Button.jsx";
import {X} from "@boxicons/react"
import Field from "../Field.jsx";
import Select from "../Select.jsx";

const AddFilmForm = (props) => {
    const {
    isModalOpen,
    closeModal,
        filmType,
        filmName,
        filmSeason,
        filmRating,
        filmSeries,
        setFilmName,
        setFilmRating,
        setFilmSeason,
        setFilmSeries,
        setFilmType,
        onSaveFilm,
        editingFilm,
        onEditFilm,
    } = props;


    return (
        <div className={`modal-overlay ${isModalOpen ? "modal-overlay--open" : ""}`}>
            <form className="add-film" onSubmit={editingFilm ? () => onEditFilm(editingFilm) : onSaveFilm}>
                <div className="add-film__header">
                    <p className="add-film__title">{editingFilm ? "Изменить фильм" : "Добавить фильм"}</p>
                    <Button onClick={closeModal} className="close-modal__button">
                        <X size={"16"} />
                    </Button>
                </div>
                <div className="add-film__body">
                    <Field placeholder="Название" value={filmName} onChange={(e) => setFilmName(e.target.value)} required/>
                    <Select value={filmType} onChange={(e) => setFilmType(e.target.value)} required>
                        <option disabled={true}>
                            Тип
                        </option>
                        <option value="movie">
                            Movie
                        </option>
                        <option value="cartoon">
                            Cartoon
                        </option>
                        <option value="anime">
                            Anime
                        </option>
                        <option value="serial">
                            Serial
                        </option>
                    </Select>
                    {filmType === "serial" || filmType === "cartoon" || filmType === "anime" ? (
                        <>
                            <Field type="number" placeholder="Сезон" value={filmSeason} onChange={(e) => setFilmSeason(e.target.value)}/>
                            <Field type="number" placeholder="Серия" value={filmSeries} onChange={(e) => setFilmSeries(e.target.value)}/>
                        </>
                    ) : null}
                    <Field type="number" placeholder="Рейтинг" value={filmRating} onChange={(e) => setFilmRating(e.target.value)} max="10" min="0" required/>
                </div>
                <div className="add-film__footer">
                    <Button className="add-film__button" type="submit">
                        {editingFilm ? "Сохранить" : "Добавить"}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default AddFilmForm;