
import { getProducts } from '@/api/product';
import { useEffect, useState } from '@/utilities';

const ProductList = () => {
    
    const [data, setData] = useState([]); // cú pháp destructuring

    useEffect(() => {
        getProducts()
            .then(({ data }) => { setData(data) })
            .catch((error) => {error})
    }, [])

    return `
    <div class="row">
        ${data.map(product =>{
            return `
                <div class="col">
                    <h3><a href="/product/${product.id}"> ${product.name}</a></h3>
                    <span>${product.price}</span>
                </div>
            `
        }).join("")}
    </div>
  `
}

export default ProductList;