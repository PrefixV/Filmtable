import Button from "../Button.jsx";
import {ArrowLeftStroke, ArrowRightStroke} from "@boxicons/react";

const Pagination = (props) => {

    const {
        navigate,
        currentPage,
        goToPage,
    } = props

    return (
        <div className="pagination-wrapper">
            <Button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                <ArrowLeftStroke />
            </Button>
            {currentPage}
            <Button onClick={() => goToPage(currentPage + 1)}>
                <ArrowRightStroke />
            </Button>
        </div>
    )
}

export default Pagination;