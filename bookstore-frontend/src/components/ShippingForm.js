import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

function ShippingForm({ onHide, onEdit, account }) {
  const shippingForm = useFormik({
    initialValues: {
      name: account.name,
      email: account.email,
      address: account.address,
      phone: account.phone,
    },
    onSubmit: (data) => {
      onEdit({
        name: data.name,
        email: data.email,
        address: data.address,
        phone: data.phone,
      });
      onHide();
    }
  });

  return (
  <>
    <div className="mb-4">
      <div className="py-3 px-4 row justify-content-center">
        <div className="col-lg-8 col-12">
          <form onSubmit={shippingForm.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="d-block">Name:</label>
              <InputText id="name" name="name" className="d-block w-100" 
              value={shippingForm.values.name} onChange={shippingForm.handleChange}  
              autoFocus />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="d-block">Email:</label>
              <InputText id="email" name="email" className="d-block w-100" 
              value={shippingForm.values.email} onChange={shippingForm.handleChange} />
            </div>

            <div className="mb-4">
              <label htmlFor="address" className="d-block">Address:</label>
              <InputText id="address" name="address" className="d-block w-100" 
              value={shippingForm.values.address} onChange={shippingForm.handleChange} />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="d-block">Phone:</label>
              <InputText id="phone" name="phone" className="d-block w-100" 
              value={shippingForm.values.phone} onChange={shippingForm.handleChange} />
            </div>

            <Button label="Submit" type="submit" className="mt-2 w-100"></Button>
          </form>
        </div>
      </div>
    </div>
  </>
  )
};

export default ShippingForm;