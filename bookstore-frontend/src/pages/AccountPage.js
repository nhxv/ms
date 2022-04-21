import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import backend from "../redux/api";
import Spinner from "../components/Spinner";
import AccountForm from "../components/AccountForm";
import { Dialog } from "primereact/dialog";
import OrderList from "../components/OrderList";

const AccountPage = () => {
  const [account, setAccount] = useState(null);
  const [displayAccountForm, setDisplayAccountForm] = useState(false);

  const dialogFuncMap = {
    "displayAccountForm": setDisplayAccountForm,
  };

  useEffect(() => {
    const currentEmail = JSON.parse(sessionStorage.getItem("account"))?.email;
    backend.get(`/accounts/${currentEmail}`)
    .then((res) => {
      setAccount({
        name: res.data.name,
        email: res.data.email,
        address: res.data.address,
        phone: res.data.phone,
      });
    })
    .catch(err => { console.log(err)});
  }, []);

  const onEditProfile = (accountUpdate) => {
    const currentEmail = JSON.parse(sessionStorage.getItem("account"))?.email;
    backend.put(`/accounts/${currentEmail}`, accountUpdate)
    .then((res) => {
      setAccount({
        name: res.data.name,
        email: res.data.email,
        address: res.data.address,
        phone: res.data.phone,
      });
    })
    .catch(e => { console.log(e); });
  }

  const onOpenAccountForm = () => {
    dialogFuncMap["displayAccountForm"](true);
  }

  const onHideAccountForm = () => {
    dialogFuncMap["displayAccountForm"](false);
  }

  if (!account) {
    return (
    <>
    <Spinner />
    </>
    );
  } else {
    return (
      <section>
        <div className="row">
          <div className="col-lg-4 col-12 mb-4">
            <Card>
              <div className="p-4">
                <p className="p-text-secondary mb-0">Name:</p>
                <p className="mt-0 mb-3">{account.name}</p>
                <p className="p-text-secondary mb-0">Address:</p>
                <p className="mt-0 mb-3">{account.address}</p>
                <p className="p-text-secondary mb-0">Phone:</p>
                <p className="mt-0 mb-3">{account.phone}</p>
                <Button label={<><span className="pi pi-pencil mr-2"></span><span>Edit profile</span></>}
                className="p-button-outlined p-button-primary mt-3 w-100"
                onClick={onOpenAccountForm}></Button>
                <Dialog header="Edit account" visible={displayAccountForm} 
                style={{ width: "50%" }} onHide={onHideAccountForm} dismissableMask="true">
                  <AccountForm onHide={onHideAccountForm} onEditAsync={onEditProfile} account={account} />
                </Dialog>
              </div>
            </Card>
          </div>
          <div className="col-lg-8 col-12 mb-4">
            <OrderList></OrderList>
          </div>
        </div>
      </section>
    )
  }

};

export default AccountPage;