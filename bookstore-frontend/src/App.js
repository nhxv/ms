
import "./App.scss";
import {Routes, Route, Navigate} from "react-router-dom";
import Navbar from "./components/Navbar";
import BookPage from "./pages/BookPage";
import AuthorPage from "./pages/AuthorPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./components/PrivateRoute";
import { useSelector } from "react-redux";
import AccountPage from "./pages/AccountPage";
import NotFoundPage from "./pages/NotFoundPage";
import BookDetailPage from "./pages/BookDetailPage";
import AuthorDetailPage from "./pages/AuthorDetailPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { reset } from "./redux/actions/cartActions";

// PrimeReact.ripple = true;

function App() {
  const isAuth = useSelector(state => state.authSlice.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("cart")) {
      dispatch(reset());
    }
  }, []);

    return (
      <>
        <main className="container mt-3">
          <Navbar auth={isAuth} className="shadow-sm"></Navbar>
          <Routes>
            <Route path="/books"> {/* element <Outlet/> allows nested routes */}
              <Route index element={<BookPage />} />
              <Route path=":bookId" element={<BookDetailPage />} />
            </Route>

            {/* for SSR redirect read this: https://gist.github.com/mjackson/b5748add2795ce7448a366ae8f8ae3bb */}
            <Route path="/" element={<Navigate replace to="/books" />} />
            <Route path="/home" element={<Navigate replace to="/books" />} />

            <Route path="/authors">
              <Route index element={<AuthorPage />} />
              <Route path=":authorId" element={<AuthorDetailPage />} />
            </Route>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Private route */}
            <Route path="/account" element={<PrivateRoute auth={isAuth}><AccountPage /></PrivateRoute>} />

            <Route path="*" element={<NotFoundPage />}/>
          </Routes>
        </main>
      </>
    );
}

export default App;
