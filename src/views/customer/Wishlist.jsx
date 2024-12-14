import {useState, useEffect }from 'react'

import Sidebar from "./Sidebar"
import apiInstance from '../../utils/axios'
import GetUserData from '../plugin/GetUserData'

import Swal from 'sweetalert2'


const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 1200,
    timerProgressBar: false,
})

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([])
  const userData = GetUserData()

  const handleAddToWishlist = async (event, productId, userId) => {
    event.preventDefault();
    console.log('Add to wishlist: ', productId);
    console.log('User ID: ', userId);

    const formData = new FormData();
    formData.append("product_id", productId);
    formData.append("user_id", userId);

    try{
        const response = await apiInstance.post(`customer/wishlist/${userId}/`, formData);
        //console.log('response: ', response.data);
        Toast.fire({
            icon: 'success',
            title: response.data.message
        })
        fetchWishlist()
    } catch(error){
        console.log('Error: ', error)
    }
}

  const fetchWishlist = async () => {
    await apiInstance.get(`customer/wishlist/${userData?.user_id}/`).then((res) => {
      console.log('wishlist: ',res.data)
      setWishlist(res.data)
    })
  }


  useEffect(() => {
    if (userData){
      fetchWishlist()
    }
  }, [])
  return (
    <main className="mt-5">
      <div className="container">
          <section className="">
              <div className="row">
                  <Sidebar />
                  <div className="col-lg-9 mt-1">
                      <section className="">
                          <main className="mb-5" style={{}}>
                              <div className="container">
                                  <section className="">
                                      <div className="row">
                                          <h3 className="mb-3">
                                              <i className="fas fa-heart text-danger" /> Wishlist
                                          </h3>
                                          {wishlist.length > 0 ? (
                                          <div className="col-lg-4 col-md-12 mb-4">
                                            {wishlist.map((item) => (
                                              <div key={item.id} className="card">
                                                  <div
                                                      className="bg-image hover-zoom ripple"
                                                      data-mdb-ripple-color="light">
                                                      <img
                                                          src={item.product?.image}
                                                          className="w-full h-48 object-cover"
                                                      />
                                                      <a href="#!">
                                                          <div className="mask">
                                                              <div className="d-flex justify-content-start align-items-end h-100">
                                                                  <h5>
                                                                      <span className="badge badge-primary ms-2">
                                                                          New
                                                                      </span>
                                                                  </h5>
                                                              </div>
                                                          </div>
                                                          <div className="hover-overlay">
                                                              <div
                                                                  className="mask"
                                                                  style={{
                                                                      backgroundColor: "rgba(251, 251, 251, 0.15)"
                                                                  }}
                                                              />
                                                          </div>
                                                      </a>
                                                  </div>
                                                  <div className="card-body">
                                                      <a href="" className="text-reset">
                                                          <h6 className="card-title mb-3 ">{item.product?.title}</h6>
                                                      </a>
                                                      <h6 className='mb-3'>{item.product?.category?.title}</h6>
                                                      <h6 className="mb-3">${item.product?.price}</h6>

                                                      <button 
                                                      type="button" 
                                                      className="btn btn-danger px-3 me-1 mb-1"
                                                      onClick={(e) => handleAddToWishlist(e, item.product?.id, userData?.user_id)}>
                                                          <i className="fas fa-heart" />
                                                      </button>
                                                  </div>
                                              </div>
                                            ))}
                                          </div>
                                          ) :
                                          <h6 className='container'>Your wishlist is Empty </h6>
                                          }
                                        


                                      </div>
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

export default Wishlist