import { useState, useRef, useEffect, useReducer } from 'react';
import './App.scss';

const initialScore = [
	{
		id: 1,
		score: 0,
		name: "John",
	},
	{
		id: 2,
		score: 0,
		name: "Sally",
	},
];

const reducer = (state, action) => {
	switch (action.type) {
		case "INCREASE":
			return state.map((player) => {
				if (player.id === action.id) {
					return { ...player, score: player.score + 1 };
				}
				else {
					return player;
				}
			});
		case "DECREASE":
			return state.map((player) => {
				if (player.id === action.id) {
					return { ...player, score: player.score - 1 };
				}
				else {
					return player;
				}
			});
		default:
			return state;
	}
};

function Score() {
	const [score, dispatch] = useReducer(reducer, initialScore);
	
	const handleIncrease = (player) => {
		dispatch({ type: "INCREASE", id: player.id });
	};
	
	const handleDecrease = (player) => {
		dispatch({ type: "DECREASE", id: player.id });
	};
	
	return (
		<>
			{score.map((player) => (
				<div key={player.id}>
					<label>
						{player.name}
						<input
							type="button"
							onClick={() => handleIncrease(player)}
							value={"+"}
						/>
						<input
							type="button"
							onClick={() => handleDecrease(player)}
							value={"-"}
						/>
						{"Score: " + player.score}
					</label>
				</div>
			))}
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
						
			<Score />
		</div>
	);
}

export default App