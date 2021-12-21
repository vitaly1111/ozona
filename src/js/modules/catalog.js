import { renderGoods } from "./renderGoods"
import { getData } from "./getData"
import { categoryFilter } from "./searchFilter"

const catalog=()=>{
	const btnCatalog=document.querySelector('.catalog-button > button')
	const catalogModal=document.querySelector('.catalog')
	const catalogModalItems=document.querySelectorAll('.catalog li')
 console.log(catalogModalItems)
	let isOpen=false

	btnCatalog.addEventListener('click',()=>{
		isOpen=!isOpen;
		if(isOpen){

			catalogModal.style.display='block'
		}else{
			catalogModal.style.display=''
		}
	})
	catalogModalItems.forEach(item=>{
		item.addEventListener('click',()=>{
			const text=item.textContent
			getData()
				.then(data => categoryFilter(data,text))
				.then(data => renderGoods(data))
		})
	})
}

export default catalog;