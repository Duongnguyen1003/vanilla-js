import { addProduct } from "@/api/product";
import { router, useEffect } from "@/utilities";
import axios from "axios";
// import { products } from "@/data/data";
import { v4 as uuidv4 } from 'uuid';

const ProductAdd = () => {
  // run locaStorage Service
  // if localStorage đã có data thì gán vào products ngược lại gán vào array rỗng
  // const products = JSON.parse(localStorage.getItem('products')) || []; 

  useEffect(() => {
    const form = document.getElementById('form-add');
    const productName = document.getElementById('product-name');
    const productPrice = document.getElementById('product-price');
    const productImage = document.getElementById('product-images');

    form.addEventListener('submit', async function (e) {
      e.preventDefault(); // reload page
      try {
        const urls = await uploadFiles(productImage.files);
        await addProduct({
          name: productName.value,
          price: productPrice.value,
          gallery: urls
        })
        router.navigate('#/admin/products');
      } catch (error) {
        console.log(error);
      }

      // const newProduct = {
      //   //id: uuidv4(), // localhost not id
      //   name: productName.value,
      //   price: productPrice.value
      // };

      // add product to array
      // products.push(newProduct);

      /** thay đổi dùng fetch chuyển sang axios
       fetch("http://localhost:3000/products", {
        method: 'POST',
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newProduct),})
          .then(() => { // wait add product successfully thì mới chuyển page
          // redirect to admin/products
          router.navigate('#/admin/products')
        })
      */

      // axios.post('http://localhost:3000/products', newProduct)
      //   .then(() => {
      //     router.navigate('#/admin/products')
      //   })
      // addProduct(newProduct)
      //   .then(() => { router.navigate('#/admin/products') })
      //   .catch((error) => {
      //     console.log(error);
      //   })

      /** ngắn gọn hơn
        addProduct({name: productName.value, price: productPrice.value})
          .then(() => {
            router.navigate('#/admin/products')
      }) 
      */

      // save localStorage
      //localStorage.setItem('products', JSON.stringify(products)); // Json.stringify: chuyển lại mảng chuối


    })
  });

  const uploadFiles = async (files) => {

    if (files) {
      const CLOUD_NAME = 'dfcbxbqe8';
      const PRESET_NAME = 'demo-upload';
      const FOLDER_NAME = 'ECMA';
      const urls = [];
      const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  
      const formData = new FormData(); //key:value
  
      formData.append("upload_preset", PRESET_NAME);
      formData.append("folder", FOLDER_NAME);
  
      for (const file of files) {
        formData.append("file", file);
  
        const response = await axios.post(api, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        });
        urls.push(response.data.secure_url);
      }
      return urls;
    }

 
}

  return (
    `
      <div class="container">
        <h1>Thêm sản phẩm</h1>
        <form action="" id="form-add">
          <div class="form-group mb-3">
            <label for="">Tên sản phẩm</label>
            <input type="text" id="product-name" class="form-control">
          </div>
          <div class="form-group mb-3">
            <label for="">Giá sản phẩm</label>
            <input type="text" id="product-price" class="form-control">
          </div>
          <div class="form-group mb-3">
            <label for="">Ảnh sản phẩm</label>
            <input type="file" id="product-images" multiple class="form-control">
          </div>
          <div class="form-group">
            <button class="btn btn-primary">Thêm sản phẩm</button>
          </div>
        </form>
      </div>
    `
  )
}

export default ProductAdd;