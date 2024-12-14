import {useState, useEffect }from 'react'
import { useParams } from 'react-router-dom'

import Sidebar from "./Sidebar"
import apiInstance from '../../utils/axios'
import GetUserData from '../plugin/GetUserData'

const OrderDetail = () => {
    const [order, setOrder] = useState({})
    const [orderItems, setOrderItems] = useState([])

    const userData = GetUserData()
    const param = useParams()
    //console.log('param: ', param)

    useEffect(() => {
        apiInstance.get(`customer/orders/${userData?.user_id}/${param?.order_id}`).then((res) => {
            console.log('order: ',res.data)
            console.log('param: ', param?.order_id)
            console.log('orderItems: ', res.data.order_item)
            setOrder(res.data)
            setOrderItems(res.data.order_item)
        })
        
    },[param])

    return (
    <main className="mt-5">
        <div className="container">
            <section className="">
            <div className="row">
                {/* Sidebar*/}
                <Sidebar />
                <div className="col-lg-9 mt-1">
                <main className="mb-5">
                    {/* Container for demo purpose */}
                    <div className="container px-4">
                    {/* Section: Summary */}
                    {order && (
                    <section className="mb-5">
                        <h3 className="mb-3">
                        {" "}
                        <i className="fas fa-shopping-cart text-primary" /> #{order.oid}
                        </h3>
                        <div className="row gx-xl-5">
                        <div className="col-lg-3 mb-4 mb-lg-0">
                            <div
                            className="rounded shadow"
                            style={{ backgroundColor: "#B2DFDB" }}
                            >
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                <div className="">
                                    <p className="mb-1 font-bold">Total</p>
                                    <h2 className="mb-0 font-bold">
                                    ${order.total}
                                    <span
                                        className=""
                                        style={{ fontSize: "0.875rem" }}
                                    ></span>
                                    </h2>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="col-lg-3 mb-4 mb-lg-0">
                            <div
                            className="rounded shadow"
                            style={{ backgroundColor: "#D1C4E9" }}
                            >
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                <div className="">
                                    <p className="mb-1 font-bold">Payment Status</p>
                                    <h2 className="mb-0">
                                    {order.payment_status}
                                    <span
                                        className=""
                                        style={{ fontSize: "0.875rem" }}
                                    ></span>
                                    </h2>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="col-lg-3 mb-4 mb-lg-0">
                            <div
                            className="rounded shadow"
                            style={{ backgroundColor: "#BBDEFB" }}
                            >
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                <div className="">
                                    <p className="mb-1 font-bold">Order Status</p>
                                    <h2 className="mb-0">
                                    {order.order_status}
                                    <span
                                        className=""
                                        style={{ fontSize: "0.875rem" }}
                                    ></span>
                                    </h2>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="col-lg-3 mb-4 mb-lg-0">
                            <div
                            className="rounded shadow"
                            style={{ backgroundColor: "#bbfbeb" }}
                            >
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                <div className="">
                                    <p className="mb-1 font-bold">Shipping Amount</p>
                                    <h2 className="mb-0">
                                    ${order.shipping_amount}
                                    <span
                                        className=""
                                        style={{ fontSize: "0.875rem" }}
                                    ></span>
                                    </h2>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4 mb-lg-0 mt-5">
                            <div
                            className="rounded shadow"
                            style={{ backgroundColor: "#bbf7fb" }}
                            >
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                <div className="">
                                    <p className="mb-1 font-bold">Tax Fee</p>
                                    <h2 className="mb-0">
                                    ${order.tax_fee}
                                    <span
                                        className=""
                                        style={{ fontSize: "0.875rem" }}
                                    ></span>
                                    </h2>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4 mb-lg-0 mt-5">
                            <div
                            className="rounded shadow"
                            style={{ backgroundColor: "#eebbfb" }}
                            >
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                <div className="">
                                    <p className="mb-1 font-bold">Service Fee</p>
                                    <h2 className="mb-0">
                                    ${order.service_fee}
                                    <span
                                        className=""
                                        style={{ fontSize: "0.875rem" }}
                                    ></span>
                                    </h2>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        {order.saved > 0 && (
                        <div className="col-lg-4 mb-4 mb-lg-0 mt-5">
                                <div
                                className="rounded shadow"
                                style={{ backgroundColor: "#bbc5fb" }}>
                                    <div className="card-body">
                                        <div className="d-flex align-items-center">
                                            <div className="">
                                                <p className="mb-1 font-bold">Discount Fee</p>
                                                <h2 className="mb-0 text-danger font-bold">
                                                    - ${order.saved}
                                                    <span
                                                        className=""
                                                        style={{ fontSize: "0.875rem" }}
                                                    ></span>
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        )}
                        </div>
                    </section>
                    )}
                    {/* Section: Summary */}
                    {/* Section: MSC */}
                    <section className="">
                        <div className="row rounded shadow p-3">
                        <div className="col-lg-12 mb-4 mb-lg-0">
                            <table className="table align-middle mb-0 bg-white">
                            <thead className="bg-light">
                                <tr>
                                <th>Product</th>
                                <th>Date</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Discount</th>
                                <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderItems?.map((item) => (
                                <tr key={item.id}>
                                <td>
                                    <div className="d-flex align-items-center">
                                    <img
                                        src={item.product.image}
                                        style={{ width: 80 }}
                                        alt=""
                                    />
                                    </div>
                                    <p className="fw-normal mb-1">{item.product.title}</p>

                                </td>
                                <td>
                                    <p className="text-muted mb-0">{item.date.split('T')[0]}</p>
                                </td>
                                <td>
                                    <p className="fw-normal mb-1">${item.price}</p>
                                </td>
                                <td>
                                    <p className="fw-normal mb-1">{item.qty}</p>
                                </td>
                                <td>
                                    <span className="fw-normal mb-1 text-danger">- ${item.saved}</span>
                                </td>
                                <td>
                                    <span className="fw-normal mb-1">${item.sub_total}</span>
                                </td>
                                </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                        </div>
                    </section>
                    </div>
                </main>
                </div>
            </div>
            </section>
            {/*Section: Wishlist*/}
        </div>
    </main>
  )
}

export default OrderDetail