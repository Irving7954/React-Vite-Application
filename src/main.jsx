import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
	<>
		<h2>The main component has no style!</h2>
		<App brandList={["Ferrari", "Porsche", "McClaren"]}
			useBrands={true}>
			<h2>This header should be light green without the style!</h2>
		</App>
	</>
)
