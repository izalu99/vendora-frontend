
import {useState, useEffect} from "react"
import { Link } from "react-router-dom"

import Sidebar from "./Sidebar"
import apiInstance from '../../utils/axios'
import GetUserData from '../plugin/GetUserData'

const VendorOrders = () => {
    const userData = GetUserData()
    const [orders, setOrders] = useState([])

    const fetchOrders = async () => {
        const response = await apiInstance.get(`/vendor/orders/${userData?.vendor_id}`)
        console.log('order products: ',response.data)
        setOrders([...response.data])
    }

    const handleOrdersByFilter = async (filter) => {
        console.log('filter: ',filter)
        const response = await apiInstance.get(`/vendor/orders/filter/${userData?.vendor_id}/?filter=${filter}`)
        console.log('order products: ',response.data)
        setOrders([...response.data])
    }
    
    

    useEffect(() => {
        fetchOrders()
    }, [])

  return (
    <div className="container-fluid" id="main">
        <div className="row row-offcanvas row-offcanvas-left h-100">
            <Sidebar />
            <div className="col-md-9 col-lg-10 main mt-4 ">
            <h4>
                <i className="bi bi-cart-check-fill"> All Orders </i>
            </h4>
            <i className="bi bi-cart-check-fill">
                <div className="dropdown">
                <button
                    className="btn btn-secondary dropdown-toggle btn-sm mt-3 mb-4"
                    type="button"
                    id="dropdownMenuClickable"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close='false'
                    aria-expanded="false"
                >
                    Filter <i className="fas fa-sliders"></i>
                </button>
                <i className="fas fa-sliders">
                    <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuClickable"
                    >
                    <li>
                        <a href='#' className="dropdown-item" onClick={()=> handleOrdersByFilter('paid')}>
                        Payment Status: paid
                        </a>
                    </li>
                    <li>
                        <a href='#' className="dropdown-item" onClick={()=> handleOrdersByFilter('pending')}>
                        Payment Status: pending
                        </a>
                    </li>
                    <li>
                        <a href='#' className="dropdown-item" onClick={()=> handleOrdersByFilter('processing')}>
                        Payment Status: processing
                        </a>
                    </li>
                    <li>
                        <a href='#' className="dropdown-item" onClick={()=> handleOrdersByFilter('cancelled')}>
                        Payment Status: cancelled
                        </a>
                    </li>
                    <hr />
                    <li>
                        <a href='#' className="dropdown-item" onClick={()=> handleOrdersByFilter('latest')}>
                        Date: Latest
                        </a>
                    </li>
                    <li>
                        <a href='#' className="dropdown-item" onClick={()=> handleOrdersByFilter('oldest')}>
                        Date: Oldest
                        </a>
                    </li>
                    <hr />
                    <li>
                        <a href='#' className="dropdown-item" onClick={()=> handleOrdersByFilter('Pending')}>
                        Order Status: pending
                        </a>
                    </li>
                    <li>
                        <a href='#' className="dropdown-item" onClick={()=> handleOrdersByFilter('Fulfilled')}>
                        Order Status: fulfilled
                        </a>
                    </li>
                    <li>
                        <a href='#' className="dropdown-item" onClick={()=> handleOrdersByFilter('Cancelled')}>
                        Order Status: cancelled
                        </a>
                    </li>
                    </ul>
                </i>
                </div>
                <i className="fas fa-sliders">
                <table className="table">
                    <thead className="table-dark">
                    <tr>
                        <th scope="col">#Order ID</th>
                        <th scope="col">Total</th>
                        <th scope="col">Payment Status</th>
                        <th scope="col">Order Status</th>
                        <th scope="col">Delivery Status</th>
                        <th scope="col">Date</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                    <tr key={order?.id}>
                        <th scope="row">#{order?.oid}</th>
                        <td>${order?.total}</td>
                        <td>{order?.payment_status}</td>
                        <td>{order?.order_status}</td>
                        <td>Shipped</td>
                        <td>{order?.date.split('T')[0]}</td>
                        <td>
                            <Link to={`/vendor/orders/${order?.oid}/`} className="btn btn-primary mb-1">
                            <i className="fas fa-eye"></i>
                            </Link>
                        </td>
                    </tr>
                    ))}
                    </tbody>
                </table>
                </i>
            </i>
            </div>
            <i className="bi bi-cart-check-fill">
            <i className="fas fa-sliders"></i>
            </i>
        </div>
        <i className="bi bi-cart-check-fill">
            <i className="fas fa-sliders"></i>
        </i>
     </div>

  )
}

export default VendorOrders