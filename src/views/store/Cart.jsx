import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import apiInstance from "../../utils/axios"
import GetUserData from "../plugin/GetUserData"
import GetCartId from "../plugin/GetCartId";
import { CartContext } from '../plugin/Context';

import Swal from 'sweetalert2'


const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 1200,
    timerProgressBar: false,
})


const Cart = () => {
    const [cartCount, setCartCount] = useContext(CartContext);
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState([]);
    const [productQtys, setProductQtys] = useState({});

    const userData = GetUserData();
    const cartId = GetCartId();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [country, setCountry] = useState('');

    const navigate = useNavigate();


    


    useEffect(() => {
        const initialQty = {};
        cart.forEach((item) => {
            initialQty[item.product?.pid] = item.qty;
        });
        setProductQtys(initialQty);
    },[cart]);
    


    const fetchCartData = async (cartId, userId) => {
        const url = userData?.user_id ? `/cart-list/${cartId}/${userId}` : `/cart-list/${cartId}/`;
        try{
            const response = await apiInstance.get(url);
            console.log(response.data);
            setCart(response.data);
            setCartCount(response.data.length);
        } catch (error) {
            console.log('Error fetching cart data: ',error);
        }
    };


    const handleQtyChange = (event, productId, qty) => {
        event.preventDefault();
        setProductQtys((prevProductQtys) => ({
            ...prevProductQtys,
            [productId]: qty,
        }));
    }

    const updateCart = async (productId, product) =>{
        const qtyValue = productQtys[productId]


        try {
            const formData = new FormData();
            formData.append("Product ID: ", productId);
            formData.append("product_id",product?.id)
            formData.append("user_id",userData?.user_id)
            formData.append("qty",productQtys[productId])
            formData.append("price",product?.price)
            formData.append("shipping_amount",product?.shipping_amount)
            formData.append("country",product?.country)
            formData.append("size",qtyValue)
            formData.append("color",product?.color)
            formData.append("cart_id",cartId)

            const response = await apiInstance.post('cart-view/', formData);
            console.log('response: ', response.data);
            
            fetchCartData(cartId, userData?.user_id);
            fetchCartTotal(cartId, userData?.user_id);
            //setCartCount(response.data.length);
            
            Toast.fire({
                icon: 'success',
                title: response.data.message
            })
        }catch(error){
            console.log("Error updating cart: ", error)
        }

    }


    const fetchCartTotal = async (cartId, userId) => {
        const url = userId ? `/cart-detail/${cartId}/${userId}` : `/cart-detail/${cartId}/`;
        try{
            const response = await apiInstance.get(url);
            console.log('fetchCartTotal:', response.data);
            setCartTotal(response.data);
            
            
        } catch (error) {
            console.log('Error fetching cart total: ',error);
        }
    };


    useEffect(() => {
        if(cartId !== null && cartId !== undefined){
            fetchCartData(cartId, userData?.user_id);
            fetchCartTotal(cartId, userData?.user_id);
        } else {
            console.log('Cart ID not found');
        }
    },[]);



    console.log('Cart: ', cart);
    console.log('Cart Total: ', cartTotal);
    console.log('Chosen Qty: ', productQtys);


    const handleCartItemDelete = async (itemId) =>{
        const url = userData?.user_id
        ? `cart-delete/${cartId}/${itemId}/${userData?.user_id}/`
        : `cart-delete/${cartId}/${itemId}/`;

        try{
            await apiInstance.delete(url);
            fetchCartData(cartId, userData?.user_id);
            fetchCartTotal(cartId, userData?.user_id);

            Toast.fire({
                icon: 'success',
                title: 'Item removed from cart'
            })
            
        } catch (error) {
            console.log('Error deleting cart item: ',error);
        }
    }


    const handleInfoChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        switch(name){
            case 'fullName':
                setFullName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'phone':
                setPhone(value);
                break;
            case 'address':
                setAddress(value);
                break;
            case 'city':
                setCity(value);
                break;
            case 'province':
                setProvince(value);
                break;
            case 'country':
                setCountry(value);
                break;
            default:
                break
        }

    }

    const createOrder = async () => {
        if (!fullName || !email || !phone || !address || !city || !province || !country){
            Swal.fire({
                icon: 'warning',
                title: 'Please fill all fields',
                text:"All fields are required to proceed to checkout"
            })
        } else{
            try{
                const formData = new FormData();
            formData.append("full_name", fullName)
            formData.append("email", email)
            formData.append("phone", phone)
            formData.append("address", address)
            formData.append("city", city)
            formData.append("province", province)
            formData.append("country", country)
            formData.append("cart_id", cartId)
            formData.append("user_id", userData ? userData?.user_id : 0)

            const response = await apiInstance.post('create-order/', formData);
            console.log(response.data.message);
            navigate(`/checkout/${response.data.oid}/`)
            } catch (error) {
                console.log('Error creating order: ',error);
            }
        }

        
    }
    

  return (
    <div>
    <main className="mt-5">
        <div className="container mx-auto">
            <main className="mb-6">
                <div className="container mx-auto">
                    <section className="">
                        <div className="row flex flex-wrap mb-5">
                            <div className="col-lg-8 mb-4 mb-md-0">
                                {/* Cart Items */}
                                <section className="mb-5">
                                    {cart.length > 0 && cart.map((item) => (
                                    <div key= {item.product?.pid} className="row border-b mb-4">
                                        <div className="col-md-2 mb-4 mb-md-0">
                                            <div className="bg-gray-200 rounded-lg mb-4 overflow-hidden">
                                                <Link to=''>
                                                    <img
                                                        src= {item.product?.image}
                                                        className="w-full"
                                                        alt=""
                                                        style={{ height: "100px", objectFit: "cover", borderRadius: "10px" }}
                                                    />
                                                </Link>
                                                <a href="#!">
                                                    <div className="hover-overlay">
                                                        <div
                                                            className="mask"
                                                            style={{
                                                                backgroundColor: "hsla(0, 0%, 98.4%, 0.2)"
                                                            }}
                                                        />
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-md-8 mb-4 mb-md-0">
                                            <Link to={null} className="font-bold text-dark mb-4">{item.product?.title}</Link>
                                            {item.size &&
                                            <p className="mb-0">
                                                <span className="text-gray-500 mr-2">Size:</span>
                                                <span>{item.size}</span>
                                            </p>
                                            }
                                            {item.color &&
                                            <p className='mb-0'>
                                                <span className="text-gray-500 mr-2">Color:</span>
                                                <span>{item.color}</span>
                                            </p>
                                            }
                                            <p className='mb-0'>
                                                <span className="text-gray-500 mr-2">Price:</span>
                                                <span>{item.price}</span>
                                            </p>
                                            <p className='mb-0'>
                                                <span className="text-gray-500 mr-2">Vendor:</span>
                                                <span>{item.product.vendor?.user?.name || item.product.vendor?.user?.full_name || 'Unknown'}</span>
                                            </p>
                                            <p className="mt-3 mb-1">
                                                <button 
                                                className="btn btn-danger"
                                                onClick={() => handleCartItemDelete(item.id)}
                                                href="#">
                                                    <small><i className="fas fa-trash mr-2" />Remove</small>
                                                </button>
                                            </p>
                                        </div>
                                        <div className="col-md-2 mb-4 mb-md-0">
                                            <div className="flex justify-center items-center">
                                                <div className="form-outline">
                                                    <label className="form-label" htmlFor="qty">Quantity</label>
                                                    <div className="flex flex-col lg:flex-row">
                                                        <input
                                                            id="qty"
                                                            type="number"
                                                            className="form-control w-20"
                                                            value={productQtys[item.product?.pid]}
                                                            min={1}
                                                            max={item.product?.stock_qty}
                                                            onChange={(e) => handleQtyChange(e, item.product?.pid, e.target.value)}
                                                        />
                                                        <button 
                                                            onClick={() => updateCart(item.product?.pid, item.product)}
                                                            className="btn btn-primary btn-rounded w-full"><i className="fas fa-rotate-right"></i></button>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            <h5 className="mb-2 mt-3 text-center"><span className="align-middle">Sub Total: {item.sub_total}</span></h5>
                                        </div>
                                    </div>
                                    ))}

                                    {cart.length === 0 &&
                                    <>
                                        <h5>Your Cart Is Empty</h5>
                                        <Link to='/'> <i className='fas fa-shopping-cart'></i> Continue Shopping</Link>
                                    </>
                                    }
                                {/* Shipping Information */}
                                </section>
                                <div>
                                    <h5 className="mb-4 mt-4 font-bold">Personal Information</h5>
                                    <div className="row mb-4">
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="fullName"> <i className='fas fa-user'></i> Full Name</label>
                                                <input
                                                    type="text"
                                                    id="fullName"
                                                    name='fullName'
                                                    className="form-control"
                                                    onChange={handleInfoChange}
                                                    value={fullName}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-4">
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="email"><i className='fas fa-envelope'></i> Email</label>
                                                <input
                                                    type="text"
                                                    id="email"
                                                    className="form-control"
                                                    name='email'
                                                    onChange={handleInfoChange}
                                                    value={email}
                                                />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="phone"><i className='fas fa-phone'></i> Phone</label>
                                                <input
                                                    type="text"
                                                    id="phone"
                                                    className="form-control"
                                                    name='phone'
                                                    onChange={handleInfoChange}
                                                    value={phone}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <h5 className="mb-1 mt-4 font-bold">Shipping Information</h5>

                                    <div className="row mb-4">
                                        <div className="col-lg-6 mt-3">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="address"> Address</label>
                                                <input
                                                    type="text"
                                                    id="address"
                                                    className="form-control"
                                                    name='address'
                                                    onChange={handleInfoChange}
                                                    value={address}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mt-3">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="city"> City</label>
                                                <input
                                                    type="text"
                                                    id="city"
                                                    className="form-control"
                                                    name='city'
                                                    onChange={handleInfoChange}
                                                    value={city}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mt-3">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="province">Province</label>
                                                <input
                                                    type="text"
                                                    id="province"
                                                    className="form-control"
                                                    name='province'
                                                    onChange={handleInfoChange}
                                                    value={province}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mt-3">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="country">Country</label>
                                                <input
                                                    type="text"
                                                    id="country"
                                                    className="form-control"
                                                    name='country'
                                                    onChange={handleInfoChange}
                                                    value={country}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 mb-4 mb-md-0">
                                <section className="shadow-lg p-4 rounded-lg mb-4">
                                    <h5 className="mb-3">Cart Summary</h5>
                                    {/** Cart Summary*/}
                                    <div className="flex justify-between mb-3">
                                        <span>Subtotal </span>
                                        <span>${cartTotal.sub_total?.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping </span>
                                        <span>${cartTotal.shipping?.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Tax </span>
                                        <span>${cartTotal.tax?.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Service Fee </span>
                                        <span>${cartTotal.service_fee?.toFixed(2)}</span>
                                    </div>
                                    <hr className="my-4" />
                                    <div className="flex justify-between font-bold mb-5">
                                        <span>Total </span>
                                        <span>${cartTotal.total?.toFixed(2)}</span>
                                    </div>
                                    <button 
                                    className="btn btn-primary btn-rounded w-full"
                                    onClick={createOrder}>
                                        Go to checkout <i className="fas fa-arrow-right ml-2" />    
                                    </button>
                                </section>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    </main>
</div>
    )
}

export default Cart