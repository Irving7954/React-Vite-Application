import { useState, createContext, useContext, useRef, useEffect } from 'react';
import './App.scss';

const UserContext = createContext();

function Component1() {
	const [user, setUser] = useState("Dog");
	
	return (
		<UserContext.Provider value={user}>
			<h5>{`${user} in Component 1`}</h5>
			<Component2 />
		</UserContext.Provider>
	);
}

function Component2() {
	return (
		<>
			<h5>Component 2</h5>
			<Component3 />
		</>
	);
}

function Component3() {
	const user = useContext(UserContext);
	return (
		<h5>{`${user} in Component 3`}</h5>
	);
}

function App(props) {
	const { brandList = ["Hummer"], useBrands = false } = props;
	
	const [inputs, setInputs] = useState({brand: brandList[1], isEnabled: true});
	
	const nameFieldRef = useRef();
	const brandFieldRef = useRef();
	const txtFieldRef = useRef();
	const isEnabledFieldRef = useRef();

	const lastInputs = useRef("");
	
	useEffect(() => {
		lastInputs.current = inputs.brand;
	}, [inputs]);
	
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
							<select name="brand" value={inputs.brand} onChange={handleChange} re ={brandFieldRef} disabled={true}>
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
			
			<Component1 />
			<h3> Inputs: {inputs.brand}</h3>
			<h3>Last Inputs: {lastInputs.current}</h3>
		</div>
	);
}

export default App