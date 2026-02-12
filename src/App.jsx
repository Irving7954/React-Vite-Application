import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App(props) {
	const { brandList = ["Hummer"], useBrands = false } = props;
	
	const [inputs, setInputs] = useState({brand: brandList[0], isEnabled: true});
	
	const handleChange = (e) => {
		console.log(inputs.isEnabled);
		if(inputs.isEnabled) {
			const target = e.target;
			const name = target.name;
			const value = target.type == 'checkbox' ? target.checked : target.value;
			setInputs(values => ({...values, [name]: value}))
		}
	}
	
	function handleNameSubmit(e) {
		e.preventDefault();
		alert(inputs.firstName);
	}
	
	function handleBrandSubmit(e) {
		e.preventDefault();
		alert(inputs.brand);
	}
	
	function handleTxtSubmit(e) {
		e.preventDefault();
		alert(inputs.txt);
	}
	
	function handleIsEnabledSubmit(e) {
		e.preventDefault();
		alert(inputs.isEnabled);
	}
	
	return (
		<div style={{background: 'lightgreen'}}>
			{useBrands && (
				<>
					<form onSubmit={handleBrandSubmit}>
						<label>Enter your brand:
							<select name="brand" value={inputs.brand} onChange={handleChange}>
							{brandList.map((brand, index) => <option key={index} value={brand}>{brand}</option>)}
							</select>
						</label>
						<input type="submit" />
					</form>
				</>
		    )}
			
			<form onSubmit={handleNameSubmit} disabled={!inputs.isEnabled}>
				<label>Enter your name:			
					<input
						type="text"
						name="firstName"
						value={inputs.firstName}
						onChange={handleChange}
					/>
				</label>
				<input type="submit" />
			</form>
			
			<form onSubmit={handleTxtSubmit} disabled={!inputs.isEnabled}>
				<label>Write here:
					<textarea
						name="txt"
						value={inputs.txt}
						onChange={handleChange}
					/>
				</label>
				<input type="submit" />
			</form>
			
			<form onSubmit={handleIsEnabledSubmit}>
				<label>Enable the forms:			
					<input
						type="checkbox"
						name="isEnabled"
						checked={inputs.isEnabled}
						onChange={handleChange}
					/>
				</label>
				<input type="submit" />
			</form>
			
			<div>{props.children} </div>
		</div>
	);
}

export default App