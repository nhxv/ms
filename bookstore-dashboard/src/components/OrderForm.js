import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import backend from "../redux/api";
import { useDispatch } from "react-redux";
import { editOrder } from "../redux/actions/orderActions";

function OrderForm({ onUpdate, order }) {
  const [date, setDate] = useState(new Date(order?.dateCreated));
  const statuses = ["PROCESSING", "COMPLETED", "CANCELED"];
  const [selectedStatus, setSelectedStatus] = useState(order?.orderStatus);
  const dispatch = useDispatch();

  useEffect(() => {console.log(order);}, []);

  const orderForm = useFormik({
    initialValues: {},
    onSubmit: () => {
      dispatch(editOrder(order.id, {date: date, status: selectedStatus}))
      .then(() => {
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
            monthNavigator yearNavigator yearRange="2018:2022" monthNavigatorTemplate={monthNavigatorTemplate} 
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