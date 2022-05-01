import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/authActions";
import { merge } from "../redux/actions/cartActions";
import backend from "../redux/api";

const LoginPage = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  // TODO: validation & error handling
  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
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
        console.log(error.message);
      });
      loginForm.resetForm();
    }
  });

  const onNavigate = () => {
    navigate("/register");
  }

  return (
    <section>
      <h4 className="text-center mb-4">Welcome back</h4>
      <div className="row justify-content-center">
        <div className="col-lg-7 col-md-10">
          <Card className="mb-4">
            <div className="py-5 px-4 row justify-content-center">
              <div className="col-lg-8 col-12">
                <form onSubmit={loginForm.handleSubmit}>
                  <div className="mb-4">
                    <span className="p-float-label">
                      <InputText id="email" name="email" type="email" 
                      value={loginForm.values.email} onChange={loginForm.handleChange}  
                      style={{width: "100%"}}></InputText>
                      <label htmlFor="email">Email</label>
                    </span>
                  </div>

                  <div className="mb-4">
                    <span className="p-float-label w-100">
                      <InputText type="password" id="password" name="password"
                      value={loginForm.values.password} onChange={loginForm.handleChange} 
                      style={{width: "100%"}}></InputText>
                      <label htmlFor="password">Password</label>
                    </span>
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