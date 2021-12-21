export const getData=() => {
	return fetch('https://ozone-291f1-default-rtdb.europe-west1.firebasedatabase.app/goods.json/')
		.then(response => response.json())
		
}