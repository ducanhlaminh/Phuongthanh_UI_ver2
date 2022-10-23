
export function PriceCaculator(product,variants){
    let cost = product.costPerUnit
    variants.map((variant) => {
        cost = cost + variant.price
    })
    return cost
}