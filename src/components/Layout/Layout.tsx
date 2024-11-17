import {
  NavLink, Outlet,
} from 'react-router-dom';
import './Layout.css';

function Layout() {
  return (
    <div>
      <div className="navbar">
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