import {useState, useEffect }from 'react'

import Sidebar from "./Sidebar"
import apiInstance from '../../utils/axios'
import GetUserData from '../plugin/GetUserData'
import { Bar, Line } from 'react-chartjs-2'
import Chart from "chart.js/auto";
const Earning = () => {
    const userData = GetUserData()

    const [earningSummary, setEarningSummary] = useState({})
    const [monthlyEarning, setMonthlyEarning] = useState([])
    const [earningChartData, setEarningChartData] = useState([])

    const fetchEarningSummary = async () => {
        const response = await apiInstance.get(`vendor-earning/${userData?.vendor_id}`)
        console.log('earning summary: ',response.data[0])
        setEarningSummary(response.data[0])
    }

    const fetchMonthlyEarning = async () => {
        const response = await apiInstance.get(`vendor-monthly-earning/${userData?.vendor_id}`)
        console.log('monthly earning: ',response.data)
        setMonthlyEarning(response.data)
        setEarningChartData(response.data)
    }

    useEffect(() => {
        fetchEarningSummary()
        fetchMonthlyEarning()
    }, [])
    //console.log(monthlyEarning)

    const months = earningChartData.map(item => {
        if (item.month == 1) return 'January'
        if (item.month == 2) return 'February'
        if (item.month == 3) return 'March'
        if (item.month == 4) return 'April'
        if (item.month == 5) return 'May'
        if (item.month == 6) return 'June'
        if (item.month == 7) return 'July'
        if (item.month == 8) return 'August'
        if (item.month == 9) return 'September'
        if (item.month == 10) return 'October'
        if (item.month == 11) return 'November'
        if (item.month == 12) return 'December'
    })
    const sales = earningChartData.map(item => item.sales_count)
    const revenue = earningChartData.map(item => item.total_earning)

    const earning_data = {
        labels: months,
        datasets:[
            {
                label: 'Revenue',
                data: revenue,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
        ]
    }

    const sales_data = {
        labels: months,
        datasets:[
            {
                label: 'Sold Products',
                data: sales,
                backgroundColor: 'rgba(200, 100, 200, 0.2)',
                borderColor: 'rgba(254, 100, 200, 1)',
                borderWidth: 1
            },
        ]
    }



    return (
    <div className="container-fluid" id="main">
        <div className="row row-offcanvas row-offcanvas-left h-100">
            <Sidebar />
            <div className="col-md-9 col-lg-10 main mt-4">
            <div className="row mb-3">
                <div className="col-xl-6 col-lg-6 mb-2">
                <div className="card card-inverse card-success">
                    <div className="card-block bg-success p-3">
                    <div className="rotate">
                        <i className="bi bi-currency-dollar fa-5x" />
                    </div>
                    <h6 className="text-uppercase">Total Sales</h6>
                    <h1 className="display-1">${earningSummary?.total_revenue}</h1>
                    </div>
                </div>
                </div>
                <div className="col-xl-6 col-lg-6 mb-2">
                <div className="card card-inverse card-danger">
                    <div className="card-block bg-danger p-3">
                    <div className="rotate">
                        <i className="bi bi-currency-dollar fa-5x" />
                    </div>
                    <h6 className="text-uppercase">Monthly Earning</h6>
                    <h1 className="display-1">${earningSummary?.monthly_revenue}</h1>
                    </div>
                </div>
                </div>
            </div>
            <hr />
            <div className="row  container">
                <div className="col-lg-12">
                <h4 className="mt-3 mb-4">Revenue Tracker</h4>
                <table className="table">
                    <thead className="table-dark">
                    <tr>
                        <th scope="col">Month</th>
                        <th scope="col">Num of Orders</th>
                        <th scope="col">Revenue</th>
                    </tr>
                    </thead>
                    <tbody>
                    {monthlyEarning?.map((item, index) => (
                    <tr key={index}>
                        {item?.month == 1 && <th scope="row">January</th>}
                        {item?.month == 2 && <th scope="row">February</th>}
                        {item?.month == 3 && <th scope="row">March</th>}
                        {item?.month == 4 && <th scope="row">April</th>}
                        {item?.month == 5 && <th scope="row">May</th>}
                        {item?.month == 6 && <th scope="row">June</th>}
                        {item?.month == 7 && <th scope="row">July</th>}
                        {item?.month == 8 && <th scope="row">August</th>}
                        {item?.month == 9 && <th scope="row">September</th>}
                        {item?.month == 10 && <th scope="row">October</th>}
                        {item?.month == 11 && <th scope="row">November</th>}
                        {item?.month == 12 && <th scope="row">December</th>}
                        <td>{item?.sales_count}</td>
                        <td>${item?.total_earning}</td>
                    </tr>
                    ))}
                    </tbody>
                </table>
                </div>
                <div className="container">
                <div className="row ">
                    <div className="col">
                    <h4 className="mt-4">Revenue Analytics</h4>
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col-md-12 py-1">
                        <div className="card">
                            <div className="card-body">
                            <Line data={earning_data} />
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                            <Bar data={sales_data} />
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>

    )
}

export default Earning