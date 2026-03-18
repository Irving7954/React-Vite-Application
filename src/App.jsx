import React, { useState, useRef, useCallback, useMemo } from 'react';
import './App.scss';

const Button = React.memo(({ onClick, text }) => {
	//alert(`${text} rendered`);
	return <button onClick={onClick}>{text}</button>;
});

function CallbackExample() {
	const [count1, setCount1] = useState(0);
	const [count2, setCount2] = useState(0);
	// I doubt if you would gain anything by memoizing it, but I will commit it
	// As an example for the purposes of the tutorial
	const calculation = useMemo(() => expensiveCalculation(count1, count2), [count1, count2]);
	
	const handleClick1 = useCallback(() => {
		setCount1(() => count1 + 1);
	}, [count1]);

	const handleClick2 = useCallback(() => {
		setCount2(() => count2 + 1);
	}, [count2]);
	
	//alert("Parent rendered");
	return (
		<div>
			<p>Count 1: {count1}</p>
			<p>Count 2: {count2}</p>
			<p>Expensive Calculation: {calculation}</p>
			<Button onClick={handleClick1} text="Button 1" />
			<Button onClick={handleClick2} text="Button 2" />
		</div>
	);
}

const expensiveCalculation = (count1, count2) => {
  for (let i = 0; i < 1000000000; i++) {
    count1 += 200;
  }
  return count1 + count2 * 30;
};

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
	
	function handleBrandSubmit(e) {
		e.preventDefault();
		brandFieldRef.current.focus();
		alert(inputs.brand);
	}
	
	function handleNameSubmit(e) {
		e.preventDefault();
		nameFieldRef.current.focus();
		alert(inputs.firstName);
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
							<select name="brand" value={inputs.brand} onChange={handleChange} disabled={true}>
								{brandList.map((brand, index) => <option key={index} value={brand}>{brand}</option>) }
							</select>
							{ brandList.map((brand, index) =>
								<label key={index} ref ={brandFieldRef}>
									<input type ="radio" name="brand" value={brand} checked={inputs.brand == brand} onChange={handleChange} ref={brandFieldRef}/>
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
						ref={nameFieldRef}
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
						ref={txtFieldRef}
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
						ref={isEnabledFieldRef}
					/>
				</label>
				<input type="submit" />
			</form>
			
			<CallbackExample />
		</div>
	);
}

export default App