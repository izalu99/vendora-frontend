
import {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import Swal from 'sweetalert2'

import apiInstance from '../../utils/axios';
import { PAYPAL_CLIENT_ID, SERVER_URL } from '../../utils/constants';





// ############## Import the items above in your react app ################ //
const Checkout = () => {
    
    let param = useParams();
    //console.log('param: ', param["oid"]);
    const [order, setOrder] = useState([]);
    const [couponCode, setCouponCode] = useState('');
    const [paymentLoading, setPaymentLoading] = useState(false);
    const navigate = useNavigate();

    //const userData = GetUserData();
    //const cartId = GetCartId();

    const fetchOrderData = async ()=>{
        try{
            await apiInstance.get(`checkout/${param["oid"]}`).then((res) =>{
                console.log('order data: ',res.data);
                setOrder(res.data);
            })
        } catch (error) {
            console.log('Error fetching order data: ', error);
        }
    }


    useEffect(() => {
        fetchOrderData();
    },[]);

    const applyCoupon = async()=>{
        console.log('coupon applied');
        console.log('coupon code: ', couponCode);
        console.log('order id: ', order.oid);

        const formData = new FormData();
        formData.append('code', couponCode);
        formData.append('oid', order.oid);
        try{
            const response = await apiInstance.post('coupon/', formData);
            fetchOrderData();
            Swal.fire({
                icon: response.data.icon,
                title: response.data.message,
            });

        } catch (error) {
            console.log('Error applying coupon: ', error);
        }

    }

    const payWithStripe = (event)=>{
        setPaymentLoading(true);
        event.target.form.submit()

    }

    const initialOptions = {
        clientId: PAYPAL_CLIENT_ID,
        currency: "CAD",
        intent: "capture",
    };
    
    return (
        <div>
            <main>
                <main className="mb-4 mt-4">
                    <div className="container">
                        <section className="">
                            <div className="row gx-lg-5">
                                <div className="col-lg-8 mb-4 mb-md-0">
                                    <section className="">
                                        <div className="alert alert-warning">
                                            <strong>Review Your Shipping &amp; Order Details </strong>
                                        </div>
                                        <form>
                                            <h5 className="mb-4 mt-4 font-bold">Contact information</h5>
                                            <div className="row mb-4">

                                                <div className="col-lg-12">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="form6Example2">Full Name</label>
                                                        <input
                                                            type="text"
                                                            readOnly
                                                            className="form-control"
                                                            value={order.full_name}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mt-4">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="form6Example2">Email</label>
                                                        <input
                                                            type="text"
                                                            readOnly
                                                            className="form-control"
                                                            value={order.email}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mt-4">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="form6Example2">Phone</label>
                                                        <input
                                                            type="text"
                                                            readOnly
                                                            className="form-control"
                                                            value={order.phone}
                                                        />
                                                    </div>
                                                </div>
                                                <h5 className="mb-2 mt-10 font-bold">Shipping Details</h5>
                                                <div className="col-lg-6 mt-4">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="form6Example2">Address</label>
                                                        <input
                                                            type="text"
                                                            readOnly
                                                            className="form-control"
                                                            value={order.address}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 mt-4">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="form6Example2">City</label>
                                                        <input
                                                            type="text"
                                                            readOnly
                                                            className="form-control"
                                                            value={order.city}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 mt-4">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="form6Example2">State / Province</label>
                                                        <input
                                                            type="text"
                                                            readOnly
                                                            className="form-control"
                                                            value = {order.province}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 mt-4">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="form6Example2">Country</label>
                                                        <input
                                                            type="text"
                                                            readOnly
                                                            className="form-control"
                                                            value={order.country}
                                                        />
                                                    </div>
                                                </div>
                                            </div>


                                            <h5 className="mb-4 mt-4">Billing address</h5>
                                            <div className="form-check mb-2">
                                                <input className="form-check-input me-2" type="checkbox" defaultValue="" id="form6Example8" defaultChecked="" />
                                                <label className="form-check-label" htmlFor="form6Example8">
                                                    Same as shipping address
                                                </label>
                                            </div>
                                        </form>
                                    </section>
                                    {/* Section: Biling details */}
                                </div>
                                <div className="col-lg-4 mb-4 mb-md-0">
                                    {/* Section: Order Summary */}
                                    <section className="shadow-4 p-4 rounded-5 mb-4">
                                        <h5 className="mb-3 font-bold">Order Summary</h5>
                                        <div className="d-flex justify-content-between">
                                            <span>Subtotal </span>
                                            <span>${order.sub_total}</span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span>Shipping </span>
                                            <span>${order.shipping_amount}</span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span>Tax </span>
                                            <span>${order.tax_fee}</span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span>Service Fee </span>
                                            <span>${order.service_fee}</span>
                                        </div>
                                        {order.saved !== "0.00" &&
                                        <div className="d-flex justify-content-between">
                                        <span>Discount </span>
                                        <span>-${order.saved}</span>
                                        </div>}
                                        <hr className="my-4" />
                                        <div className="d-flex justify-content-between fw-bold mb-5">
                                            <span>Total </span>
                                            <span>${order.total}</span>
                                        </div>

                                        <div className="shadow p-3 flex flex-col mt-4 mb-4">
                                            <h5 className="text-center mr-4 mb-4">Promotion</h5>
                                            <div className="flex flex-row">
                                                <input 
                                                value={couponCode} 
                                                name="couponCode" 
                                                type="text" 
                                                className='form-control' 
                                                style={{ border: "dashed 1px gray" }} 
                                                placeholder='Enter Coupon Code'
                                                onChange={(e)=>setCouponCode(e.target.value)}   
                                                id="couponCode" />
                                                    <button 
                                                    className='btn btn-success ms-1'
                                                    onClick={applyCoupon}>
                                                        Apply
                                                    </button>
                                            </div>
                                            
                                        </div>

                                        {paymentLoading=== false &&
                                            <form
                                            action={`${SERVER_URL}api/v1/stripe-checkout/${order?.oid}`}
                                            method='POST'>
                                                <button
                                                onClick={payWithStripe}
                                                type="submit" 
                                                className="btn btn-primary btn-rounded w-100 mt-2" 
                                                style={{ backgroundColor: "#635BFF" }}> 
                                                    <i className="fas fa-credit-card"></i> Pay with Stripe </button>
                                            </form>
                                        }
                                        {paymentLoading=== true &&
                                            <form
                                            action={`${SERVER_URL}api/v1/stripe-checkout/${order?.oid}`}>
                                                <button
                                                onClick={payWithStripe}
                                                disabled
                                                type="submit" 
                                                className="btn btn-primary btn-rounded w-100 mt-2" 
                                                style={{ backgroundColor: "#635BFF" }}> 
                                                    <i className="fas fa-spinner fa-spin"></i> Processing... </button>
                                            </form>
                                        }

                                        {order.total > 0 &&

                                        <PayPalScriptProvider options={initialOptions}>
                                            <PayPalButtons className='mt-3'
                                                createOrder={(data, actions) =>{
                                                    console.log('order: ', order);
                                                    return actions.order.create({
                                                        purchase_units: [
                                                            {
                                                                amount: {
                                                                    currency_code: "CAD",
                                                                    value: `${order?.total}`,
                                                                },
                                                            },
                                                        ],
                                                    });
                                                }}

                                                onApprove={(data, actions) =>{
                                                    return actions.order.capture().then((details) =>{
                                                        const name = details.payer.name.given_name;
                                                        const status = details.status;
                                                        const paypal_order_id = data.orderID;
                                                        console.log('name: ', name);
                                                        console.log('status: ', status);
                                                        console.log('paypal_order_id: ', paypal_order_id);

                                                        if(status === 'COMPLETED'){
                                                            navigate(`/payment-success/${order.oid}/?paypal_order_id=${paypal_order_id}`);
                                                        }
                                                    })
                                                }}/>
                                        </PayPalScriptProvider>
                                        }
                                    </section>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </main>
        </div>
  )
}

export default Checkout