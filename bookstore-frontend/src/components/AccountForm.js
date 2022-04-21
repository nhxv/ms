import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

function AccountForm({ onHide, onEdit, onEditAsync, account }) {
  const accountForm = useFormik({
    initialValues: {
      name: account.name,
      email: account.email,
      address: account.address,
      phone: account.phone,
    },
    onSubmit: (data) => {
      if (!onEditAsync) {
        onEdit({
          name: data.name,
          email: data.email,
          address: data.address,
          phone: data.phone,
        });
      } else {
        onEditAsync({
          name: data.name,
          email: data.email,
          address: data.address,
          phone: data.phone,
        });
      }

      onHide();
    }
  });

  if (onEditAsync) { // no email edit for now
    return (
      <>
        <div className="mb-4">
          <div className="py-3 px-4 row justify-content-center">
            <div className="col-lg-8 col-12">
              <form onSubmit={accountForm.handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="d-block">Name:</label>
                  <InputText id="name" name="name" className="d-block w-100" 
                  value={accountForm.values.name} onChange={accountForm.handleChange}  
                  autoFocus />
                </div>
    
                <div className="mb-4">
                  <label htmlFor="address" className="d-block">Address:</label>
                  <InputText id="address" name="address" className="d-block w-100" 
                  value={accountForm.values.address} onChange={accountForm.handleChange} />
                </div>
    
                <div className="mb-4">
                  <label htmlFor="phone" className="d-block">Phone:</label>
                  <InputText id="phone" name="phone" className="d-block w-100" 
                  value={accountForm.values.phone} onChange={accountForm.handleChange} />
                </div>
    
                <Button label="Submit" type="submit" className="mt-2 w-100"></Button>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className="mb-4">
          <div className="py-3 px-4 row justify-content-center">
            <div className="col-lg-8 col-12">
              <form onSubmit={accountForm.handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="d-block">Name:</label>
                  <InputText id="name" name="name" className="d-block w-100" 
                  value={accountForm.values.name} onChange={accountForm.handleChange}  
                  autoFocus />
                </div>
    
                <div className="mb-4">
                  <label htmlFor="email" className="d-block">Email:</label>
                  <InputText id="email" name="email" className="d-block w-100" 
                  value={accountForm.values.email} onChange={accountForm.handleChange} />
                </div>
    
                <div className="mb-4">
                  <label htmlFor="address" className="d-block">Address:</label>
                  <InputText id="address" name="address" className="d-block w-100" 
                  value={accountForm.values.address} onChange={accountForm.handleChange} />
                </div>
    
                <div className="mb-4">
                  <label htmlFor="phone" className="d-block">Phone:</label>
                  <InputText id="phone" name="phone" className="d-block w-100" 
                  value={accountForm.values.phone} onChange={accountForm.handleChange} />
                </div>
    
                <Button label="Submit" type="submit" className="mt-2 w-100"></Button>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  }
};

export default AccountForm;