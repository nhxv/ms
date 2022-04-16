import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import backend from "../redux/api";
import Spinner from "../components/Spinner";

const AccountPage = () => {
  const [account, setAccount] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const currentEmail = JSON.parse(sessionStorage.getItem("account"))?.email;
    backend.get(`/accounts/${currentEmail}`)
    .then((res) => {
      console.log(res.data);
    })
    .catch(err => { console.log(err)});
  }, []);

  const onEditProfile = () => {}

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
                <p className="p-text-secondary mb-0">Email:</p>
                <p className="mt-0 mb-3">{account.email}</p>
                <p className="p-text-secondary mb-0">Address:</p>
                <p className="mt-0 mb-3">{account.address}</p>
                <p className="p-text-secondary mb-0">Phone:</p>
                <p className="mt-0 mb-3">{account.phone}</p>
                <Button icon="pi pi-pencil" label="Edit profile" 
                className="p-button-fade p-button-primary mt-1 mb-4 w-100"
                onClick={onEditProfile}></Button>
              </div>
            </Card>
          </div>
          <div className="col-lg-8 col-12 mb-4">
            <Card>
              <div className="p-4">
                
              </div>
            </Card>
          </div>
        </div>
      </section>
    )
  }

};

export default AccountPage;