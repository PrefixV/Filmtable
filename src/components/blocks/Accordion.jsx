import AccordionItem from "./AccordionItem.jsx";

const Accordion = (props) => {

    const {
        data,
        toggleItem,
        isItemOpen,
    } = props;

    return (
        <div className="accordion">
            {data.map((item, index) => {

                const isOpen = isItemOpen === index;

                return (
                    <AccordionItem
                        title={item.title}
                        details={item.details}
                        key={index}
                        toggleItem={toggleItem}
                        index={index}
                        isItemOpen={isOpen}
                    />
                )
            })}
        </div>
    )
}

export default Accordion;