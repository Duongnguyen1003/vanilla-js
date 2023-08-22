import { getProduct, updateProduct } from "@/api/product";
import { router, useEffect, useState } from "@/utilities";
import axios from "axios";

// if localStorage đã có data thì gán vào products ngược lại gán vào array rỗng
const ProductEdit = ({ id }) => {
  /** localStorage
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const currentProduct = products.find(product => product.id === id);
  console.log(currentProduct)
 */

  const [product, setProduct] = useState({});

  useEffect(() => {
    // fetch(`http://localhost:3000/products/${id}`)
    //   .then(response => response.json())
    //   .then((data) => { setProduct(data)} )
    // axios.get(`http://localhost:3000/products/${id}`)
    //   .then(({ data }) => { setProduct(data); })

    (async () => {
      try {
        setProduct(await getProduct(id));
      } catch (error) {
        console.log(error);
      }
    })()
  }, [])

  useEffect(() => {
    const form = document.getElementById('form-add');
    const productName = document.getElementById('product-name');
    const productPrice = document.getElementById('product-price');

    form.addEventListener('submit', async function (e) {
      e.preventDefault(); // reload page

      try {
        await updateProduct({
          id: id,
          name: productName.value,
          price: productPrice.value
        })
        router.navigate('#/admin/products')
      } catch (error) {
        console.log(error);
      }


      const formData = {
        id: id,
        name: productName.value,
        price: productPrice.value
      };
      /**
            // update product to array
            const newProducts = products.map((product) => {
              return product.id === newProduct.id ? newProduct : product;
            })

            // save localStorage
            localStorage.setItem('products', JSON.stringify(newProducts)); // Json.stringify: chuyển lại mảng chuối
      */

      // fetch(`http://localhost:3000/products/${id}`, {
      //   method: 'PUT',
      //   headers: {
      //     "content-type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // }).then(() => {
      //   // redirect to admin/products
      //   router.navigate('#/admin/products')
      // })
      // axios.put(`http://localhost:3000/products/${id}`, formData)
      //   .then(() => { router.navigate('#/admin/products')})

      // updateProduct(formData)
      //   .then(() => { router.navigate('#/admin/products') })
      //   .catch((error) => {
      //     console.log(error);
      //   })
    })
  });
  // if (!currentProduct) return null; 

  return (
    `
      <div class="container">
        <h1>Edit sản phẩm</h1>
        <form action="" id="form-add">
          <div class="form-group mb-3">
            <label for="">Tên sản phẩm</label>
            <input type="text" id="product-name" class="form-control" value="${product.name ?? ""}" />
          </div>
          <div class="form-group mb-3">
            <label for="">Giá sản phẩm</label>
            <input type="text" id="product-price" class="form-control" value="${product.price ?? ""}" />
          </div>
          <div class="form-group">
            <button class="btn btn-primary">Edit sản phẩm</button>
          </div>
        </form>
      </div>
    `
  )
}

export default ProductEdit;