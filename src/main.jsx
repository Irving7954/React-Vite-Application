import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
	<>
		<h2>This should be white since the parent component has no style!</h2>
		<App /*brand={"Ferrari"} 
			name={"Tim"} 
			--age={30}*/>
			<h2>This should be blue since the child component has a blue style!</h2>
		</App>
	</>
)
