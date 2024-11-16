import {
  NavLink, Outlet,
} from 'react-router-dom';
import './Layout.css';

function Layout() {
  return (
    <div>
      <div className="navbar">
        {/* <NavLink to="/" className="logo-link">
          <img src={Images.logo.src} alt={Images.logo.alt} className="logo" />
        </NavLink> logo placeholder */}
        <div className="link-container">
          <NavLink to="/" className="link">
            Count
          </NavLink>
          <NavLink to="/history" className="link">
            Archive
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;