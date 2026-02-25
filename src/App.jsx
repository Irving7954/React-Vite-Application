import { useState, Suspense, lazy } from 'react';
import { createPortal } from 'react-dom';
import './App.css';
import MyFruits from "./MyFruits";
import styled from 'styled-components';

const Button = styled.button`
	border: 2px dashed red;
	border-radius: 20px;
	cursor: pointer;
	position: fixed;
	bottom: 20px;
	padding: 10px;
	width: 200px;
	background-color: blue;
	color: white;
`;
	
const LeftButton = styled(Button)`
	left: 20px;
	align-content:left;
`;

const RightButton = styled(Button)`
	right: 20px;
	align-content:right;
`;

function Modal({ isLeft, onClick, children }) {	
	if(isLeft) {
		return createPortal (
			<LeftButton onClick={onClick}>
				{children}
			</LeftButton>
		, document.body
		);
	}
	return createPortal (
		<RightButton onClick={onClick}>
			{children}
		</RightButton>
		, document.body
	);
}

const CustomLoadingHeader = styled.h1`
		padding: 10px 20px;
		background-color: ${props => props.useBrands ? 'black' : 'blue'};
		color: yellow;
`;	

function App(props) {
	const { brandList = ["Hummer"], useBrands = false } = props;
	
	const [inputs, setInputs] = useState({brand: brandList[0], isEnabled: true});
	const [count1, setCount1] = useState(0);
	const [count2, setCount2] = useState(0);
	
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
		<div 
			onClick={() => {setCount1(c => c + 1)}} 
			className = {"box"}
		>
			{useBrands && (
				<>
					<form onSubmit={handleBrandSubmit}>
						<label>Enter your brand:
							<select name="brand" value={inputs.brand} onChange={handleChange} disabled = {true}>
								{brandList.map((brand, index) => <option key={index} value={brand}>{brand}</option>)}
							</select>
							{ brandList.map((brand, index) =>
								<label key={index}>
									<input type ="radio" name="brand" value={brand} checked={inputs.brand == brand} onChange={handleChange} />
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
			<h2>Button Clicked: {count2} </h2>     
			
			<Modal
				isLeft={true}
				onClick={(e) => {
					setCount2(c => c + 1);
				}}>
				Bottom Left Button
			</Modal>
			<Modal
				usePrimary={false}
				onClick={(e) => {
					setCount2(c => c + 1);
				}}>
				Bottom Right Button
			</Modal>
			
			<Suspense fallback={<CustomLoadingHeader>Loading...</CustomLoadingHeader>}>
				<Fruits />
			</Suspense>
		</div>
	);
}

export default App