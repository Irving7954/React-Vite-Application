import { useState, Suspense, lazy } from 'react';
import { createPortal } from 'react-dom';
import './App.css';
import MyFruits from "./MyFruits";

function Modal({ onClick, children }) {
  return createPortal(
    <button 
      onClick={onClick}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '10px',
        background: 'blue',
        color: 'white'
      }}>
      {children}
    </button>,
    document.body
  );
}

function App(props) {
	const { brandList = ["Hummer"], useBrands = false } = props;
	
	const [inputs, setInputs] = useState({brand: brandList[0], isEnabled: true});
	const [count1, setCount1] = useState(0);
	const [count2, setCount2] = useState(0);
	
	const handleChange = (e) => {
		console.log(inputs.isEnabled);
		const target = e.target;
		const name = target.name;
		if(target.name == "isEnabled" || inputs.isEnabled) {
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
	
	const Fruits = lazy(() => import("./MyFruits"));
	
	return (
		<div onClick={() => {setCount1(c => c + 1)}} style={{background: 'orange', padding: '20px', border: '2px solid black', margin: '20px'}}>
			{useBrands && (
				<>
					<form onSubmit={handleBrandSubmit}>
						<label>Enter your brand:
							<select name="brand" value={inputs.brand} onChange={handleChange} disabled = {true}>
								{brandList.map((brand, index) => <option key={index} value={brand}>{brand}</option>)}
							</select>
							{ brandList.map((brand, index) => 
								<label>
									<input key={index} type ="radio" name="brand" value={brand} checked={inputs.brand == brand} onChange={handleChange} />
									{brand}
								</label>)
							}
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
			
			<h2>Div Clicked: {count1}</h2>
			<h2>Button Clicked: {count2}</h2>     
			
			<Modal
				onClick={(e) => {
				// This runs first
					setCount2(c => c + 1);
				}}>
				Floating Button
			</Modal>
			
			<Suspense fallback={<div>Loading...</div>}>
				<Fruits />
			</Suspense>
		</div>
	);
}



export default App