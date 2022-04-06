import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useFormik } from 'formik';

const RegisterPage = () => {
  const [formData, setFormData] = useState({});
  let navigate = useNavigate();

  // TODO: validation
  const registerForm = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      phone: '',
      address: '',
      accept: false,
    },
    onSubmit: (data) => {
      setFormData(data);
      registerForm.resetForm();
    }
  });

  const onNavigate = () => {
    navigate(`/login`);
  }

  return (
    <section>
      <h4 className="text-center mb-4">Create an account</h4>
      <div className="row justify-content-center">
      <div className="col-lg-7 col-md-10">
        <Card className="mb-4">
        <div className="py-5 px-4 row justify-content-center">
          <div className="col-lg-8 col-12">
          <form onSubmit={registerForm.handleSubmit}>
            <div className="mb-4">
              <span className="p-float-label">
                <InputText id="email" name="email" 
                value={registerForm.values.email} onChange={registerForm.handleChange} 
                style={{width: '100%'}}></InputText>
                <label htmlFor="email">Email</label>
              </span>
            </div>

            <div className="mb-4">
              <span className="p-float-label">
                <InputText id="password" type={'password'} name="password"
                value={registerForm.values.password} onChange={registerForm.handleChange} 
                style={{width: '100%'}} ></InputText>
                <label htmlFor="password">Password</label>
              </span>
            </div>

            <div className="mb-4">
              <span className="p-float-label">
                <InputText id="password" type="password" name="password"
                value={registerForm.values.password} onChange={registerForm.handleChange} 
                style={{width: '100%'}} ></InputText>
                <label htmlFor="password">Retype password</label>
              </span>
            </div>

            <div className="mb-4">
              <span className="p-float-label">
                <InputText id="name" name="name"
                value={registerForm.values.name} onChange={registerForm.handleChange}  
                style={{width: '100%'}}></InputText>
                <label htmlFor="name">Name</label>
              </span>
            </div>

            <div className="mb-4">
              <span className="p-float-label">
                <InputText id="phone" name="phone"
                value={registerForm.values.phone} onChange={registerForm.handleChange}
                style={{width: '100%'}}></InputText>
                <label htmlFor="phone">Phone number</label>
              </span>
            </div>

            <div className="mb-4">
              <span className="p-float-label">
                <InputText id="address" name="address"
                value={registerForm.values.address} onChange={registerForm.handleChange}
                style={{width: '100%'}}></InputText>
                <label htmlFor="address">Address</label>
              </span>
            </div>

            <div className="d-flex align-items-center mb-4">
              <Checkbox inputId="accept" name="accept" 
              onChange={registerForm.handleChange} checked={registerForm.values.accept}></Checkbox>
              <label htmlFor="accept" className="ml-2 mt-2">I agree to the terms & conditions</label>
            </div>

            <Button label="Register" style={{width: '100%'}}></Button>
            <Button label="Already have an account? Login" 
            style={{width: '100%'}} className="mt-2 p-button-link"
            onClick={onNavigate}></Button>
          </form>
          </div>
        </div>
        </Card>
      </div>
      </div>
    </section>
  );
}

export default RegisterPage;