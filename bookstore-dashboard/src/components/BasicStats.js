import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import backend from "../redux/api";

function BasicStats() {
  const [basicStats, setBasicStats] = useState({
    orderCount: 0,
    bookSaleCount: 0,
    revenue: 0,
    customerCount: 0,
  });

  const isUpdate = useSelector((state) => {
    return state.orderSlice.trigger;
  });

  useEffect(() => {
    backend.get(`account-orders/stats/basic`)
    .then((res) => {
      setBasicStats({
        orderCount: res.data.orderCount,
        bookSaleCount: res.data.bookSaleCount,
        revenue: res.data.revenue,
        customerCount: res.data.customerCount,
      });
    })
    .catch(e => {
      console.log(e);
    });
  }, [isUpdate]);

  return (
  <>
  <div className="row">
    <div className="col-lg-3 mb-4">
      <Card>
        <div className="p-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="m-0 p-text-secondary">All orders</h6>
              <h3 className="m-0">{basicStats.orderCount}</h3>
            </div>
            <div className="p-2 bg-fade-info rounded-lg">
              <i className="pi pi-shopping-cart p-text-info" style={{fontSize: "200%"}}></i>
            </div>
          </div>
        </div>
      </Card>
    </div>

    <div className="col-lg-3 mb-4">
      <Card>
        <div className="p-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="m-0 p-text-secondary">Book sales</h6>
              <h3 className="m-0">{basicStats.bookSaleCount}</h3>
            </div>
            <div className="p-2 bg-fade-warning rounded-lg">
              <i className="pi pi-book p-text-warning" style={{fontSize: "200%"}}></i>
            </div>
          </div>
        </div>
      </Card>
    </div>

    <div className="col-lg-3 mb-4">
      <Card>
        <div className="p-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="m-0 p-text-secondary">Revenue</h6>
              <h3 className="m-0">${basicStats.revenue}</h3>
            </div>
            <div className="p-2 bg-fade-success rounded-lg">
              <i className="pi pi-money-bill p-text-success" style={{fontSize: "200%"}}></i>
            </div>
          </div>
        </div>
      </Card>
    </div>

    <div className="col-lg-3 mb-4">
      <Card>
        <div className="p-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="m-0 p-text-secondary">Customers</h6>
              <h3 className="m-0">{basicStats.customerCount}</h3>
            </div>
            <div className="p-2 bg-fade-help rounded-lg">
              <i className="pi pi-users p-text-help" style={{fontSize: "200%"}}></i>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
  </>
  )
}

export default BasicStats;