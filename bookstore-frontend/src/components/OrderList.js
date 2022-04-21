import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import { Tag } from "primereact/tag";
import backend from "../redux/api";
import { useNavigate } from "react-router-dom";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentEmail = JSON.parse(sessionStorage.getItem("account"))?.email;
    backend.get(`/account-orders/${currentEmail}`)
    .then(res => {
      setOrders(res.data);
    })
    .catch(e => { console.log(e); });
  }, []);

  return (
  <>
    {orders.map(order => {
      return (
      <>
        <Card className="mb-4" key={order.id}>
          <div className="pb-2 px-3">
            <div className="row justify-content-between p-4 mx-2 mb-4">
              <div>
                <p className="p-text-secondary mb-0">Shipping info:</p>
                <p className="mb-0">{order.name}</p>
                <p className="mb-0">{order.address}</p>
                <p className="mb-0">{order.phone}</p>
              </div>

              <div>
                <p className="p-text-secondary mb-0">Order placed:</p>
                <p className="mb-0">
                  {new Date(order.dateCreated).toLocaleString("en-US", {day: "numeric", month: "short", year: "numeric"})}
                </p>
                <p className="p-text-secondary mb-0">Total price:</p>
                <p className="mb-0">${order.totalPrice}</p>
              </div>

              <div>
                <p className="p-text-secondary mb-0 mt-2 mt-sm-0">Status:</p>
                <Tag className="p-tag-fade-warning" value={order.orderStatus}></Tag>
              </div>
            </div>

            {order.bookOrders.map(bookOrder => {
              return (
              <div className="mb-4 mx-4">
                <div className="row align-items-center mx-2">
                  <div className="col-sm-7 col-12">
                    <div className="row align-items-center">
                      <img src={bookOrder.imageUrl} className="d-block mr-4" width="90" height="140" alt="" />
                      <div className="col-sm-6 col-12 m-0 p-0">
                        <h6 className="my-0 p-text-link mt-2 mt-sm-0" 
                        onClick={() => navigate(`/books/${bookOrder.bookId}`)}
                        style={{fontWeight: "500"}}>{bookOrder.title}</h6>
                        <p className="p-text-secondary">by {bookOrder.authorName}</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-3 col-12 m-0 p-0">
                    <p className="p-text-secondary mb-0">Qty:</p>
                    <p className="mt-0">{bookOrder.quantity}</p>
                  </div>

                  <div className="col-sm-2 col-12 m-0 p-0">
                      <p className="p-text-secondary my-0">Price:</p>
                      <p className="mt-0 mb-3">${bookOrder.unitPrice}</p>
                    </div>
                </div>
              </div>
              )
            })}
          </div>
        </Card>
      </>
      )
    })}
  </>
  );
}

export default OrderList;