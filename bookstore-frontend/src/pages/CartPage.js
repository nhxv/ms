import { useSelector } from "react-redux";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Message } from 'primereact/message';
import { useDispatch } from "react-redux";
import { edit, editAsync, remove, removeAsync } from "../redux/actions/cartActions";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { Toast } from "primereact/toast";

function CartPage() {
  const deletedToast = useRef(null);
  const cart = useSelector((state) => state.cartSlice.cart);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const isAuth = useSelector(state => state.authSlice.isAuth);
  const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const onChangeQuantity = (cartItem, e) => {
    if (isAuth) {
      cartItem.quantity = e.value - cartItem.quantity;
      dispatch(editAsync(cartItem));
    } else {
      dispatch(edit(cartItem.bookId, e.value));
    }
  }

  const onRemove = (cartItem) => {
    if (isAuth) {
      cartItem.quantity *= -1;
      dispatch(removeAsync(cartItem));
    } else {
      dispatch(remove(cartItem.bookId));
      displayRemoveToast();
    }
  }

  const displayRemoveToast = () => { 
    deletedToast.current.show({
      severity: "success", 
      summary: "Removed", 
      detail: "Removed manga from cart",
      life: 1000,
    });
  }

  const getTotalCost = () => {
    return cart.reduce((prev, current) => prev + (current.unitPrice * current.quantity), 0);
  }

  return (
    <section>
      <Toast ref={deletedToast} position="bottom-center" />
      <div className="row">
        <div className="col-lg-8 col-12">
          {cart.length > 0 ? 
            cart.map(cartItem => {
            return (
              <Card className="mb-4" key={cartItem.bookId}>
                <div className="p-4">
                  <div className="d-block">
                    <Button className="float-right p-button-text p-button-rounded"
                    icon="pi pi-times"  onClick={() => onRemove(cartItem)}></Button>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-sm-7 col-12">
                      <div className="row align-items-center">
                        <img src={cartItem.imageUrl} className="d-block mr-4" width="90" height="140" alt="" />
                        <div className="col-sm-6 col-12 m-0 p-0">
                          <h6 className="my-0 p-text-link mt-2 mt-sm-0" 
                          onClick={() => navigate(`/books/${cartItem.bookId}`)}
                          style={{fontWeight: "500"}}>{cartItem.title}</h6>
                          <p className="p-text-secondary">by {cartItem.authorName}</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-3 col-12 m-0 p-0">
                      <p className="p-text-secondary mb-0">Quantity:</p>
                      <Dropdown value={quantities[cartItem.quantity - 1]} options={quantities} scrollHeight="190px" 
                      onChange={(e) => onChangeQuantity(cartItem, e)} placeholder="Qty" className="mt-1">
                      </Dropdown>
                    </div>

                    <div className="col-sm-2 col-12 m-0 p-0">
                      <p className="p-text-secondary mb-0 mt-3 mt-sm-0">Price:</p>
                      <h4 className="mt-0 mb-3">${cartItem.unitPrice}</h4>
                    </div>

                  </div>
                </div>
              </Card>
            )}) : <Message severity="warn" text="Your cart is empty" className="mb-4 w-100" /> 
          }
        </div>

        <div className="col-lg-4 col-12">
          <Card className="mb-4">
            <div className="p-4">
              <h5>Order Summary</h5>
              <div className="d-flex justify-content-between">
                <p>Total:</p>
                <h4 className="m-0 p-0">${getTotalCost()}</h4>
              </div>
              {cart.length > 0 ?
              (<Button label="Checkout" className="p-button-outlined p-button-primary mt-4 w-100"></Button>) :
              (<Button label="Checkout" className="p-button-outlined p-button-primary mt-4 w-100" disabled></Button>)
              }
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default CartPage;