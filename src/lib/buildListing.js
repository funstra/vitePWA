const productList = document.querySelector('#listing .products')
const productTemplate = document.querySelector('#listing > template')
const startDate = new Date()
export const build = async data => {
    data.forEach(product => {
        const productElement = productTemplate.content.cloneNode(true)
        const elmRef = productElement.firstElementChild
        elmRef.dataset.productId = product.id
        productElement.querySelector('.info').textContent = product.id
        productElement.querySelector('img').src = `https://picsum.photos/seed/${startDate.getTime() + product.id + 1}/32.webp`
        productList.appendChild(productElement)
        setTimeout(() => {
            elmRef.classList.remove('hidden')
        }, 75);
    })
}