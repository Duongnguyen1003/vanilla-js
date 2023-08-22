import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";

import { render, router } from "./utilities";
import ProductDetail from "./components/Products/ProductDetail";
import ProductsPage from "./pages/ProductsPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import NotFoundPages from "./pages/NotFoundPages";
import ProductAdd from "./pages/admin/Products/Product-add";
import AdminProductPage from "./pages/admin/Products/Products";
import ProductEdit from "./pages/admin/Products/Product-edit";

const app = document.querySelector("#app");

router.on('/', () => render(HomePage, app));
router.on('/about', () => render(AboutPage, app));
router.on('/products', () => render(ProductsPage, app));
router.on('/product/:id', ({data}) => render(() => ProductDetail(data), app));


// admin

router.on('/admin/products', () => render(AdminProductPage, app));
router.on('/admin/products/add', () => render(ProductAdd, app));
router.on('/admin/products/:id/edit', ({ data }) => render(() => ProductEdit(data), app));

// notfound
router.notFound(()=> render(NotFoundPages, app));

router.resolve();
