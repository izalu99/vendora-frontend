import {useState, useEffect }from 'react'
import apiInstance from '../../utils/axios'
import GetUserData from '../plugin/GetUserData'
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [profile, setProfile] = useState({})
    const userData = GetUserData()

    useEffect(() => {
        if (userData){
        apiInstance.get(`user/profile/${userData?.user_id}/`).then((res) => {
            //console.log(res.data)
            setProfile(res.data)
            
        })
        }
    }, [])


    useEffect(() => {
        console.log('profile: ', profile)
        //console.log(profile.user?.full_name)
        //console.log(profile.user?.username)
    },[profile])
    

    return (
        <div className="col-lg-3">
            <div className="d-flex justify-content-center align-items-center flex-column mb-4 shadow rounded-3">
                <img
                src={ profile.image || "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2220431045.jpg"}
                style={{ width: 120 }}
                alt=""
                />
                <div className="text-center">
                <h3 className="mb-0 text-2xl">{profile.user?.username}</h3>
                <p className="mt-0 font-medium">{profile.user?.email}</p>
                <p className="mt-0 text-blue-500">
                    <a href="">Edit Account</a>
                </p>
                </div>
            </div>
            <ol className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">
                    <Link to={'/customer/account/'} className="block px-4 py-2 hover:bg-gray-200" role="menuitem"><i className='fas fa-user'></i> Account</Link>
                    </div>
                </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">
                    <Link to={`/customer/orders/`} className="block px-4 py-2 hover:bg-gray-200"  role="menuitem"><i className='fas fa-shopping-cart'></i> Orders</Link>
                    </div>
                </div>
                <span className="badge bg-primary rounded-pill">14</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">
                    <Link to={`/customer/wishlist/`} className="block px-4 py-2 hover:bg-gray-200" role="menuitem"><i className='fas fa-heart'></i> Wishlist</Link>
                    </div>
                </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">
                    <Link to={`/customer/notifications/`} className="block px-4 py-2 hover:bg-gray-200" role="menuitem"><i className='fas fa-bell fa-shake'></i> Notifications</Link>
                    </div>
                </div>
                <span className="badge bg-primary rounded-pill">14</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">
                    <Link to={`/customer/settings/`} className="block px-4 py-2 hover:bg-gray-200" role="menuitem"><i className='fas fa-gear fa-spin'></i> Settings</Link>
                    </div>
                </div>
                </li>
            </ol>
        </div>
    )
}

export default Sidebar