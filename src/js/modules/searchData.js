import { getData } from "./getData";
import { renderGoods } from "./renderGoods";
import { searchFilter } from "./searchFilter";

export const search=()=>{
	const searchInput=document.querySelector('.search-wrapper_input')
	searchInput.addEventListener('input',e=>{
		 const value=e.target.value;
		getData()
		.then(data=>searchFilter(data,value))
		.then(data=>renderGoods(data))
	})
} 