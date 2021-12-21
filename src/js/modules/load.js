import { getData } from "./getData";
import { postData } from "./postData";
import { renderGoods } from "./renderGoods";

const cartBtn=document.getElementById('cart')

export const load=() => {
	cartBtn.addEventListener('click',postData)

	getData()
	.then(data=>{
		renderGoods(data)
	});
}