import { build } from './buildListing.js'
import data from '../data/db.json'
__AppClosure.products = data.products
build(data.products)

// fetch('src/data/db.json')
//     .then(res => res.json())
//     .then(data => {
//         __AppClosure.products = data.products
//         return data.products
//     })
//     .then(build)