import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useConnection } from "../context/ConnectionContext";
import Logo from "../img/logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const { setIsOnline } = useConnection();

  const { isOnline } = useConnection();
  const navigate = useNavigate();

  const handleLogoClick = (e) => {
    e.preventDefault();
    setIsOnline(!isOnline);
  };
  const handlePublishClick = (e) => {
    e.preventDefault();
    if (isOnline) {
      navigate("/write");
    } else {
      alert("No estás conectado a internet.");
    }
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <img src={Logo} alt="" />
          </Link>
          <span
            className={isOnline ? "status online" : "status offline"}
            onClick={handleLogoClick}
          >
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>

        <div className="links">
          <Link className="link" to="/">
            <b>
              <span>TODOS</span>
            </b>
          </Link>
          <Link className="link" to="/?cat=art">
            <h6>ARTE</h6>
          </Link>
          <Link className="link" to="/?cat=science">
            <h6>CIENCIA</h6>
          </Link>
          <Link className="link" to="/?cat=technology">
            <h6>TECNOLOGIA</h6>
          </Link>
          <Link className="link" to="/?cat=cinema">
            <h6>CINE</h6>
          </Link>
          <Link className="link" to="/?cat=design">
            <h6>DISEÑO</h6>
          </Link>

          <span className="write" onClick={handlePublishClick}>
            Publicar
          </span>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Cerrar sesión</span>
          ) : (
            <Link className="link" to="/login">
              Ingresar
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
