import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import backend from "../redux/api";
import { useNavigate } from "react-router-dom";
import StatusTag from "./StatusTag";

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

  const onOpenPdf = (orderId) => {
    backend.get(`/account-orders/receipt/${orderId}`, {responseType: "arraybuffer"})
    .then((res) => {
      let file = new Blob([res.data], {type: "application/pdf"});
      const fileURL = URL.createObjectURL(file);
      if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(file, fileURL.split(":")[1] + ".pdf");
      } else {
        window.open(fileURL);
      }
    })
    .catch((e) => {
      console.log(e);
    });
  }

  return (
  <>
    {orders.map(order => {
      return (
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
              <StatusTag status={order.orderStatus} />
              { order.orderStatus === "COMPLETED" ?
                (<div className="d-block mt-2">
                  <Button className="p-button-sm p-button-fade p-button-secondary" 
                  label="Open receipt" onClick={() => onOpenPdf(order.id)} />
                </div>) : (<></>)
              }

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
      )
    })}
  </>
  );
}

export default OrderList;