import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import backend from "../redux/api";
import { useDispatch } from "react-redux";
import { reset } from "../redux/actions/cartActions";
import { Dialog } from "primereact/dialog";
import ShippingForm from "../components/ShippingForm";
import Spinner from "../components/Spinner";

function CheckoutPage() {
  const cart = useSelector((state) => state.cartSlice.cart);
  const [account, setAccount] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [displayShippingForm, setDisplayShippingForm] = useState(false);

  const dialogFuncMap = {
    "displayShippingForm": setDisplayShippingForm,
  };

  useEffect(() => {
    setAccount(null);
    const email = JSON.parse(sessionStorage.getItem("account"))?.email;
    // TODO: validate email
    backend.get(`accounts/${email}`)
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

  const onOrder = () => {
    const bookOrders = [];
    const cart = JSON.parse(localStorage.getItem("cart"));
    const currentEmail = JSON.parse(sessionStorage.getItem("account"))?.email;
    for (const cartItem of cart) {
      bookOrders.push({
        bookId: cartItem.bookId,
        authorName: cartItem.authorName,
        imageUrl: cartItem.imageUrl,
        title: cartItem.title,
        quantity: cartItem.quantity,
        unitPrice: cartItem.unitPrice,
      });
    }
    const accountOrder = {
      bookOrders: bookOrders,
      accountEmail: currentEmail,
      name: account.name,
      email: account.email,
      address: account.address,
      phone: account.phone,
      totalPrice: getTotalCost(),
    };
    backend.post(`/account-orders`, accountOrder)
    .then((res) => {
      dispatch(reset());
      navigate(`/account`);
    })
    .catch(err => console.log(err));
  }

  const onEditShippingInfo = (updatedAccount) => {
    // TODO: open modal for edit shipping info
    setAccount({
      name: updatedAccount.name,
      email: updatedAccount.email,
      address: updatedAccount.address,
      phone: updatedAccount.phone,
    });
  }

  const onOpenShippingForm = () => {
    dialogFuncMap["displayShippingForm"](true);
  }

  const onHideShippingForm = () => {
    dialogFuncMap["displayShippingForm"](false);
  }

  if (!account) {
    return (
    <>
      <Spinner></Spinner>
    </>
    )
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
            <Button icon="pi pi-pencil" label="Edit shipping info" 
            className="p-button-fade p-button-primary mt-1 mb-4"
            onClick={onOpenShippingForm}></Button>
            <Dialog header="Shipping form" visible={displayShippingForm} style={{ width: "50%" }} onHide={onHideShippingForm}>
              <ShippingForm onHide={onHideShippingForm} onEdit={onEditShippingInfo} account={account} />
            </Dialog>
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
                )}) : (<></>)}
                <div className="d-flex justify-content-between mt-4">
                  <p>Total:</p>
                  <h4 className="m-0 p-0">${getTotalCost()}</h4>
                </div>
                <Button label="Confirm order" className="p-button-primary mt-4 w-100" onClick={onOrder}></Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    );
  }
}

export default CheckoutPage;