import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Badge } from "primereact/badge";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signout } from "../redux/actions/authActions";

function Navbar({auth: isAuth}) {
  const [isOpen, setOpen] = useState(false);
  const [isCollapse, setCollapse] = useState(true);
  const cartCount = useSelector((state) => {
  // use map to get quantity array then reduce make it O(n^2)
  return state.cartSlice.cart.reduce((prev, current) => prev + (current.quantity || 0), 0);
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onNavbarToggler = () => {
    setOpen(!isOpen);
    setCollapse(!isCollapse);
  }

  const onSignOut = () => {
    dispatch(signout()).then(() => {
      navigate(`/`);
    });
  }

  const getEmail = () => {
    const account = JSON.parse(sessionStorage.getItem("account"));
    return account.email;
  }

  const NavbarIcon = () => {
    if (!isOpen) {
      return (<span><i className="pi pi-bars"></i></span>);
    } else {
      return (<span><i className="pi pi-times"></i></span>);
    }
  }

  return (
    <nav className="navbar navbar-expand-lg mb-4 shadow-sm" style={{borderRadius: "0.375rem"}}>
      <NavLink className="navbar-brand" id="logo" to="/">Mangastore</NavLink>
      <button className="navbar-toggler border-none" type="button" data-toggle="collapse"
          data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
          onClick={onNavbarToggler}>
      <NavbarIcon></NavbarIcon>        
      </button>

      <div className={isCollapse ? "collapse navbar-collapse" : "navbar-collapse"} id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className={navData => navData.isActive ? "nav-link nav-active" : "nav-link"} to="/books">
              <i className="pi pi-home mr-2"></i>
              <span>Manga</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className={navData => navData.isActive ? "nav-link nav-active" : "nav-link"} to="/authors">
              <i className="pi pi-pencil mr-2"></i>
              <span>Authors</span>
            </NavLink>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink className={navData => navData.isActive ? "nav-link nav-active" : "nav-link"} to="/cart">
            <Badge value={cartCount} className="p-badge-danger mr-2"></Badge>
            <i className="pi pi-shopping-cart mr-2"></i>
            <span className="mr-2">Cart</span>
            </NavLink>
          </li>
          {isAuth ? (
          <>
          <li className="nav-item">
            <NavLink className={navData => navData.isActive ? "nav-link nav-active" : "nav-link"} to="/account">
            <i className="pi pi-user mr-2"></i>
            <span>{getEmail()}</span>
            </NavLink>
          </li>
          <li className="nav-item" onClick={onSignOut}>
            <div className="nav-link">
              <i className="pi pi-sign-out mr-2"></i>
              <span>Sign out</span>
            </div>
          </li>
          </>
          ) : (
          <>
            <li className="nav-item">
              <NavLink className={navData => navData.isActive ? "nav-link nav-active" : "nav-link"} to="/login">
              <i className="pi pi-sign-in mr-2"></i>
              <span>Login</span>
              </NavLink>
            </li>
          </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;