import { renderCart } from "./renderCart";

export const postData=(data) => {
	return fetch('https://jsonplaceholder.typicode.com/posts',{
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	})
		.then((response) => response.json())
		.then((json) => console.log(json))
	;

}