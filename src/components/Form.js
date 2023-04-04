export const priceOption = {
    oneToTen: '1-10',
    tenToFifteen: '10-15',
    fifteenToThirty: '15-30'
}

export const productType = {
	eyeshadow: 'eyeshadow',
	eyeliner: 'eyeliner',
	powder: 'powder',
	foundation: 'foundation',
	lipstick: 'lipstick'
}

const Form = (props) => (
  <form onSubmit={props.handleFormSubmit}>
    <div className="box">
      <select
        value={props.userChoice}
        className="orientationPicker"
        onChange={props.handleFormChange}
      >
				{ Object.entries(productType).map(([key, value]) => <option key={key} value={value}>{value}</option>) }
      </select>
      <select
        value={props.userPrice}
        className="orientationPicker"
        onChange={props.handlePriceChange}
      >
        <option value={priceOption.oneToTen}>$1-10</option>
        <option value={priceOption.tenToFifteen}>$10-$15</option>
        <option value={priceOption.fifteenToThirty}>$15 and up</option>
      </select>
      <button className="submit">Submit</button>
    </div>
  </form>
);

export default Form;
