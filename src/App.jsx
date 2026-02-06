import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App(props) {
	const { brand = "Hummer", name = "Bob", age = 90 } = props;
	const [count, setCount] = useState(0);
	
	return (
		<div style={{background: 'lightblue'}}>
			<h4>Hi, I am a {brand}!</h4>
			<div>{props.children} </div>
			<h3>Hello, {name}! You are {age} years old.</h3>
			<button onClick={() => setCount(count + 1)}>
				Count: {count}
			</button>
		</div>

	);
}

export default App
