import { useState, useRef, useEffect } from 'react';
import './App.scss';

function Timer() {
	const [count, setCount] = useState(0);
	const [result, setResult] = useState(0);
	
	useEffect(() => {
		let timer = setTimeout(() => {
			setResult(() => count * 2);
		}, 1000);
		
		return () => clearTimeout(timer)
	}, [count]);

	return (
		<>
			<button onClick={() => setCount((c) => c + 1)}>+</button>
			<p>Count: {count}</p>
			<p>Result: {result}</p>
		</>
	);
}

function App(props) {
	const { brandList = ["Hummer"], useBrands = false } = props;
	
	const [inputs, setInputs] = useState({brand: brandList[1], isEnabled: true});
		
	const nameFieldRef = useRef();
	const brandFieldRef = useRef();
	const txtFieldRef = useRef();
	const isEnabledFieldRef = useRef();
	
	const handleChange = (e) => {
		const target = e.target;
		const name = target.name;
		if(target.name == "isEnabled" || inputs.isEnabled) {
			const value = target.type == 'checkbox' ? target.checked : target.value;
			setInputs(values => ({...values, [name]: value}))
		}
	}
	
	function handleNameSubmit(e) {
		e.preventDefault();
		nameFieldRef.current.focus();
		alert(inputs.firstName);
	}
	
	function handleBrandSubmit(e) {
		e.preventDefault();
		brandFieldRef.current.focus();
		alert(inputs.brand);
	}
	
	function handleTxtSubmit(e) {
		e.preventDefault();
		txtFieldRef.current.focus();
		alert(inputs.txt);
	}
	
	function handleIsEnabledSubmit(e) {
		e.preventDefault();
		isEnabledFieldRef.current.focus();
		alert(inputs.isEnabled);
	}
			
	return (
		<div className = {"box"}>
			{useBrands && (
				<>
					<form onSubmit={handleBrandSubmit}>
						<label>Enter your brand:
							<select name="brand" value={inputs.brand} onChange={handleChange} ref = {brandFieldRef} disabled = {true}>
								{brandList.map((brand, index) => <option key={index} value={brand}>{brand}</option>) }
							</select>
							{ brandList.map((brand, index) =>
								<label key={index}>
									<input type ="radio" name="brand" value={brand} checked={inputs.brand == brand} onChange={handleChange}/>
									{brand}
								</label>
							)   }
						</label>
						<input type="submit" />
					</form>	
				</>
		    )}
			
			<form onSubmit={handleNameSubmit}>
				<label>Enter your name:			
					<input
						type="text"
						name="firstName"
						value={inputs.firstName}
						onChange={handleChange}
						ref = {nameFieldRef}
					/>
				</label>
				<input type="submit" />
			</form>
			
			<form onSubmit={handleTxtSubmit}>
				<label>Write here:
					<textarea
						name="txt"
						value={inputs.txt}
						onChange={handleChange}
						ref = {txtFieldRef}
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
						ref = {isEnabledFieldRef}
					/>
				</label>
				<input type="submit" />
			</form>
			
			<Timer />
		</div>
	);
}

export default App