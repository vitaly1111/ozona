import { renderCart } from "./renderCart"
import { postData } from "./postData"

const cartBtn=document.getElementById('cart')
const cartModal=document.querySelector('.cart')
const closeModal=document.querySelector('.cart-close')

const goodsWrapper=document.querySelector('.goods')
const cartTotal=document.querySelector('.cart-total > span')
const cartWrapper=document.querySelector('.cart-wrapper')
const cartSend=document.querySelector('.cart-confirm')

const openCart=() => {
	const cart=localStorage.getItem('cart')?
		JSON.parse(localStorage.getItem('cart'))
		:[];
		renderCart(cart)
	cartModal.style.display='flex';
	cartTotal.textContent=cart.reduce((sum,goodsItem)=>{
		return sum+goodsItem.price
	},0)
}
const closeCart=() => {
	cartModal.style.display='';
}

console.log('ok')
export const cart=() => {
	cartBtn.onclick=() => {
		openCart()
	}

	closeModal.addEventListener('click',closeCart)

	goodsWrapper.addEventListener('click',e=>{
		if(e.target.classList.contains('btn-primary')){
			const card=e.target.closest('.card')
			const key=card.dataset.key;
			const cart=localStorage.getItem('cart')?
				JSON.parse(localStorage.getItem('cart'))
				:[];
			const goods=JSON.parse(localStorage.getItem('goods'))
			const goodsItem=goods.find((item)=>{
				return item.id===+key
			})
			console.log(cart)
			cart.push(goodsItem)
			localStorage.setItem('cart',JSON.stringify(cart))
		}
	})

	cartWrapper.addEventListener('click',(e)=>{
		if (e.target.classList.contains('btn-primary')) {
			const card=e.target.closest('.card')
			const key=card.dataset.key;
			const cart=localStorage.getItem('cart')?
				JSON.parse(localStorage.getItem('cart'))
				:[];
			const goods=JSON.parse(localStorage.getItem('goods'))
			const index=cart.findIndex(item=>{
				return item.id===+key
			})
		/* 	const goodsItem=goods.find((item) => {
				return item.id===+key
			}) */
			console.log(index)
			cart.splice(index,1)
			//cart.push(goodsItem)
			localStorage.setItem('cart',JSON.stringify(cart))
			renderCart(cart)
			
			cartTotal.textContent=cart.reduce((sum,goodsItem) => {
				return sum+goodsItem.price
			},0)
		}
	})

	cartSend.addEventListener('click',()=>{
		const cart=localStorage.getItem('cart')?
			JSON.parse(localStorage.getItem('cart'))
			:[];
		postData(cart)
			.then(() => {
				localStorage.removeItem('cart')
				renderCart([])
				cartTotal.textContent=0
			})
	})
}