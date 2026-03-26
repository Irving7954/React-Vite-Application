import React, { useState, useRef, useEffect } from 'react';
import './App.scss';

const useFetch = (url) => {
	const [data, setData] = useState(null);
	
	useEffect(() => {
		fetch(url)
			.then((res) => res.json())
			.then((data) => setData(data));
		}, [url]);
	
	return data;
};

const Home = () => {
	const data = useFetch("https://jsonplaceholder.typicode.com/todos");
	
	return (
		<>
			{data &&
				data.map((item) => {
					return <p key={item.id}>{item.title}</p>;
			})}
		</>
	);
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
			<Home />
		</div>
	);
}

export default App