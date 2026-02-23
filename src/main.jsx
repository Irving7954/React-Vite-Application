import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
	<>
		<App 
			brandList={["Ferrari", "Aston Martin", "McClaren"]}
			useBrands={true}>
		</App>
	</>
)