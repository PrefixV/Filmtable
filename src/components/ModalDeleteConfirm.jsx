import Button from "./Button.jsx";
import {InfoCircle} from "@boxicons/react"

const ModalDeleteConfirm = (props) => {

    const {
        setModalDeleteClose,
        isModalDeleteOpen,
        onDeleteFilm,
        id,
    } = props

    return (
        <div className={`modal-delete__overlay ${isModalDeleteOpen ? "modal-delete--open" : ""}`}>
            <div className="modal-delete">
                <div className="modal-delete__title">
                    <h2>Подтверждение удаления</h2>
                    <InfoCircle style={{height: "32px", width: "32px"}}/>
                </div>
                <div className="modal-delete__buttons">
                    <Button onClick={() => onDeleteFilm(id)}>
                        Удалить
                    </Button>
                    <Button onClick={setModalDeleteClose}>
                        Отмена
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ModalDeleteConfirm;