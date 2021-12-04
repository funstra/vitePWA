import './style/style.css'
import './lib/fetchData.js'
const listing = document.querySelector('#listing')
const productContainer = document.querySelector('.products')

__AppClosure.selected = []
// Handdle product swipe - - - - 
const handleProductSwipe = (e) => {
    /** @type {HTMLElement} */
    let target = e.target
    const parent = target.closest('.product')
    let bbox = target.getBoundingClientRect()
    const { clientX: xStart } = e
    const xOffset = (xStart - bbox.left) / bbox.width

    // if (parent.dataset.count) {
    //     target.textContent = `< ${parent.dataset.count} >`
    // }

    const handleMove = e => {
        const { clientX } = e
        const x = ((clientX - bbox.left) / bbox.width) - xOffset
        console.log(x)
        if (x < -0.25) {
            console.log('inc')
            const count = (+parent.dataset.count) || 0
            parent.dataset.count = count + 1
            target.style.setProperty('--count', (count + 1).toString())
            target.removeEventListener('pointermove', handleMove)
            // target.removeEventListener('pointerdown', handleProductSwipe)
            // target.removeEventListener('pointerleave', handleLeave)

        } else if (x > 0.25) {
            console.log('dec')
            const count = (+parent.dataset.count) || 0
            parent.dataset.count = Math.max(count - 1, 0)
            target.style.setProperty('--count', Math.max(count - 1, 0).toString())
            target.removeEventListener('pointermove', handleMove)
            // target.removeEventListener('pointerdown', handleProductSwipe)
            // target.removeEventListener('pointerleave', handleLeave)

        }
        target.textContent = `< ${(parent.dataset.count) ?? '0'} >`
    }
    const handleLeave = e => {
        target.removeEventListener('pointermove', handleMove)
        // target.removeEventListener('pointerdown', handleProductSwipe)
        target.removeEventListener('pointerleave', handleLeave)
    }
    target.addEventListener('pointermove', handleMove)
    target.addEventListener('pointerleave', handleLeave)
}

// handle long press on products - - - - 
const handleDown = e => {
    e.stopPropagation()
    /** @type {HTMLElement} */ // @ts-ignore
    let target = e.target
    if (target.tagName !== 'LI') return


    let lock = target.dataset.lock == 'true'
    let animating = false
    let block = false
    let gracePeriod = 125
    let aDuration = +getComputedStyle(target).getPropertyValue('--a-duration').slice(0, -2)
    const handleLeave = e => {
        block = true
        if (animating) {
            if (!lock) {
                // target.style.removeProperty('--bg')
                target.classList.remove('gracing')
            } else {
                target.classList.add('gracing')
                // target.style.setProperty('--bg', 'red')
            }
        }
    }

    target.addEventListener('pointerleave', handleLeave)
    setTimeout(() => {
        if (block) return
        if (lock) {
            // target.style.removeProperty('--bg')
            target.classList.remove('gracing')
        } else {
            target.classList.add('gracing')
            // target.style.setProperty('--bg', 'red')
        }
        animating = true
        setTimeout(() => {
            if (!block) {
                // Product selected - - - -
                const id = +target.dataset.productId
                if (!lock) {
                    console.log('adding product to selected')
                    __AppClosure.selected.push(__AppClosure.products.find(product => product.id == id))
                } else {
                    console.log(`id: ${id}`)
                    console.log('removing product from selected')
                    __AppClosure.selected = __AppClosure.selected.filter(product => product.id !== id)
                }
                // target.style.border = lock ? '0px #555 dashed' : '4px #555 dashed'
                target.dataset.lock = lock ? 'false' : 'true'
                lock = !lock
                const controll = target.querySelector('.controll')

                if (!target.dataset.count) {
                    controll.textContent = lock ? '< 0 >' : ''
                } else {
                    controll.textContent = lock ? `< ${target.dataset.count} >` : target.dataset.count
                }
                console.log(target.dataset.lock)
                if (lock) {
                    console.log('check swipe')
                    target.querySelector('.controll').addEventListener('pointerdown', handleProductSwipe)
                } else {
                    console.log('remove check swipe')
                    target.querySelector('.controll').removeEventListener('pointerdown', handleProductSwipe)
                }
            } else {
                // ....
            }
            target.removeEventListener('pointerleave', handleLeave)
        }, aDuration);
    }, gracePeriod);
}

productContainer.onpointerdown = handleDown
// handle long press on products - - - - 


const drawer = document.querySelector('#drawer')
// const hInfo = document.querySelector('#drawer p>span')





// handle drawer movement - - - - 
const handleDrawer = e => {
    e.stopPropagation()
    const { clientY: startY } = e
    /** @type {HTMLElement} */
    const target = drawer
    const bbox = target.getBoundingClientRect()
    let hOffset = 0
    const handleMove = e => {
        const { clientY: y } = e
        hOffset = 100 * (startY - y) / window.innerHeight
        target.style.setProperty('--h-offset', `${hOffset}%`)
        // hInfo.textContent = `${hOffset}%`

    }
    target.addEventListener('pointermove', handleMove)
    const handleUp = e => {

        target.removeEventListener('pointermove', handleMove)

        if (hOffset > 5) {
            console.log(hOffset)
            // target.style.setProperty('--h', '50%')
            console.log("greater")
            let message = ''

            target.dispatchEvent(new CustomEvent('app-context', {
                bubbles: true,
                detail: {
                    action: "none:open"
                }
            }))

            target.style.removeProperty('--h-offset')
            // hInfo.textContent = '50%'
            listing.style.setProperty('--compress', 1)
        } else if (hOffset < -5) {
            console.log("lesser")

            // target.style.setProperty('--h', '80px')
            target.dispatchEvent(new CustomEvent('app-context', {
                bubbles: true,
                detail: {
                    action: "none:close"
                }
            }))

            target.style.removeProperty('--h-offset')
            // hInfo.textContent = '0%'
            listing.style.removeProperty('--compress')
        }
        else {
            target.style.removeProperty('--h-offset')
            // hInfo.textContent = ''
        }
        hOffset = 0
        target.style.transition = 'height 125ms'
        setTimeout(() => {
            target.style.transition = ''
        }, 150);

    }
    target.addEventListener('pointerup', handleUp)

}



drawer.onpointerdown = handleDrawer
