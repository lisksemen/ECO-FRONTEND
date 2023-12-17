function Table(props) {

    const tableStyle = {
        fontSize: '14px',
    };

    return (
        <div className={"bg-dark"}>
            <table className="table table-dark table-striped table-bordered table-hover" style={tableStyle}>
                {props.children}
            </table>
        </div>
    );
}

export default Table;