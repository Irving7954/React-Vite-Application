import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App(props) {
	const { brandList = ["Hummer"], useBrands = false} = props;
	
	const [count, setCount] = useState(0);
	const [inputs, setInputs] = useState({brand: brandList[0]});
	
	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setInputs(values => ({...values, [name]: value}))
	}
	
	function handleSubmit(e) {
		e.preventDefault();
		alert(inputs.firstName);
	}
	
	return (
		<div style={{background: 'lightgreen'}}>
			{useBrands && (
			<form>
				<select name="brand" value={inputs.brand} onChange={handleChange}>
					{brandList.map((brand, index) => <option key={index} value={brand}>{brand}</option>)}
				</select>
				<p>Current brand: {inputs.brand}</p>
			</form>	
		    )}
			
			<div>{props.children} </div>
			<button onClick={() => setCount(count + 1)}>
				Count: {count}
			</button>
			<form onSubmit={handleSubmit}>
				<label>Enter your name:
					<input
						type="text"
						name="firstName"
						value={inputs.firstname}
						onChange={handleChange}
					/>
				</label>
				<p>Current name: {inputs.firstName}</p>
				<input type="submit" />
			</form>
			
			<form>
				<label>Write here:
					<textarea
						name="txt"
						value={inputs.txt}
						onChange={handleChange}
					/>
				</label>
				<p>Current text: {inputs.txt}</p>
			</form>	
		</div>
	);
}

export default App
