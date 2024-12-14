import {useState, useEffect }from 'react'
import { Link } from 'react-router-dom'

import Sidebar from './Sidebar'
import apiInstance from '../../utils/axios'
import GetUserData from '../plugin/GetUserData'

import Swal from 'sweetalert2'


const Settings = () => {
    const userData = GetUserData();
    const [profile, setProfile] = useState({})
    const [vendorData, setVendorData] = useState({})

    const fetchVendorProfile = async() => {
        await apiInstance.get(`vendor-profile-update/${userData?.user_id}/`).then((res) => {
            console.log('profile:', res.data)
            setProfile(res.data)
        }).catch((error) => {
            console.log('Error fetching vendor profile:', error)
        })
    }


    const fetchVendorData = async() => {
        await apiInstance.get(`vendor-shop-update/${userData?.vendor_id}/`).then((res) => {
            console.log('vendor:', res.data)
            setVendorData(res.data)
        }).catch((error) => {
            console.log('Error fetching vendor:', error)
        })
    }

    

    useEffect(() => {
        if(userData){
            fetchVendorProfile()
            fetchVendorData()
        }
    }, [])

    const handleInputChange = (event) => {
        event.preventDefault();
        setProfile({
          ...profile,
          [event.target.name]: event.target.value
        })
        console.log("changed vendor profile:", profile)
    }
    
    const handleImageChange = (event) => {
    event.preventDefault();
    setProfile({
        ...profile,
        [event.target.name]: event.target.files[0]
    })
    console.log("changed vendor profile image:", profile)
    }
    
    const handleFormSubmit = async(event) => {
    event.preventDefault();
    const formData = new FormData();
    const res = await apiInstance.get(`vendor-profile-update/${userData?.user_id}/`)
    if (profile.image && profile.image !== res.data.image){
        formData.append('image', profile.image)
    }
    
    formData.append('full_name', profile.full_name)
    formData.append('address', profile.address)
    formData.append('city', profile.city)
    formData.append('province', profile.province)
    formData.append('country', profile.country)
    formData.append('about', profile.about)

    try{
        await apiInstance.patch(`vendor-profile-update/${userData?.user_id}/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        })
        Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Profile updated successfully',
        })
    }catch(error){
        console.log("Error updating vendor profile:", error)
    }
    }


    const handleShopInputChange = (event) => {
    event.preventDefault();
    setVendorData({
        ...vendorData,
        [event.target.name]: event.target.value
    })
    console.log("changed vendor data:", vendorData)
    }

    const handleShopImageChange = (event) => {
        event.preventDefault();
        setVendorData({
            ...vendorData,
            [event.target.name]: event.target.files[0]
        })
        console.log("changed vendor data image:", vendorData)
    }
    
    
    const handleShopFormSubmit = async(event) => {
        event.preventDefault();
        const formData = new FormData();
        const res = await apiInstance.get(`vendor-shop-update/${userData?.vendor_id}/`)
        if (vendorData.image && vendorData.image !== res.data.image){
            formData.append('image', vendorData.image)
        }
        
        formData.append('name', vendorData.name)
        formData.append('description', vendorData.description)
        formData.append('phone', vendorData.phone)
    
        try{
            await apiInstance.patch(`vendor-shop-update/${userData?.vendor_id}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
            })
            Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Shop updated successfully',
            })
        }catch(error){
            console.log("Error updating vendor shop:", error)
        }
    }


    return (
    <div className="container-fluid" id="main">
        <div className="row row-offcanvas row-offcanvas-left h-100">
            <Sidebar />
            <div className="col-md-9 col-lg-10 main mt-4">
            <div className="container">
                <div className="main-body">
                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                        Profile
                    </button>
                    </li>
                    <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
                        Shop
                    </button>
                    </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                    <div
                    className="tab-pane fade show active"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                    >
                    <div className="row gutters-sm shadow p-4 rounded">
                        <div className="col-md-4 mb-3">
                        <div className="card h-100">
                            <div className="card-body">
                            <div className="d-flex flex-column align-items-center text-center">
                                <img
                                src={profile?.image}
                                style={{ width: 160, height: 160, objectFit: "cover" }}
                                alt="Admin"
                                className="rounded-circle"
                                width={150}
                                />
                                <div className="mt-3">
                                <h4 className="text-dark">{profile?.full_name}</h4>
                                <p className="text-secondary mb-1"></p>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="col-md-8">
                        <div className="card mb-3">
                            <div className="card-body">
                            <form
                                className="form-group"
                                onSubmit={(e)=> handleFormSubmit(e)}
                                encType="multipart/form-data"
                            >
                                <div className="row text-dark">
                                <div className="col-lg-6 mb-2">
                                    <label htmlFor="image" className="mb-2">
                                    Profile Image
                                    </label>
                                    <input
                                    type="file"
                                    className="form-control"
                                    name="image"
                                    id="image"
                                    onChange={handleImageChange}
                                    />
                                </div>
                                <div className="col-lg-6 mb-2 ">
                                    <label htmlFor="full_name" className="mb-2">
                                    Full Name
                                    </label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    name="full_name"
                                    id="full_name"
                                    value={profile?.full_name || ''}
                                    onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-lg-6 mb-2">
                                    <label htmlFor="email" className="mb-2">
                                    Email
                                    </label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    id="email"
                                    value={profile?.user?.email || ''}
                                    readOnly={true}
                                    />
                                </div>
                                <div className="col-lg-6 mb-2">
                                    <label htmlFor="phone" className="mb-2">
                                    Phone
                                    </label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    id="phone"
                                    value={profile.user?.phone || ''}
                                    readOnly={true}
                                    />
                                </div>
                                <div className="col-lg-6 mb-2">
                                    <label
                                    htmlFor="address"
                                    className="form-label">
                                    Address
                                    </label>
                                    <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    className="form-control"
                                    aria-describedby="addressHelp"
                                    value={profile.address || ''}
                                    onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-lg-6 mb-2">
                                    <label
                                    htmlFor="city"
                                    className="form-label">
                                    City
                                    </label>
                                    <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    className="form-control"
                                    aria-describedby="cityHelp"
                                    value={profile.city || ' '}
                                    onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-lg-6 mb-2">
                                    <label
                                    htmlFor="province"
                                    className="form-label">
                                    Province
                                    </label>
                                    <input
                                    type="text"
                                    id="province"
                                    name="province"
                                    className="form-control"
                                    aria-describedby="provinceHelp"
                                    value={profile.province || ' '}
                                    onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-lg-6 mb-2">
                                    <label
                                    htmlFor="country"
                                    className="form-label">
                                    Country
                                    </label>
                                    <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    className="form-control"
                                    aria-describedby="countryHelp"
                                    value={profile.country || ' '}
                                    onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-lg-12 mt-2 mb-2">
                                    <label htmlFor="about" className="mb-2">
                                    About Me
                                    </label>
                                    <textarea
                                    rows="5"
                                    type="text"
                                    className="form-control"
                                    name="about"
                                    id="about"
                                    aria-describedby="aboutHelp"
                                    value = {profile?.about || ''}
                                    onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-lg-6 mt-4 mb-3">
                                    <button className="btn btn-success" type="submit">
                                    Update Profile <i className="fas fa-check-circle" />{" "}
                                    </button>
                                </div>
                                </div>
                            </form>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div
                    className="tab-pane fade"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                    >
                    <div className="row gutters-sm shadow p-4 rounded">
                        <div className="col-md-4 mb-3">
                        <div className="card h-100">
                            <div className="card-body">
                            <div className="d-flex flex-column align-items-center text-center">
                                <img
                                src={vendorData?.image}
                                style={{ width: 160, height: 160, objectFit: "cover" }}
                                alt="Admin"
                                className="rounded-circle"
                                width={150}
                                />
                                <div className="mt-3">
                                <h4 className="text-dark">{vendorData?.name}</h4>
                                <p className="text-secondary mb-1">{vendorData?.description || ''}</p>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="col-md-8">
                        <div className="card mb-3">
                            <div className="card-body">
                            <form
                                className="form-group"
                                encType="multipart/form-data"
                                onSubmit={(e)=> handleShopFormSubmit(e)}
                            >
                                <div className="row text-dark">
                                <div className="col-lg-12 mb-2">
                                    <label htmlFor="image" className="mb-2">
                                    Shop Image
                                    </label>
                                    <input
                                    type="file"
                                    className="form-control"
                                    name="image"
                                    id="image"
                                    onChange={handleShopImageChange}
                                    />
                                </div>
                                <div className="col-lg-12 mb-2 ">
                                    <label htmlFor="name" className="mb-2">
                                    Shop Name
                                    </label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    id="name"
                                    value={vendorData?.name || ''}
                                    onChange={handleShopInputChange}
                                    />
                                </div>
                                <div className="col-lg-6 mb-2">
                                    <label htmlFor="email" className="mb-2">
                                    Email
                                    </label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    id="email"
                                    value={vendorData?.email || ''}
                                    />
                                </div>
                                <div className="col-lg-6 mb-2">
                                    <label htmlFor="phone" className="mb-2">
                                    Phone Number
                                    </label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    id="phone"
                                    value={vendorData?.phone || ''}
                                    onChange={handleShopInputChange}
                                    />
                                </div>
                                <div className="col-lg-12 mb-2 mt-2">
                                    <label htmlFor="description" className="mb-2">
                                    Shop description
                                    </label>
                                    <textarea
                                    rows="5"
                                    type="text"
                                    className="form-control"
                                    name="description"
                                    id="description"
                                    value={vendorData?.description || ''}
                                    onChange={handleShopInputChange}
                                    />
                                </div>
                                <div className="col-lg-6 mt-4 mb-3 d-flex">
                                    <button className="btn btn-success" type="submit">
                                    Update Shop <i className="fas fa-check-circle" />{" "}
                                    </button>
                                    <Link to={`/vendor/${vendorData.slug}/`} className="btn btn-primary ms-2" type="submit">
                                    View Shop <i className="fas fa-shop" />{" "}
                                    </Link>
                                </div>
                                </div>
                            </form>
                            </div>
                        </div>
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

export default Settings