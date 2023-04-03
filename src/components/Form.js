function Form(props){
    
    return (
    <>
       <form onSubmit={props.handleFormSubmit}>
            <label htmlFor="productPicker">User</label>
            <div className="box">
                <select
                    value={props.userChoice}
                    id="orientationPicker"
                    onChange={props.handleFormChange}
                >
                    <option value="" disabled>Product:</option>
                    <option value="eyeshadow">eyeshadow</option>
                    <option value="eyeliner">eyeliner</option>
                    <option value="powder">powder</option>
                    <option value="foundation">foundation</option>
                    <option value="lipstick">lipstick</option>

                </select>
                <select
                    value={props.userPrice}
                    id="orientationPicker"
                    onChange={props.handlePriceChange}
                >
                    <option value="" disabled>Price:</option>
                    <option value="1-10">$1-10</option>
                    <option value="10-15">$10-$15</option>
                    <option value="15-30">$15 and up</option>

                </select>
                <button className="submit">Submit</button>
            </div>
        </form>
    </>
    )
}
    

export default Form;