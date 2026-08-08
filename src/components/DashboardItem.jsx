const DashboardItem = (props) => {

    const {
        children,
        tags=[],
    } = props;

    return (
        <div className="dashboard-item">
            <div className="dashboard-header">
                {tags.map(tag => <p className="dashboard-tag" key={crypto?.randomUUID() ?? Date.now().toString()}>{tag}</p>)}
            </div>
            <div className="dashboard-body">
                {children}
            </div>
        </div>
    )
}

export default DashboardItem;