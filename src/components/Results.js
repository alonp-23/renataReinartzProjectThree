const Results = (props) => {
    const { formError, displayProducts } = props;
    return (
        <>
            <h2 className="error">{formError ? "Please be patient. We are getting your products!" : null}</h2>
            {
                formError ? null : (
                    displayProducts ? (
                        <div>
                            <p>{displayProducts}</p>
                        </div>
                    ) : null
                )
            }
        </>
    )
}

export default Results