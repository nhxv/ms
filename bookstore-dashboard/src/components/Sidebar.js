import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signout } from '../redux/actions/authActions';

function Sidebar() {
  const dispatch = useDispatch();

  const onSignOut = () => {
    dispatch(signout());
  }

  const setNavLink = (navData) => {
    return navData.isActive ? 'nav-link d-flex flex-column d-lg-block nav-active' : 'nav-link d-flex flex-column d-lg-block';
  }

  return (
    <nav className="sidebar p-3">
      <NavLink className="d-flex align-items-center mb-lg-3 me-md-auto" to="/">
        <span className="ml-3 d-none d-lg-inline"><h4>Dashboard</h4></span>
      </NavLink>

      <ul className="nav flex-column mb-auto">
        <li className="nav-item text-center mb-2 text-lg-left tooltip">
            <NavLink className={navData => setNavLink(navData)} to="/">
              <i className="pi pi-home"></i>
              <span className="ml-2 d-lg-inline d-none">Home</span>
            </NavLink>
            <span className="tooltiptext d-lg-none">Home</span>
          </li>

        <li className="nav-item text-center mb-2 text-lg-left tooltip">
          <NavLink className={navData => setNavLink(navData)} to="/books">
            <i className="pi pi-book"></i>
            <span className="ml-2 d-lg-inline d-none">Books</span>
          </NavLink>
          <span className="tooltiptext d-lg-none">Books</span>
        </li>

        <li className="nav-item text-center mb-2 text-lg-left tooltip">
          <NavLink className={navData => setNavLink(navData)} to="/authors">
            <i className="pi pi-pencil"></i>
            <span className="ml-2 d-lg-inline d-none">Authors</span>
          </NavLink>
          <span className="tooltiptext d-lg-none">Authors</span>
        </li>
      </ul>

      <div className="nav flex-column">
        <div className="nav-item text-center mb-2 text-lg-left tooltip">
          <div className="nav-link d-flex flex-column d-lg-block" onClick={onSignOut}>
            <i className="pi pi-sign-out"></i>
            <span className="ml-2 d-lg-inline d-none">Sign out</span>
          </div>
          <span className="tooltiptext d-lg-none">Sign out</span>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;