import { useState } from "react";
import { useFormik } from "formik";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import backend from "../redux/api";

function OrderForm({ onUpdate, orderDate, orderStatus, orderId}) {
  const [date, setDate] = useState(orderDate);
  const statuses = ["PROCESSING", "COMPLETED", "CANCELED"];
  const [selectedStatus, setSelectedStatus] = useState(orderStatus);

  const orderForm = useFormik({
    initialValues: {},
    onSubmit: () => {
      backend.put(`/account-orders/${orderId}`, {status: selectedStatus, date: date})
      .then((res) => {
        console.log(res.data);
        onUpdate();
      })
      .catch((err) => {console.log(err);});
    }
  });

  const monthNavigatorTemplate = (e) => {
    return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} style={{ lineHeight: 1 }} />;
  }

  const yearNavigatorTemplate = (e) => {
    return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} className="ml-2" style={{ lineHeight: 1 }} />;
  }

  return (
  <>
  <div className="mb-4">
    <div className="py-3 px-4 row justify-content-center">
      <div className="col-lg-8 col-12">
        <form onSubmit={orderForm.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="status" className="d-block">Status:</label>
            <Dropdown className="w-100" options={statuses} value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.value)} />
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="d-block">Order placed:</label>
            <Calendar id="date" value={date} className="w-100" onChange={(e) => setDate(e.value)} 
            monthNavigator yearNavigator yearRange="2021:2031" monthNavigatorTemplate={monthNavigatorTemplate} 
            yearNavigatorTemplate={yearNavigatorTemplate} />
          </div>

          <Button label="Submit" type="submit" className="mt-2 w-100"></Button>
        </form>
      </div>
    </div>
  </div>
  </>
  );
}

export default OrderForm;