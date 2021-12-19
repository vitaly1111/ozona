const cartBtn=document.getElementById('cart')
const cartModal=document.querySelector('.cart')
const closeModal=document.querySelector('.cart-close')

const openCart=() => {
	cartModal.style.display='flex';
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
}