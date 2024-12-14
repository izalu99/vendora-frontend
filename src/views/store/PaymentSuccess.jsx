import apiInstance from "../../utils/axios"
import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { CartContext } from "../../views/plugin/Context"

const PaymentSuccess = () => {
    const [order, setOrder] = useState([])
    const [cartCount, setCartCount] = useContext(CartContext);
    const [status, setStatus] = useState("Verifying")
    const param = useParams()
    
    const urlParam = new URLSearchParams(window.location.search)
    const sessionId = urlParam.get('session_id')
    const paypal_order_id = urlParam.get('paypal_order_id')

    console.log(param?.order_oid)
    console.log(sessionId)
    console.log(paypal_order_id)
    
    useEffect(() => {
        apiInstance.get(`checkout/${param?.order_oid}`).then((res) => {
            console.log(res.data)
            setOrder(res.data)
        })
    }, [param?.order_oid])

    useEffect(() => {
        const formData = new FormData()
        formData.append('order_oid', param?.order_oid)
        formData.append('session_id', sessionId)
        formData.append('paypal_order_id', paypal_order_id)
        setStatus("Verifying")
        
        apiInstance.post(`payment-success/`, formData).then((res) => {
            console.log(res.data)
            if (res.data.message === "Payment successful") {
                setStatus("Payment Successful")
                setCartCount(0)
            }
            if (res.data.message === "Payment already paid") {
                setStatus("Already Paid")
                setCartCount(0)
            }
            if (res.data.message === "Unpaid") {
                setStatus("Unpaid")
            }
            if (res.data.message === "Payment cancelled") {
                setStatus("Payment Cancelled")
            }
            if (res.data.message === "Payment failed. Try again") {
                setStatus("Payment Failed")
            }
        })
    },[param?.order_oid, sessionId])

  return (
    <div>
      <main className="mb-4 mt-4 h-full">
        <div className="container mx-auto">
          {/* Section: Checkout form */}
          <section className="">
            <div className="grid gap-5">
              <div className="row">
                <div className="col-xl-12">
                  <div className="application_statics">
                    <div className="account_user_details dashboard_page">
                      <div className="flex justify-center items-center">
                        { status === "Verifying" && (
                        <div className="col-lg-12">
                          <div className="border-3 border-green-500" />
                          <div className="card bg-white shadow p-5">
                            <div className="mb-4 text-center">
                              <i
                                className="fas fa-check-circle text-green-500"
                                style={{ fontSize: 100 }}
                              />
                            </div>
                            <div className="text-center">
                              <h1>Payment Verifying <i className='fas fa-spinner fa-spin'></i></h1>
                              <p>
                                <b>Please wait while we verify your payment.</b>
                                <br />
                                <b className="text-danger">Please DO NOT RELOAD OR LEAVE the page while its verifying.</b>
                              </p>
                            </div>
                          </div>
                        </div>
                        )}
                        { status === "Payment Successful" && (
                            <div className="col-lg-12">
                                <div className="border-3 border-green-500" />
                                <div className="card bg-white shadow p-5">
                                <div className="mb-4 text-center">
                                    <i
                                    className="fas fa-check-circle text-green-500"
                                    style={{ fontSize: 100 }}
                                    />
                                </div>
                                <div className="text-center">
                                    <h1>Thank You!</h1>
                                    <p>
                                    Your checkout was successful, we have sent the
                                    order detail to your email <b>{order?.email}</b>. <br />
                                    Please note your order id <b>#{order?.oid}</b>.
                                    </p>
                                    <button
                                    className="btn btn-success mt-3"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    >
                                    View Order <i className="fas fa-eye" />{" "}
                                    </button>
                                    <a
                                    href="/"
                                    className="btn btn-primary mt-3 ms-2"
                                    >
                                    Download Invoice{" "}
                                    <i className="fas fa-file-invoice" />{" "}
                                    </a>
                                    <a
                                    className="btn btn-secondary mt-3 ms-2"
                                    >
                                    Go Home <i className="fas fa-arrow-left" />{" "}
                                    </a>
                                </div>
                                </div>
                            </div>
                        )}
                        { status === "Already Paid" && (
                            <div className="col-lg-12">
                                <div className="border-3 border-green-500" />
                                <div className="card bg-white shadow p-5">
                                <div className="mb-4 text-center">
                                    <i
                                    className="fas fa-check-circle text-green-500"
                                    style={{ fontSize: 100 }}
                                    />
                                </div>
                                <div className="text-center">
                                    <h1>You have already paid.</h1>
                                    <p>
                                    Please check your email(<b>{order?.email}</b>) for the order detail. <br />
                                    Note your order id is <b>#{order?.oid}</b>.
                                    </p>
                                    <button
                                    className="btn btn-success mt-3"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    >
                                    View Order <i className="fas fa-eye" />{" "}
                                    </button>
                                    <a
                                    href="/"
                                    className="btn btn-primary mt-3 ms-2"
                                    >
                                    Download Invoice{" "}
                                    <i className="fas fa-file-invoice" />{" "}
                                    </a>
                                    <a
                                    className="btn btn-secondary mt-3 ms-2"
                                    >
                                    Go Home <i className="fas fa-arrow-left" />{" "}
                                    </a>
                                </div>
                                </div>
                            </div>
                        )}
                        { status === "Payment Cancelled" && (
                            <div className="col-lg-12">
                                <div className="border-3 border-green-500" />
                                <div className="card bg-white shadow p-5">
                                <div className="mb-4 text-center">
                                    <i
                                    className="fas fa-exclamation-circle text-yellow-500"
                                    style={{ fontSize: 100 }}
                                    />
                                </div>
                                <div className="text-center">
                                    <h1>Your payment is cancelled.</h1>
                                    <a
                                    href="/"
                                    className="btn btn-primary mt-3 ms-2"
                                    >
                                    Back to Order{" "}
                                    <i className="fas fa-file-invoice" />{" "}
                                    </a>
                                    <a
                                    href="/"
                                    className="btn btn-secondary mt-3 ms-2"
                                    >
                                    Go Home <i className="fas fa-arrow-left" />{" "}
                                    </a>
                                </div>
                                </div>
                            </div>
                        )}
                        { status === "Payment Failed" && (
                            <div className="col-lg-12">
                                <div className="border-3 border-green-500" />
                                <div className="card bg-white shadow p-5">
                                <div className="mb-4 text-center">
                                    <i
                                    className="fas fa-times-circle text-red-500"
                                    style={{ fontSize: 100 }}
                                    />
                                </div>
                                <div className="text-center">
                                    <h1>Your payment is failed.</h1>
                                    <p className="text-danger">Please try again.</p>
                                    <a
                                    href="/"
                                    className="btn btn-primary mt-3 ms-2"
                                    >
                                    Back to Order{" "}
                                    <i className="fas fa-file-invoice" />{" "}
                                    </a>
                                    <a
                                    href="/"
                                    className="btn btn-secondary mt-3 ms-2"
                                    >
                                    Go Home <i className="fas fa-arrow-left" />{" "}
                                    </a>
                                </div>
                                </div>
                            </div>
                        )}
                        { status === "Unpaid" && (
                            <div className="col-lg-12">
                                <div className="border-3 border-green-500" />
                                <div className="card bg-white shadow p-5">
                                <div className="mb-4 text-center">
                                    <i
                                    className="fas fa-exclamation-circle text-yellow-500"
                                    style={{ fontSize: 100 }}
                                    />
                                </div>
                                <div className="text-center">
                                    <h1>Your order is unpaid.</h1>
                                    <p className="text-danger">Please try again.</p>
                                    <a
                                    href="/"
                                    className="btn btn-primary mt-3 ms-2"
                                    >
                                    Back to Order{" "}
                                    <i className="fas fa-file-invoice" />{" "}
                                    </a>
                                </div>
                                </div>
                            </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Order Summary
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="modal-body text-start text-black p-4">
                <h5
                  className="modal-title text-uppercase"
                  id="exampleModalLabel"
                >{order?.full_name}
                </h5>
                <h6>{order?.email}</h6>
                <h6>{order?.phone}</h6>
                <br />
                <h6 className="mb-5">{order?.address}, {order?.city}, <br /> {order?.province}, {order?.country}</h6>
                <p className="mb-0 text-blue-800">
                  Payment summary
                </p>
                <hr
                  className="mt-2 mb-4 border-t-2 border-dashed border-gray-400"
                />
                {order?.order_item?.map((item) => (
                    <div key={item.id} className="flex justify-between shadow p-2 rounded-md mb-2">
                    <p className="mb-0">{`${item.product?.title} (${item.qty})`}</p>
                    <p className="mb-0"></p>
                    <p className="mb-0">${item.price}</p>
                  </div>
                ))}
                <div className="flex justify-between">
                  <p className="font-bold mb-0">Subtotal</p>
                  <p className="text-gray-500 mb-0">${order?.sub_total}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm mb-0">Shipping Fee</p>
                  <p className="text-sm text-gray-500 mb-0">${order?.shipping_amount}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm mb-0">Service Fee</p>
                  <p className="text-sm text-gray-500 mb-0">${order?.service_fee}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm mb-0">Tax</p>
                  <p className="text-sm text-gray-500 mb-0">${order?.tax_fee}</p>
                </div>
                {order?.saved > 0 && (
                    <div className="flex justify-between">
                        <p className="text-sm mb-0">Discount</p>
                        <p className="text-sm text-gray-500 mb-0">-${order?.saved}</p>
                    </div>
                )}
                <div className="flex justify-between mt-4">
                  <p className="font-bold">Total</p>
                  <p className="font-bold text-blue-800">
                    ${order?.total}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess