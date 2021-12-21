import { getData } from "./getData";
import { renderGoods } from "./renderGoods";
import { priceFilter, hotsaleFilter } from "./searchFilter";

export const filter=()=>{
	const minInput=document.getElementById('min')
	const maxInput=document.getElementById('max')
	const checkboxInput=document.getElementById('discount-checkbox')
	const checkmarkInpurt=document.querySelector('.filter-check_checkmark')
	minInput.addEventListener('input',()=>{
		getData()
			.then(data => priceFilter(data,minInput.value,maxInput.value))
			.then(data=>hotsaleFilter(data,checkboxInput.checked))
			.then(data => renderGoods(data))
	})
	maxInput.addEventListener('input',()=>{
		getData()
			.then(data => priceFilter(data,minInput.value,maxInput.value))
			.then(data => hotsaleFilter(data,checkboxInput.checked))
			.then(data => renderGoods(data))
	})
	checkboxInput.addEventListener('change',()=>{
		if(checkboxInput.checked){
			checkmarkInpurt.classList.add('checked')
			getData()
				.then(data => priceFilter(data,minInput.value,maxInput.value))
				.then(data => hotsaleFilter(data,checkboxInput.checked))
				.then(data => renderGoods(data))
		}else{
			checkmarkInpurt.classList.remove('checked')
			getData()
				.then(data => priceFilter(data,minInput.value,maxInput.value))
				.then(data => hotsaleFilter(data,checkboxInput.checked))
				.then(data => renderGoods(data))
		}
	})
}