const burger = document.querySelector('.burger')
const nav = document.querySelector('.header__nav')
const modal = document.querySelector('.nav-modal')
const products = document.querySelector('.products')
const process = document.querySelector('.process')
const reviews = document.querySelector('.reviews')
const footer = document.querySelector('.footer')
const main = document.querySelector('.main__colum')
const advantage = document.querySelector('.advantage')
const blockItems = document.querySelectorAll('.advantage__block-item')

const showNavigation = () => {
	burger.classList.toggle('close')
	modal.classList.toggle('show-nav')
}

const scrollCustom = (target) => {
	target.scrollIntoView({block:'start',behavior:'smooth'})
	if(modal.classList.contains('show-nav')){
		modal.classList.remove('show-nav')
		burger.classList.remove('close')
	}
}

const scrollTarget = (target) => {
	if(target === 'Start your design'){
		scrollCustom(process)
	}
	if(target === 'All products'){
		scrollCustom(products)
	}
	if(target === 'Inspiration'){
		scrollCustom(reviews)
	}
	if(target === 'About'){
		scrollCustom(footer)
	}
}

const scrollAnimation = () => {
	if(products.getBoundingClientRect().top <720){
		products.style.opacity = 1 
	} 
	if(process.getBoundingClientRect().top < 725){
		process.style.opacity = 1 
	}
	if(advantage.getBoundingClientRect().top < 500){
		let transition = 0.8
		advantage.childNodes[1].childNodes[1].childNodes.forEach((node)=>{
			node.style.transform = 'translate(0px)'
			node.style.transition = `all ${transition}s `
			transition += 0.5
		})
		advantage.style.opacity = 1
	}

	if(blockItems[1].getBoundingClientRect().top < 716){
		let transition = 0.8
		blockItems.forEach((node)=>{
			node.style.opacity = 1
			node.style.transform = 'translate(0px)'
			node.style.transition = `all ${transition}s `
			transition += 0.8
		})
	}
	if(reviews.getBoundingClientRect().top < 570){
		reviews.style.opacity = 1 
		let reviewItems = reviews.children[0].childNodes[3].childNodes[1].childNodes
		const reviewLastEl = reviews.children[0].childNodes[5]
		reviewItems = Array.from(reviewItems).filter((el,index)=> index % 2 !== 0)
		reviewItems.forEach((node)=>{
			if(node.getBoundingClientRect().top < 770){
				node.style.transform = 'translateX(0px)'
			}
		})
		if(reviewLastEl.getBoundingClientRect().top < 700){
			reviewLastEl.style.transform = 'scale(1)'
		}
	}
}

burger.addEventListener('click',showNavigation)

modal.addEventListener('click',(e)=>{
	e.stopPropagation()
	if(e.target.classList.contains('nav-modal')){
		showNavigation()
	}
	if(e.target.classList.contains('nav-modal__nav-list-link')){
		e.preventDefault()
		scrollTarget(e.target.text)
	}
})

nav.addEventListener('click',(e)=>{
	e.preventDefault()
	if(e.target.text === 'Start your design'){
		scrollCustom(products)
	}
	if(e.target.text === 'All products'){
		scrollCustom(process)
	}
	if(e.target.text === 'Inspiration'){
		scrollCustom(reviews)
	}
	if(e.target.text === 'About'){
		scrollCustom(footer)
	}
	
})

window.onload = window.addEventListener('scroll',scrollAnimation)
