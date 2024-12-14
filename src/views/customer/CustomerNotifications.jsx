import {useState, useEffect }from 'react'

import Sidebar from "./Sidebar"
import apiInstance from '../../utils/axios'
import GetUserData from '../plugin/GetUserData'

import Swal from 'sweetalert2'


const CustomerNotifications = () => {
  const [notifications, setNotifications] = useState([])
  const userData = GetUserData()

  const fetchNotifications =  async() => {
    await apiInstance.get(`customer/notification/${userData?.user_id}/`).then((res) => {
      //console.log(res.data)
      setNotifications(res.data)
    })
  }

  const markNotificationAsSeen = async(notificationId) => {
    //console.log('userId: ', userId)
    //console.log('notificationId: ', notificationId)
    await apiInstance.get(`customer/notification/${userData?.user_id}/${notificationId}/`)
    fetchNotifications()
    Swal.fire({
      icon: 'success',
      title: 'Notification marked as seen',
      showConfirmButton: false,
      timer: 1500
    })
  }

  useEffect(() => {
    fetchNotifications()
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
                <div className="container px-4">
                  <section className="">
                    <h3 className="mb-3">
                      <i className="fas fa-bell" /> Notifications{" "}
                    </h3>
                    <div className="list-group">
                      {notifications.length > 0 ? notifications.map((notification) => (
                      <a
                        href="#"
                        className="list-group-item list-group-item-action"
                        key={notification.id}>
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1">New Order (<b>#{notification.order?.oid}</b>) with a total of ${notification.order?.total}.</h5>
                          <small className="text-muted">{notification.date?.split('T')[0]}</small>
                        </div>
                        <p className="mb-1">
                          Order status: {notification.order?.order_status}
                        </p>
                        <p className="mb-1">
                          Payment status: {notification.order?.payment_status}
                        </p>
                        <button 
                        className='btn btn-success mt-3'
                        onClick={() => markNotificationAsSeen(notification.id)}>
                          <i className='fas fa-eye'>
                          </i>
                        </button>
                      </a>
                      )) : <h4>No Notifications</h4>}
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

export default CustomerNotifications