import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/authActions";
import { Message } from "primereact/message";

function LoginPage() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState("");

    // TODO: validation & error handling
    const loginForm = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: (data) => {
        dispatch(login(data))
        .then(() => navigate(`/`))
        .catch(e => {
          // TODO: display error UI
          const error = JSON.parse(JSON.stringify(e));
          setErrorMessage(error.message);
        });
        loginForm.resetForm();
      }
    });

    return (
        <section className="mt-5">
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
                                <InputText id="email" name="email" 
                                value={loginForm.values.email} onChange={loginForm.handleChange}  
                                style={{width: "100%"}}></InputText>
                                <label htmlFor="email">Email</label>
                              </span>
                            </div>

                            <div className="mb-4">
                              <span className="p-float-label w-100">
                                <InputText type={"password"} id="password" name="password"
                                value={loginForm.values.password} onChange={loginForm.handleChange} 
                                style={{width: "100%"}}></InputText>
                                <label htmlFor="password">Password</label>
                              </span>
                            </div>

                            <Button type="submit" label="Login" style={{width: "100%"}}></Button>
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