import ProductList from "@/components/Products/ProductList";

const ProductsPage = () => {
  return (
    `
        <div class="container">
            <div>
                ${ProductList()}
            </div>
        </div>
    `
  )
}

export default ProductsPage;