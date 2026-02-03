import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const fruitlist = ['apple', 'banana', 'cherry'];

createRoot(document.getElementById('root')).render(
    <ul>
      {fruitlist.map((fruit, index, array) => {
        return (
          <li key={fruit}>
            Number: {fruit}, Index: {index}, Array: {array}
          </li>
        );
      })}
    </ul>
)
