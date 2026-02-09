import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App(props) {
	const { brandList = ["Hummer"], useBrands = false} = props;
	
	const [count, setCount] = useState(0);
	const [name, setName] = useState("");
	
	function handleChange(e) {
		setName(e.target.value);
	}
	
	function handleSubmit(e) {
		e.preventDefault();
		alert(name);
	}
	
	return (
		<div style={{background: 'lightgreen'}}>
			{useBrands && brandList.map((brand, index) => <h5 key={index}>I have a { brand }!</h5>)}
			<div>{props.children} </div>
			<button onClick={() => setCount(count + 1)}>
				Count: {count}
			</button>
			<form onSubmit={handleSubmit}>
				<label>Enter your name:
					<input
						type="text" 
						value={name}
						onChange={handleChange}
				/>
				</label>
				<p>Current name: {name}</p>
				<input type="submit" />
			</form>
			
		</div>

	);
}

export default App
