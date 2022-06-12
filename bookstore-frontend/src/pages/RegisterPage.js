import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { register } from "../redux/actions/authActions";
import { Message } from "primereact/message";
import { useState } from "react";

const RegisterPage = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  const registerSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(3),
    confirm: yup.string().required().oneOf([yup.ref("password"), null], "Passwords must match."),
    name: yup.string().required(),
    phone: yup.string().required(),
    address: yup.string().required(),
    accept: yup.boolean().required().oneOf([true], "Don't read, just accept."),
  });

  const registerForm = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirm: "",
      name: "",
      phone: "",
      address: "",
      accept: false,
    },
    validationSchema: registerSchema,
    onSubmit: (data) => {
      const registerData = {
        email: data.email,
        password: data.password,
        name: data.name,
        address: data.address,
        phone: data.phone,
      };
      dispatch(register(registerData))
      .then(() => {
        onNavigate();
      })
      .catch(e => {
        const error = JSON.parse(JSON.stringify(e));
        setErrorMessage(error.message);
      });
      registerForm.resetForm();
    }
  });

  const onNavigate = () => {
    navigate(`/login`);
  }

  const isFormFieldValid = (name) => {
    return !!(registerForm.touched[name] && registerForm.errors[name]);
  };

  const getFormErrorMessage = (name) => {
    return isFormFieldValid(name) && <small className="p-error m-0">{registerForm.errors[name]}</small>;
  };

  return (
  <section>
    <h4 className="text-center mb-4">Create an account</h4>
    <div className="row justify-content-center">
      <div className="col-lg-7 col-md-10">
        <Card className="mb-4">
          <div className="py-5 px-4 row justify-content-center">
            <div className="col-lg-8 col-12">
              {errorMessage ? (<Message severity="error" text={errorMessage} className="mb-4 w-100" />) : (<></>)}
              <form onSubmit={registerForm.handleSubmit}>
                <div className="mb-4">
                  <span className="p-float-label">
                    <InputText id="email" name="email" 
                    className={"w-100"} 
                    onBlur={registerForm.handleBlur}
                    value={registerForm.values.email} onChange={registerForm.handleChange} />
                    <label htmlFor="email">Email</label>
                  </span>
                  {getFormErrorMessage("email")}
                </div>

                <div className="mb-4">
                  <span className="p-float-label">
                    <InputText id="password" type={"password"} name="password" 
                    className={"w-100"} 
                    onBlur={registerForm.handleBlur}
                    value={registerForm.values.password} onChange={registerForm.handleChange} />
                    <label htmlFor="password">Password</label>
                  </span>
                  {getFormErrorMessage("password")}
                </div>

                <div className="mb-4">
                  <span className="p-float-label">
                    <InputText id="confirm" type="password" name="confirm" 
                    className={"w-100"} onBlur={registerForm.handleBlur}
                    value={registerForm.values.confirm} onChange={registerForm.handleChange} />
                    <label htmlFor="confirm">Confirm password</label>
                  </span>
                  {getFormErrorMessage("confirm")}
                </div>

                <div className="mb-4">
                  <span className="p-float-label">
                    <InputText id="name" name="name" 
                    className={"w-100"}
                    onBlur={registerForm.handleBlur} 
                    value={registerForm.values.name} onChange={registerForm.handleChange} />
                    <label htmlFor="name">Name</label>
                  </span>
                  {getFormErrorMessage("name")}
                </div>

                <div className="mb-4">
                  <span className="p-float-label">
                    <InputText id="phone" name="phone" 
                    className={"w-100"}
                    onBlur={registerForm.handleBlur} 
                    value={registerForm.values.phone} onChange={registerForm.handleChange} />
                    <label htmlFor="phone">Phone number</label>
                  </span>
                  {getFormErrorMessage("phone")}
                </div>

                <div className="mb-4">
                  <span className="p-float-label">
                    <InputText id="address" name="address" 
                    className={"w-100"}
                    onBlur={registerForm.handleBlur} 
                    value={registerForm.values.address} onChange={registerForm.handleChange} />
                    <label htmlFor="address">Address</label>
                  </span>
                  {getFormErrorMessage("address")}
                </div>

                <div className="d-flex align-items-center mb-4">
                  <Checkbox inputId="accept" name="accept" 
                  onChange={registerForm.handleChange} checked={registerForm.values.accept}></Checkbox>
                  <label htmlFor="accept" className="ml-2 mt-2">I agree to the terms & conditions</label>
                </div>

                <Button label="Register" type="submit" className="w-100"></Button>
                <Button label="Already have an account? Login" 
                className="mt-2 p-button-link w-100"
                onClick={onNavigate} />
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