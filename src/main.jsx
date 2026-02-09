import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
	<>
		<h2>The main component has a white background!</h2>
		<App brandList={["Ferrari", "Porsche"]}
			 /*useBrands={false}*/>
			<h2>The inner component has a light green background!</h2>
		</App>
	</>
)
