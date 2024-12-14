import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from "./Sidebar";
import apiInstance from '../../utils/axios';
import GetUserData from '../plugin/GetUserData';

const Invoice = () => {
  const [order, setOrder] = useState({});
  const [orderItems, setOrderItems] = useState([]);

  const userData = GetUserData();
  const param = useParams();

  useEffect(() => {
    if (userData && param) {
      apiInstance.get(`customer/orders/${userData?.user_id}/${param.order_oid}`).then((res) => {
        console.log('order: ', res.data);
        console.log('param: ', param.order_oid);
        console.log('orderItems: ', res.data.order_item);
        setOrder(res.data);
        setOrderItems(res.data.order_item);
      });
    }
  }, [param]);

  return (
    <div className="container mx-auto mt-5 overflow-auto">
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <div className="p-2 flex-grow">
          <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-2/3 lg:w-1/2 mx-auto">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <>
                    <h5 className="text-lg font-bold">Vendor</h5>
                    {order.vendor?.map((ven) => (
                  <div key={ven.id} className="ml-4">
                    <p className="text-sm text-gray-600">
                        <i className="fa fa-user" /> {ven?.name || "Vendor"}
                    </p>
                    {ven?.phone && (
                      <p className="text-sm text-gray-600">
                        <i className="fa fa-phone" /> {ven.phone}
                      </p>
                    )}
                    {ven.user && (
                      <p className="text-sm text-gray-600">
                        <i className="fa fa-phone" /> {ven.user?.email}
                      </p>
                    )}
                  </div>
                    ))}
                </>
              </div>
              <div className="text-right">
                <h5 className="text-lg font-bold">Customer</h5>
                <p className="text-sm text-gray-600">
                  <i className="fa fa-user" /> {order?.full_name}
                </p>
                <p className="text-sm text-gray-600">
                  <i className="fa fa-envelope" /> {order?.email}
                </p>
                <p className="text-sm text-gray-600">
                  <i className="fa fa-phone" /> {order?.phone}
                </p>
                <h6 className="mt-2 text-sm font-bold">INVOICE ID #{order?.oid}</h6>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="table-auto w-full mb-4">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2">Product</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Qty</th>
                    <th className="px-4 py-2">Sub Total</th>
                    <th className="px-4 py-2">Discount</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((item) => (
                    <tr key={item.id}>
                      <td className="border px-4 py-2">{item.product?.title}</td>
                      <td className="border px-4 py-2">${item.price}</td>
                      <td className="border px-4 py-2">{item.qty || ''}</td>
                      <td className="border px-4 py-2">${item.sub_total}</td>
                      <td className="border px-4 py-2">${item.saved}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center mb-4">
              <div></div>
              <div className="text-right">
                <h5 className="text-lg font-bold">Summary</h5>
                <p className="text-sm text-gray-600 mb-2">
                  <b>Sub Total: </b>${order.sub_total}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <b>Shipping: </b>${order.shipping_amount}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <b>Tax: </b>${order.tax_fee}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <b>Service Fee: </b>${order.service_fee}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <b>Total: </b>${order.total}
                </p>
              </div>
            </div>
            <hr className="my-4" />
            <div className="flex justify-center">
              <button id="printButton" className="btn btn-dark">
                Print <i className="fas fa-print" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;