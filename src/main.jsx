import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
	<>
		<h2>The main component is white!</h2>
		<App brandList={["Ferrari", "Porsche", "McClaren"]}
			useBrands={true}>
			<h2>This inner header is light green automatically!</h2>
		</App>
	</>
)
