import {ArrowDownStroke} from "@boxicons/react"

const AccordionItem = (props) => {

    const {
        title,
        details,
        toggleItem,
        index,
        isItemOpen,
    } = props;

    return (
        <div className="accordion-item__wrapper" onClick={() => toggleItem(index)}>
            <div className="accordion-item">
                <h2 className="accordion-item__title">{title}</h2>
                    <p className={isItemOpen ? "accordion-item__details" : "accordion-item__details hidden"}>{details}</p>
            </div>
            <div className={isItemOpen ? "accordion-item__arrow--rotate" : "accordion-item__arrow"}>
                <ArrowDownStroke />
            </div>
        </div>
    )
}

export default AccordionItem;