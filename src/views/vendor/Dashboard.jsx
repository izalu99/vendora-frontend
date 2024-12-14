import {useState, useEffect} from "react"
import { Link } from "react-router-dom"

import Sidebar from "./Sidebar"
import apiInstance from '../../utils/axios'
import GetUserData from '../plugin/GetUserData'

import { Bar } from 'react-chartjs-2'
import Chart from "chart.js/auto";

const Dashboard = () => {
  const userData = GetUserData()
  console.log('user data',userData)
  const [stats, setStats] = useState(null)
  const [orderChartData, setOrderChartData] = useState(null)
  const [productChartData, setProductChartData] = useState(null)
  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    const response = await apiInstance.get(`/vendor/products/${userData?.vendor_id}`)
    console.log('vendor products: ',response.data)
    setProducts([...response.data])
  }

  const fetchVendorStats = async () => {
    const response = await apiInstance.get(`/vendor/stats/${userData?.vendor_id}`)
    console.log('vendor stats: ',response.data[0])
    setStats(response.data[0])
    console.log('stats products: ', stats?.products)
  }

  useEffect(() => {
    fetchVendorStats()
    fetchProducts()
  }, [])

  const fetchOrderChartData = async () => {
    const order_response = await apiInstance.get(`/vendor-orders-chart/${userData?.vendor_id}`)
    console.log('order_response: ', order_response.data)
    setOrderChartData(order_response.data)
  }

  const fetchProductChartData = async () => {
    const product_response = await apiInstance.get(`/vendor-products-chart/${userData?.vendor_id}`)
    console.log('product response: ', product_response.data)
    setProductChartData(product_response.data)
  }

  useEffect(() => {
    fetchOrderChartData()
    fetchProductChartData()
    
  }, [])

  const order_months = orderChartData?.map(item => item.month);
  const order_counts = orderChartData?.map(item => item.orders);

  const product_months = productChartData?.map(item => item.month);
  const product_counts = productChartData?.map(item => item.products);
  console.log('product_months: ', product_months)
  console.log('product_counts: ', product_counts)

  const order_data = {
    labels: order_months,
    datasets: [
      {
        label: 'Total Orders',
        data: order_counts,
        fill: true,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(75, 192, 192,1)',
        tension: 0.1
      },
    ]
  }

  const product_data = {
    labels: product_months,
    datasets: [
      {
        label: 'Total Products',
        data: product_counts,
        fill: true,
        backgroundColor: 'rgb(255, 99, 13)',
        borderColor: 'rgb(75, 192, 192,1)',
        tension: 0.1
      }
    ]
  }

  //console.log('order_data: ', order_data)
  //console.log('product_data: ', product_data)

  return (
    <div className="container-fluid" id="main">
      <div className="row row-offcanvas row-offcanvas-left h-100">
        <Sidebar />        
        <div className="col-md-9 col-lg-10 main mt-4">
          <div className="row mb-3">
            <div className="col-xl-3 col-lg-6 mb-2">
              <div className="card card-inverse card-success">
                <div className="card-block bg-success p-3">
                  <div className="rotate">
                    <i className="bi bi-grid fa-5x" />
                  </div>
                  <h6 className="text-uppercase">Products</h6>
                  <h1 className="display-1">{stats?.products || 0}</h1>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 mb-2">
              <div className="card card-inverse card-danger">
                <div className="card-block bg-danger p-3">
                  <div className="rotate">
                    <i className="bi bi-cart-check fa-5x" />
                  </div>
                  <h6 className="text-uppercase">Orders</h6>
                  <h1 className="display-1">{stats?.orders || 0}</h1>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 mb-2">
              <div className="card card-inverse card-info">
                <div className="card-block bg-info p-3">
                  <div className="rotate">
                    <i className="bi bi-people fa-5x" />
                  </div>
                  <h6 className="text-uppercase">Customers</h6>
                  <h1 className="display-1"></h1>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 mb-2">
              <div className="card card-inverse card-warning">
                <div className="card-block bg-warning p-3">
                  <div className="rotate">
                    <i className="bi bi-currency-dollar fa-5x" />
                  </div>
                  <h6 className="text-uppercase">Revenue</h6>
                  <h1 className="display-1">${stats?.revenue || 0}</h1>
                </div>
              </div>
            </div>
          </div>
          {/*/row*/}
          <hr />
          <div className="container">
            <div className="row my-3">
              <div className="col">
                <h4>Chart Analytics</h4>
              </div>
            </div>
            <div className="row my-2">
              <div className="col-lg-6 py-1">
                <div className="card">
                  <div className="card-body">
                    <Bar data={order_data} style={{ height: 300}}/>
                  </div>
                </div>
              </div>
              <div className="col-md-6 py-1">
                    <div className="card">
                        <div className="card-body">
                            <Bar data={product_data} style={{ height: 300}}/>
                        </div>
                    </div>
              </div>
            </div>
          </div>
          <a id="layouts" />
          <hr />
          <div className="row mb-3 container">
            <div className="col-lg-12" style={{ marginBottom: 100 }}>
              {/* Nav tabs */}
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    href="#products"
                    role="tab"
                    data-toggle="tab"
                  >
                    Products
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#orders"
                    role="tab"
                    data-toggle="tab"
                  >
                    Orders
                  </a>
                </li>
              </ul>
              {/* Tab panes */}
              <div className="tab-content">
                <br />
                <div role="tabpanel" className="tab-pane active" id="#products">
                  <h4>Products</h4>
                  <table className="table">
                    <thead className="table-dark">
                      <tr>
                        <th scope="col">#ID</th>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Stock Quantity</th>
                        <th scope="col">Orders</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product.id}>
                          <th scope="row">#{product.id}</th>
                          <td>
                            <img
                              src={product.image}
                              alt={product.title}
                              style={{ width: 50, height: 50 }}
                            />
                          </td>
                          <td>{product.title}</td>
                          <td>${product.price}</td>
                          <td>{product.stock_qty}</td>
                          <td>{product.orders}</td>
                          <td>{product.status?.toUpperCase()}</td>
                          <td>
                            <Link href="" className="btn btn-primary mb-1 me-1">
                              <i className="fas fa-eye" />
                            </Link>
                            <Link href="" className="btn btn-success mb-1 me-1">
                              <i className="fas fa-edit" />
                            </Link>
                            <Link href="" className="btn btn-danger mb-1 me-1">
                              <i className="fas fa-trash" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div role="tabpanel" className="tab-pane" id="#orders">
                  <h4>Orders</h4>
                  <table className="table">
                    <thead className="table-dark">
                      <tr>
                        <th scope="col">#Order ID</th>
                        <th scope="col">Total</th>
                        <th scope="col">Payment Status</th>
                        <th scope="col">Delivery Status</th>
                        <th scope="col">Date</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">#trytrr</th>
                        <td>$100.90</td>
                        <td>Paid</td>
                        <td>Shipped</td>
                        <td>20th June, 2023</td>
                        <td>
                          <a href="" className="btn btn-primary mb-1">
                            <i className="fas fa-eye" />
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard