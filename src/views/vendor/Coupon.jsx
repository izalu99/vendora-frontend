import {useState, useEffect} from "react"
import { Link } from "react-router-dom"

import Sidebar from "./Sidebar"
import apiInstance from '../../utils/axios'
import GetUserData from '../plugin/GetUserData'
import Swal from 'sweetalert2'

const Coupon = () => {
    const userData = GetUserData();
    const [couponStats, setCouponStats] = useState({})
    const [coupons, setCoupons] = useState([])
    const [createCoupons, setCreateCoupons] = useState({
        code: "",
        discount: "",
        active: true
    })

    const fetchCouponStats = async () =>{
        const response =  await apiInstance.get(`/vendor-coupon-stats/${userData?.vendor_id}/`)
        console.log('coupon stats: ', response.data)
        setCouponStats(response.data[0])
    }

    const fetchCoupons = async () =>{
        const response =  await apiInstance.get(`/vendor-coupon-list/${userData?.vendor_id}/`)
        console.log('coupons: ', response.data)
        setCoupons(response.data)
    }

    useEffect(() => {
        fetchCouponStats()
        fetchCoupons()
    }, [])

    const handleDeleteCoupon = async (couponId) => {
        await apiInstance.delete(`vendor-coupon-detail/${userData?.vendor_id}/${couponId}/`).then((res) => {
            console.log(res.data);
        })
        await fetchCouponStats();
        await fetchCoupons();

        Swal.fire({
            icon: 'success',
            title: 'Coupon Deleted',
        })

    }

    const handleCreateCouponChange = (event) => {
        setCreateCoupons({
            ...createCoupons,
            [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
        })
        console.log(createCoupons);
    }

    const handleCreateCoupon = async (e) => {
        e.preventDefault()
        const formdata = new FormData()

        formdata.append("vendor_id", userData?.vendor_id)
        formdata.append("code", createCoupons.code)
        formdata.append("discount", createCoupons.discount)
        formdata.append("active", createCoupons.active)

        await apiInstance.post(`vendor-coupon-create/${userData?.vendor_id}/`, formdata).then((res) => {
            console.log(res.data);
        })
        await fetchCouponStats();
        await fetchCoupons();
        Swal.fire({
            icon: 'success',
            title: 'Coupon Created',
        })


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
                            <i className="bi bi-tag fa-5x"></i>
                        </div>
                        <h6 className="text-uppercase">Total Coupons</h6>
                        <h1 className="display-1">{couponStats?.total_coupons}</h1>
                        </div>
                    </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-2">
                    <div className="card card-inverse card-danger">
                        <div className="card-block bg-danger p-3">
                        <div className="rotate">
                            <i className="bi bi-check-circle fa-5x"></i>
                        </div>
                        <h6 className="text-uppercase">Active Coupons</h6>
                        <h1 className="display-1">{couponStats?.active_coupons}</h1>
                        </div>
                    </div>
                    </div>
                </div>
                <hr />
                <div className="row container">
                    <div className="col-lg-12">
                    <h4 className="mt-3 mb-4">
                        <i className="bi bi-tag"></i> Coupons
                    </h4>
                    <table className="table">
                        <thead className="table-dark">
                        <tr>
                            <th scope="col">Code</th>
                            <th scope="col">Type</th>
                            <th scope="col">Discount</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            { coupons.length >=1 && coupons.map((coupon) => (
                            <tr key={coupon.id}>
                                <td>{coupon.code}</td>
                                <td>Percentage</td>
                                <td>{coupon.discount}%</td>
                                <td>{coupon.active === true ? 'Active' : 'In-Active'}</td>
                                <td>
                                <Link to={`/vendor/coupon/${coupon.id}`} className="btn btn-primary mb-1">
                                    <i className="fas fa-edit"></i>
                                </Link>
                                <button onClick={()=> handleDeleteCoupon(coupon.id)} className="btn btn-danger mb-1">
                                    <i className="fas fa-trash"></i>
                                </button>
                                </td>
                            </tr>
                        ))}
                        { coupons.length < 1 && (
                            <tr>
                                <td colSpan="7" className="text-center">No existing coupons.</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    </div>
                </div>
                {/* Create Coupon section */}
                <div className="row container">
                    <div className="col-md-9 col-lg-10">
                    <h4 className="mt-3 mb-4">
                        <i className="bi bi-tag"></i> Create Coupon
                    </h4>
                    <form onSubmit={handleCreateCoupon} className="card shadow p-3">
                        <div className="mb-3">
                        <label htmlFor="codeInput1" className="form-label">
                            Code
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="codeInput1"
                            aria-describedby="codeInputHelp"
                            name="code"
                            placeholder="Enter Coupon Code"
                            onChange={handleCreateCouponChange}
                            value={createCoupons.code}
                        />
                        <div id="codeInputHelp" className="form-text">
                            E.g <b>WELCOME10</b>
                        </div>
                        </div>
                        <div className="mb-3 mt-4">
                        <label htmlFor="discountInput" className="form-label">
                            Discount
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="discountInput"
                            name="discount"
                            placeholder="Enter Discount"
                            onChange={handleCreateCouponChange}
                            value={createCoupons.discount}
                            aria-describedby="discountInputHelp"
                        />
                        <div id="discountInputHelp" className="form-text">
                            NOTE: Discount is in <b>percentage</b>
                        </div>
                        </div>
                        <div className="mb-3 form-check">
                        <input
                            checked={createCoupons.active}
                            onChange={handleCreateCouponChange}
                            name="active"
                            type="checkbox"
                            className="form-check-input"
                            id="check1"
                        />
                        <label className="form-check-label" htmlFor="check1">
                            Activate Coupon
                        </label>
                        </div>
                        <div className="d-flex">
                        <button type="submit" className="btn btn-success ms-2">
                            Create Coupon <i className="fas fa-check-circle"></i>
                        </button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
            
        </div>
        
    </div>
  )
}

export default Coupon