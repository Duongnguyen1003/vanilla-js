// import { products } from "@/data/data";
import { deleteProduct, getProducts } from "@/api/product";
import { useEffect, useState } from "@/utilities";

const AdminProductPage = () => {

  const [products, setProducts] = useState([]); // cú pháp destructuring

  useEffect(() => {
    /**
     * xử lý localstorage
     * const products = JSON.parse(localStorage.getItem('products')) || [];
     * setData(products);
     */

    /** thay đổi dùng fetch chuyển sang axios
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
     */

    // axios.get("http://localhost:3000/products")
    // .then(({data})=>setProducts(data))

    // getProducts()
    //   .then(( data ) => setProducts(data))
    //   .catch((error) => { console.log(error); })

    (async () => {
      try {
        setProducts(await getProducts());
      } catch (error) {
        console.log(error);
      }
    })()
  },[])

  useEffect(() =>{
    const btns = document.querySelectorAll(".btn-remove");
    for (let btn of btns) {
      btn.addEventListener("click", async function () {
        const id = this.dataset.id;
        const confirm = window.confirm("Are you sure you want to remove")

        // fetch(`http://localhost:3000/products/${id}`, {
        //   method: "DELETE",
        // }).then(() => {
        //   const newProducts = products.filter((product) => product.id !== +id);
        //   setProducts(newProducts);
        // });

        // axios.delete(`http://localhost:3000/products/${id}`)
        //   .then(() => {
        //     const newProducts = products.filter((product) => product.id !== +id);
        //     setProducts(newProducts);
        // })
        if (confirm) {
          try {
            await deleteProduct(id);
            const newProducts = products.filter((product) => product.id !== +id);
            setProducts(newProducts);
          } catch (error) {
            console.log(error)
          }
          // deleteProduct(id)
          //   .then(() => {
          //     const newProducts = products.filter((product) => product.id !== +id);
          //     setProducts(newProducts);
          //   })
          //   .catch((error) => {
          //     console.log(error);
          //   })
        }
      });
    };
  });

  return /*html*/(
    `<div class="container ">
      <button type="button" class="tw-mx-auto tw-container tw-my-10">
        <a href="#/admin/products/add" class="btn btn-primary">Add product</a>
      </button>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>stt</th>
            <th>ten</th>
            <th>price</th>
            <th>gallery</th>
          </tr>
        </thead>
        <tbody>
        ${products.map((product, index) =>
          `  <tr>
              <td>${index +1}</td>
              <td>${product.name}</td>
              <td>${product.price}</td>
              <td><img class="tw-h-24 tw-w-24 tw-mx-auto" src="${product.gallery[0]}" alt=""></td>
              <td>
                <button data-id="${product.id}" class="btn btn-danger btn-remove">delete</button>
              </td>
                 <td>
                <button class="btn btn-info btn-update">
                  <a href="#/admin/products/${product.id}/edit">update</a>
                </button>
              </td>
            </tr>`
          ).join("")}
        </tbody>
      </table>
    </div>`
  )
}

export default AdminProductPage;