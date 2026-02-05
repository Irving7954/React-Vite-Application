import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const fruitlist = ['apple', 'banana', 'cherry'];

createRoot(document.getElementById('root')).render(
	<App name={"Tim"} age={30} />
)
