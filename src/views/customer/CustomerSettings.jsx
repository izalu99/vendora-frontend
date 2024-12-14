import {useState, useEffect }from 'react'

import Sidebar from "./Sidebar"
import apiInstance from '../../utils/axios'
import GetUserData from '../plugin/GetUserData'

import Swal from 'sweetalert2'

const CustomerSettings = () => {
  const userData = GetUserData();
  const [profile, setProfile] = useState({})

  const fetchProfile = async() => {
    await apiInstance.get(`user/profile/${userData?.user_id}/`).then((res) => {
      console.log('profile:', res.data)
      setProfile(res.data)
    }).catch((error) => {
      console.log('Error fetching profile:', error)
    })
  }

  useEffect(() => {
    if(userData){
      fetchProfile()
    }
  }, [])

  const handleInputChange = (event) => {
    event.preventDefault();
    setProfile({
      ...profile,
      [event.target.name]: event.target.value
    })
    console.log("changed profile:", profile)
  }

  const handleImageChange = (event) => {
    event.preventDefault();
    setProfile({
      ...profile,
      [event.target.name]: event.target.files[0]
    })
    console.log("changed profile:", profile)
  }

  const handleFormSubmit = async(event) => {
    event.preventDefault();
    //console.log("profile updated")
    const formData = new FormData();
    const res = await apiInstance.get(`user/profile/${userData?.user_id}/`)
    if (profile.image && profile.image !== res.data.image){
      formData.append('image', profile.image)
    }
    formData.append('full_name', profile.full_name)
    formData.append('address', profile.address)
    formData.append('city', profile.city)
    formData.append('province', profile.province)
    formData.append('country', profile.country)

    try{
      await apiInstance.patch(`user/profile/${userData?.user_id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      //window.location.reload()
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Profile updated successfully',
      })
    }catch(error){
      console.log("Error updating profile:", error)
    }
  }

 

  return (
    <main className="mt-5">
      <div className="container">
        <section className="">
          <div className="row">
            <Sidebar />
            <div className="col-lg-9 mt-1">
              <section className="">
                <main className="mb-5" style={{}}>
                  <div className="container px-4">
                    <section className="">
                      <h3 className="mb-3">
                        {" "}
                        <i className="fas fa-gear fa-spin" /> Settings{" "}
                      </h3>
                      <form 
                      encType="multipart/form-data"
                      onSubmit={(e)=> handleFormSubmit(e)}>
                        <div className="row">
                          <div className="col-lg-12 mb-3">
                            <label
                              htmlFor="image"
                              className="form-label">
                              Profile Image
                            </label>
                            <input
                              type="file"
                              id="image"
                              name="image"
                              className="form-control"
                              aria-describedby=""
                              onChange={handleImageChange}
                            />
                          </div>
                          <div className="col-lg-12">
                            <label
                              htmlFor="full_name"
                              className="form-label">
                              Full Name
                            </label>
                            <input
                              type="text"
                              id="full_name"
                              name="full_name"
                              className="form-control"
                              aria-describedby="emailHelp"
                              value={profile.full_name || ''}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="col-lg-6 mt-3">
                            <label
                              htmlFor="email"
                              className="form-label">
                              Email address
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              className="form-control"
                              aria-describedby="emailHelp"
                              value={profile.user?.email || ''}
                              readOnly={true}
                            />
                          </div>
                          <div className="col-lg-6 mt-3">
                            <label
                              htmlFor="phone"
                              className="form-label">
                              Phone
                            </label>
                            <input
                              type="text"
                              id="phone"
                              name="phone"
                              className="form-control"
                              aria-describedby="phoneHelp"
                              value={profile.user?.phone || ''}
                              readOnly={true}
                            />
                          </div>
                        </div>
                        <br />
                        <div className="row">
                          <div className="col-lg-6">
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
                          <div className="col-lg-6">
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
                          <div className="col-lg-6 mt-3">
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
                          <div className="col-lg-6 mt-3">
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
                        </div>
                        <button type="submit" className="btn btn-primary mt-5">
                          Save Changes
                        </button>
                      </form>
                    </section>
                  </div>
                </main>
              </section>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default CustomerSettings