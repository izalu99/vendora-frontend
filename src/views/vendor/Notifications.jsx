import {useState, useEffect} from "react"
import Sidebar from './Sidebar'
import apiInstance from '../../utils/axios'
import GetUserData from '../plugin/GetUserData'


const Notifications = () => {
    const userData = GetUserData();
    const [notifications, setNotifications] = useState([])
    const [notificationStats, setNotificationStats] = useState({})
    const [seenNotifications, setSeenNotifications] = useState([])
    
    const fetchUnseenNotifications = async () => {
        try {
            const response = await apiInstance.get(`vendor-notifications-unseen/${userData?.vendor_id}/`)
            setNotifications(response.data)
            //console.log('notifications: ', notifications)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
    }

    const fetchSeenNotifications = async () => {
        try {
          const response = await apiInstance.get(`vendor-notifications-seen/${userData?.vendor_id}/`)
          //console.log('unseen notifications: ', response.data)
          setSeenNotifications(response.data)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
    }

    const fetchNotificationStats = async () => {
        try {
            const response = await apiInstance.get(`vendor-notifications-summary/${userData?.vendor_id}/`)
            //console.log('notification stats: ', response.data)
            setNotificationStats(response.data[0])
        } catch (error) {
          console.error('Error fetching data:', error)
        }
    }

    useEffect(() => {
        fetchUnseenNotifications()
        fetchSeenNotifications()
        fetchNotificationStats()
    }, [userData?.vendor_id])





    const handleNotificationSeenStatus = async (notificationId) => {
        try {
          await apiInstance.get(`vendor-notifications-mark-as-seen/${userData?.vendor_id}/${notificationId}/`).then((res) => {
            //console.log('response: ', res.data)
            fetchUnseenNotifications()
            fetchSeenNotifications()
            fetchNotificationStats()
          })
          
        } catch (error) {
          console.error('Error fetching data:', error)
        }
    }



    return (
    <div className="container-fluid" id="main">
        <div className="row row-offcanvas row-offcanvas-left h-100">
            <Sidebar />
            <div className="col-md-9 col-lg-10 main mt-4">
            <div className="row mb-3">
                <div className="col-xl-4 col-lg-6 mb-2">
                <div className="card card-inverse card-success">
                    <div className="card-block bg-danger p-3">
                    <div className="rotate">
                        <i className="bi bi-tag fa-5x" />
                    </div>
                    <h6 className="text-uppercase">Un-read Notification</h6>
                    <h1 className="display-1">{notificationStats?.un_read_notification}</h1>
                    </div>
                </div>
                </div>
                <div className="col-xl-4 col-lg-6 mb-2">
                <div className="card card-inverse card-success">
                    <div className="card-block bg-success p-3">
                    <div className="rotate">
                        <i className="bi bi-tag fa-5x" />
                    </div>
                    <h6 className="text-uppercase">Read Notification</h6>
                    <h1 className="display-1">{notificationStats?.read_notification}</h1>
                    </div>
                </div>
                </div>
                <div className="col-xl-4 col-lg-6 mb-2">
                <div className="card card-inverse card-success">
                    <div className="card-block bg-primary p-3">
                    <div className="rotate">
                        <i className="bi bi-tag fa-5x" />
                    </div>
                    <h6 className="text-uppercase">All Notification</h6>
                    <h1 className="display-1">{notificationStats?.all_notification}</h1>
                    </div>
                </div>
                </div>
            </div>
            <hr />
            <div className="row  container">
                <div className="col-lg-12">
                <table className="table">
                    <thead className="table-dark">
                    <tr>
                        <th scope="col">Type</th>
                        <th scope="col">Message</th>
                        <th scope="col">Status</th>
                        <th scope="col">Date</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {notifications.length >= 1 && notifications.map((notification) => (
                    <tr key={notification.id}>
                        <td>
                            {
                            notification.order !== null && 
                            <p>New Order (Order ID: <b>{notification.order?.oid}</b>)</p>
                            }
                        </td>
                        <td>
                            {
                            notification.order_item !==null &&
                            <p>New Order for <b>{notification.order_item?.product?.title}</b>.</p>
                            }
                        </td>
                        <td>
                            {
                            notification.seen === true
                            ? <p>Read <i className='fas fa-eye'/></p>
                            : <p>Unread <i className='fas fa-eye-slash'/></p>
                            }
                        </td>
                        <td>{notification.date.split('T')[0]}</td>
                        <td>
                        {
                            notification.seen === true
                            ? <button disabled className='btn btn-success mb-1'>
                                <i className="fas fa-check"></i>
                            </button>
                            : <button onClick={()=> handleNotificationSeenStatus(notification.id)} className='btn btn-secondary mb-1'>
                                <i className="fas fa-eye"></i>
                            </button>
                        }
                        </td>
                    </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
            </div>
        </div>
    </div>

    )
}

export default Notifications