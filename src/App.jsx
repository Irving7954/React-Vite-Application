import { useState, useTransition, useRef } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, NavLink, Outlet, useParams } from 'react-router-dom';

const navLinkStyles = ({ isActive }) => ({
	fontWeight: isActive ? "bold" : "normal"
});

function Home() {
  return <h3>Home Page</h3>;
}

function About() {
	return (
		<div>
			<h3>About Page</h3>
			<nav>
				<NavLink to="/about/:param" style={navLinkStyles}>Param</NavLink>
			</nav> 
			<Outlet />
		</div>
	);
}

function Contact() {
  return <h3>Contact Page</h3>;
}

function ParameterizedPage() {
	const { param } = useParams();
	
	return <h5>{param}</h5>;
}

function SearchResults({ query }) {
  // Simulate slow search results
  const items = [];
  if (query) {
	  for (let i = 0; i < 50000; i++) {
		  items.push(<li key={i}>Result for {query} - {i}</li>);
	  }
  }
  return <ul>{items}</ul>;
}

function App(props) {
	const { brandList = ["Hummer"], useBrands = false } = props;
	
	const [inputs, setInputs] = useState({brand: brandList[0], isEnabled: true});
	
	const [input, setInput] = useState('');
	const [query, setQuery] = useState('');
	const [isPending, startTransition] = useTransition();
	
	const nameFieldRef = useRef();
	const brandFieldRef = useRef();
	const txtFieldRef = useRef();
	const isEnabledFieldRef = useRef();

	const handleInputChange = (e) => {
		// Urgent: Update input field
		setInput(e.target.value);

		// Non-urgent: Update search results
		
		startTransition(() => {
			setQuery(e.target.value);
		});
	};
	
	const handleChange = (e) => {
		const target = e.target;
		const name = target.name;
		if(target.name == "isEnabled" || inputs.isEnabled) {
			const value = target.type == 'checkbox' ? target.checked : target.value;
			setInputs(values => ({...values, [name]: value}))
		}
	}
	
	function handleNameSubmit(e) {
		e.preventDefault();
		nameFieldRef.current.focus();
		alert(inputs.firstName);
	}
	
	function handleBrandSubmit(e) {
		e.preventDefault();
		brandFieldRef.current.focus();
		alert(inputs.brand);
	}
	
	function handleTxtSubmit(e) {
		e.preventDefault();
		txtFieldRef.current.focus();
		alert(inputs.txt);
	}
	
	function handleIsEnabledSubmit(e) {
		e.preventDefault();
		isEnabledFieldRef.current.focus();
		alert(inputs.isEnabled);
	}
			
	return (
		<div className = {"box"}>
			{useBrands && (
				<>
					<form onSubmit={handleBrandSubmit}>
						<label>Enter your brand:
							<select name="brand" value={inputs.brand} onChange={handleChange} ref = {brandFieldRef}>
								{brandList.map((brand, index) => <option key={index} value={brand}>{brand}</option>)}
							</select>
							{ brandList.map((brand, index) =>
								<label key={index}>
									<input type ="radio" name="brand" value={brand} checked={inputs.brand == brand} onChange={handleChange} disabled = {true}/>
									{brand}
								</label>
							)   }
						</label>
						<input type="submit" />
					</form>	
				</>
		    )}
			
			<form onSubmit={handleNameSubmit}>
				<label>Enter your name:			
					<input
						type="text"
						name="firstName"
						value={inputs.firstName}
						onChange={handleChange}
						ref = {nameFieldRef}
					/>
				</label>
				<input type="submit" />
			</form>
			
			<form onSubmit={handleTxtSubmit}>
				<label>Write here:
					<textarea
						name="txt"
						value={inputs.txt}
						onChange={handleChange}
						ref = {txtFieldRef}
					/>
				</label>
				<input type="submit" />
			</form>
			
			<form onSubmit={handleIsEnabledSubmit}>
				<label>Enable the forms:			
					<input
						type="checkbox"
						name="isEnabled"
						checked={inputs.isEnabled}
						onChange={handleChange}
						ref = {isEnabledFieldRef}
					/>
				</label>
				<input type="submit" />
			</form>
						
			<BrowserRouter>
				<nav>
					<NavLink to="/" style={navLinkStyles}>Home</NavLink> |{" "}
					<NavLink to="/about" style={navLinkStyles}>About</NavLink> |{" "}
					<NavLink to="/contact" style={navLinkStyles}>Contact</NavLink>
				</nav>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />}>
						<Route path=":param" element={<ParameterizedPage />} />
					</Route>
					<Route path="/contact" element={<Contact />} />
				</Routes>
			</BrowserRouter>
			
			<div>
				<input 
					type="text" 
					value={input} 
					onChange={handleInputChange}
				/>
				{isPending ? <p>Loading results...</p> : <div> {query} </div>}
				<SearchResults query={query} />
			</div>
		</div>
	);
}

export default App