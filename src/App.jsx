import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App({ name, age }) {
	const [count, setCount] = useState(0);
	
	return (
		<div>
			<h1>Hello, {name}! You are {age} years old.</h1>
			<button onClick={() => setCount(count + 1)}>
				Count: {count}
			</button>
		</div>

	);
}

export default App
