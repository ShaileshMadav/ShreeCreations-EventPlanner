import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="container header-inner header-simple">
        {/* Empty left spacer */}
        <div className="header-spacer"></div>

        {/* Center brand */}
        <Link to="/" className="brand center-brand">
          ShreeCreations Chakan
        </Link>

        {/* Right admin link */}
        <div className="header-right">
          <Link to="/admin" className="admin-link">
            Admin
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
