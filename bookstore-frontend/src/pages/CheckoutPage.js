import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import backend from "../redux/api";

function CheckoutPage() {
  const cart = useSelector((state) => state.cartSlice.cart);
  const [account, setAccount] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setAccount(null);
    const email = JSON.parse(sessionStorage.getItem("account"))?.email;
    // TODO: validate email
    backend.get(`accounts/email/${email}`)
    .then((res) => {
      const accountData = res.data;
      setAccount({
        name: accountData.name,
        email: accountData.email,
        address: accountData.address,
        phone: accountData.phone,
      });
    })
    .catch(err => console.log(err));
  }, []);

  const getTotalCost = () => {
    return cart.reduce((prev, current) => prev + (current.unitPrice * current.quantity), 0);
  }

  if (!account) {
    return (<div>Loading...</div>)
  } else {
    return (
      <section>
        <div className="row">
          <div className="col-lg-8 col-12">
            <p className="p-text-secondary mb-0">Name:</p>
            <p className="mt-0 mb-3">{account.name}</p>
            <p className="p-text-secondary mb-0">Email:</p>
            <p className="mt-0 mb-3">{account.email}</p>
            <p className="p-text-secondary mb-0">Address:</p>
            <p className="mt-0 mb-3">{account.address}</p>
            <p className="p-text-secondary mb-0">Phone:</p>
            <p className="mt-0 mb-3">{account.phone}</p>
            <Button icon="pi pi-pencil" label="Edit profile" className="p-button-fade p-button-primary mt-1 mb-4"></Button>
          </div>
          <div className="col-lg-4 col-12">
            <Card className="mb-4">
              <div className="p-4">
                <h5>Order Summary</h5>
                {cart.length > 0 ?
                cart.map(cartItem => {
                return (
                  <div className="d-flex justify-content-between mb-1">
                    <span>{cartItem.title} (x{cartItem.quantity})</span>
                    <span className="m-0 p-0">${cartItem.unitPrice * cartItem.quantity}</span>
                  </div>
                )
                }) : (<></>)}
                <div className="d-flex justify-content-between mt-4">
                  <p>Total:</p>
                  <h4 className="m-0 p-0">${getTotalCost()}</h4>
                </div>
                <Button label="Confirm order" className="p-button-primary mt-4 w-100"></Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    );
  }


}

export default CheckoutPage;