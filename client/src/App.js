import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.js';
import About from './pages/About.js';
import Contact from './pages/Contact.js';
import Policy from './pages/Policy.js';
import PageNotFound from './pages/PageNotFound.js';
import Singup from './pages/Auth/Singup.js';
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Auth/Login.js';
import Dashboard from './pages/user/Dashboard.js';
import PrivateRoute from './components/Routes/Private.js';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute.js';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import User from './pages/Admin/User';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search.js';
import ProductDetails from './pages/ProductDetails.js';
import Categories from './pages/Categories.js';
import CategoryProduct from './pages/CategoryProduct.js';
import CartPage from './pages/CartPage.js';
import AdminOrders from './pages/Admin/AdminOrders.js';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/category/:slug' element={<CategoryProduct />} />
        <Route path='/product/:slug' element={<ProductDetails />} />
        <Route path='/search' element={<Search />} />
        <Route path='/singup' element={<Singup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />

        <Route path='/dashboard' element={< PrivateRoute />} >
          <Route path='user' element={<Dashboard />} />
          <Route path='user/profile' element={<Profile />} />
          <Route path='user/orders' element={<Orders />} />
        </Route >

        <Route path='/dashboard' element={< AdminRoute />} >
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='admin/create-category' element={<CreateCategory />} />
          <Route path='admin/create-product' element={<CreateProduct />} />
          <Route path='admin/product/:slug' element={<UpdateProduct />} />
          <Route path='admin/products' element={<Products />} />
          <Route path='admin/users' element={<User />} />
          <Route path='admin/orders' element={<AdminOrders />} />
        </Route >

        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/Policy' element={<Policy />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;