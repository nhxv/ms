import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/authActions";
import { merge } from "../redux/actions/cartActions";
import backend from "../redux/api";
import { useState } from "react";
import * as yup from "yup";
import { Message } from "primereact/message";

const LoginPage = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  const loginSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(3),
  });

  // TODO: validation & error handling
  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (data) => {
      dispatch(login(data))
      .then(() => {
        const guestCart = JSON.parse(localStorage.getItem("cart"));
        const account = JSON.parse(sessionStorage.getItem("account"));
        backend.put(`accounts/cart-merge/${account.email}`, guestCart).then(res => {
          dispatch(merge(res.data.cart));
          navigate(`/`);
        });
      })
      .catch(e => {
        const error = JSON.parse(JSON.stringify(e));
        setErrorMessage(error.message);
      });
      loginForm.resetForm();
    }
  });

  const onNavigate = () => {
    navigate("/register");
  }

  const isFormFieldValid = (name) => {
    return !!(loginForm.touched[name] && loginForm.errors[name]);
  };

  const getFormErrorMessage = (name) => {
    return isFormFieldValid(name) && <small className="p-error m-0">{loginForm.errors[name]}</small>;
  };

  return (
    <section>
      <h4 className="text-center mb-4">Welcome back</h4>
      <div className="row justify-content-center">
        <div className="col-lg-7 col-md-10">
          <Card className="mb-4">
            <div className="py-5 px-4 row justify-content-center">
              <div className="col-lg-8 col-12">
                {errorMessage ? (<Message severity="error" text={errorMessage} className="mb-4 w-100" />) : (<></>)}
                <form onSubmit={loginForm.handleSubmit}>
                  <div className="mb-4">
                    <span className="p-float-label">
                      <InputText id="email" name="email" type="email" 
                      value={loginForm.values.email} onChange={loginForm.handleChange}  
                      style={{width: "100%"}}></InputText>
                      <label htmlFor="email">Email</label>
                    </span>
                    {getFormErrorMessage("email")}
                  </div>

                  <div className="mb-4">
                    <span className="p-float-label w-100">
                      <InputText type="password" id="password" name="password"
                      value={loginForm.values.password} onChange={loginForm.handleChange} 
                      style={{width: "100%"}}></InputText>
                      <label htmlFor="password">Password</label>
                    </span>
                    {getFormErrorMessage("password")}
                  </div>

                  <Button type="submit" label="Login" className="w-100"></Button>
                  <Button type="button" label="Don't have an account? Register" 
                  className="mt-2 p-button-link w-100" onClick={onNavigate}></Button>
                </form>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;