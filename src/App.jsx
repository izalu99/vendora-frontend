
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import {useState, useEffect }from 'react'
import Login from './views/auth/Login'
import Register from './views/auth/Register'
//import Dashboard from './views/auth/Dashboard'
import Logout from './views/auth/Logout'
import ForgotPassword from './views/auth/ForgotPassword'
import CreatePassword from './views/auth/CreatePassword'
import StoreHeader from './views/base/StoreHeader'
import StoreFooter from './views/base/StoreFooter'
import Products from './views/store/Products'
import ProductDetail from './views/store/ProductDetail'
import Cart from './views/store/Cart'
import Checkout from './views/store/Checkout'
import PaymentSuccess from './views/store/PaymentSuccess'
import Search from './views/store/Search'
import MainWrapper from './layout/MainWrapper'
import PrivateRoute from './layout/PrivateRoute'
import { CartContext } from './views/plugin/Context'
import GetUserData from "./views/plugin/GetUserData"
import GetCartId from "./views/plugin/GetCartId";
import apiInstance from './utils/axios'

import Account from './views/customer/Account'
import Orders from './views/customer/Orders'
import Wishlist from './views/customer/Wishlist'
import CustomerNotifications from './views/customer/CustomerNotifications'
import CustomerSettings from './views/customer/CustomerSettings'
import OrderDetail from './views/customer/OrderDetail'
import Invoice from './views/customer/Invoice'

import Dashboard from './views/vendor/Dashboard'
import Coupon from './views/vendor/Coupon'
import Notifications from './views/vendor/Notifications'
import Settings from './views/vendor/Settings'
import Earning from './views/vendor/Earning'
import Reviews from './views/vendor/Reviews'
import VendorOrders from './views/vendor/VendorOrders'
import VendorProducts from './views/vendor/VendorProducts'
import AddProduct from './views/vendor/AddProduct'
import VendorOrderDetail from './views/vendor/VendorOrderDetail'
import ReviewDetails from './views/vendor/ReviewDetails'
import EditCoupon from './views/vendor/EditCoupon'
import Shop from './views/vendor/Shop'
import UpdateProduct from './views/vendor/UpdateProduct'


function App() {
  const [cartCount, setCartCount] = useState()
  const userData = GetUserData();
  const cartId = GetCartId();

  useEffect(() =>{
    const url = userData ? `/cart-list/${cartId}/${userData?.user_id}` : `/cart-list/${cartId}/`
    apiInstance.get(url).then((res) => {
      setCartCount(res.data.length)
      console.log(cartCount)
    })
  },[cartCount])

  return (
    <CartContext.Provider value={[cartCount, setCartCount]}>
      <BrowserRouter>
      <StoreHeader />
        <MainWrapper>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/*<Route path="/dashboard" element={<Dashboard />} />*/}
            <Route path="/logout" element={<Logout />} />
            <Route path="/forgot-password" element={<ForgotPassword/>} />
            <Route path="/create-new-password" element={<CreatePassword />} />

            {/* Store routes */}
            <Route path="/" element={<Products />} />
            <Route path="/detail/:slug" element={<ProductDetail />} />
            <Route path="/cart/" element={<Cart />} />
            <Route path='/checkout/:oid' element={<Checkout />} />
            <Route path='/payment-success/:order_oid/' element={<PaymentSuccess />} />
            <Route path='/search/' element={<Search />} />

            {/*Customer routes */}
            <Route path="customer/account" element={<PrivateRoute><Account/></PrivateRoute>} />
            <Route path="customer/orders" element={<PrivateRoute><Orders/></PrivateRoute>} />
            <Route path="customer/orders/:order_id" element={<PrivateRoute><OrderDetail/></PrivateRoute>} />
            <Route path="customer/wishlist" element={<PrivateRoute><Wishlist/></PrivateRoute>} />
            <Route path="customer/notifications" element={<PrivateRoute><CustomerNotifications/></PrivateRoute>} />
            <Route path="customer/settings" element={<PrivateRoute><CustomerSettings/></PrivateRoute>} />
            <Route path="customer/invoice/:order_oid" element={<PrivateRoute><Invoice/></PrivateRoute>} />

             {/*Vendor routes */}
            <Route path="/vendor/dashboard/" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
            <Route path="/vendor/products/" element={<PrivateRoute><VendorProducts/></PrivateRoute>} />
            <Route path="/vendor/orders/" element={<PrivateRoute><VendorOrders/></PrivateRoute>} />
            <Route path="/vendor/earning/" element={<PrivateRoute><Earning/></PrivateRoute>} />
            <Route path="/vendor/reviews/" element={<PrivateRoute><Reviews/></PrivateRoute>} />
            <Route path="/vendor/review-details/:review_id" element={<PrivateRoute><ReviewDetails/></PrivateRoute>} />
            <Route path="/vendor/product/new/" element={<PrivateRoute><AddProduct/></PrivateRoute>} />
            <Route path="/vendor/product/update/:pid/" element={<PrivateRoute><UpdateProduct/></PrivateRoute>} />
            <Route path="/vendor/coupon/" element={<PrivateRoute><Coupon/></PrivateRoute>} />
            <Route path="/vendor/coupon/:coupon_id/" element={<PrivateRoute><EditCoupon/></PrivateRoute>} />
            <Route path="/vendor/notifications/" element={<PrivateRoute><Notifications/></PrivateRoute>} />
            <Route path="/vendor/settings/" element={<PrivateRoute><Settings/></PrivateRoute>} />
            <Route path="/vendor/orders/:order_oid/" element={<PrivateRoute><VendorOrderDetail/></PrivateRoute>} />
            <Route path="/vendor/:slug/" element={<PrivateRoute><Shop/></PrivateRoute>} />



          </Routes>
        </MainWrapper>
      <StoreFooter />
      </BrowserRouter>
    </CartContext.Provider>
    
  )
}

export default App
