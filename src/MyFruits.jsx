
function fetchFruitData() {
	return ['Apple', 'Banana', 'Cherry'];
	//return new Promise((resolve) => {
	//	setTimeout(() => {
	//		resolve(['Apple', 'Banana', 'Cherry']);
	//	}, 200);
	//});
}

let fruitResource = {
	data: null,
	read() {
		if (this.data !== null)  {
			return this.data;
		}
		return fetchFruitData();
		
		//throw fetchFruitData().then(result => this.data = result);
	}
};

function MyFruits() {
	const fruits = fruitResource.read();
	return (
		<>
			<h3>My Favorite Fruits</h3>          
			<ul>
				{fruits.map((fruit, index) => (
					<li key={index}>{fruit}</li>
				))}
			</ul>
		</>
	);
}

export default MyFruits;