import "./Header.scss";
import { FaHome } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { IoCamera } from "react-icons/io5";
import { SiGoogleanalytics } from "react-icons/si";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();

  return (
    <header>
      <div>
        <a href="/home">
          <img
            src="/logos/logo.svg"
            alt="TrentinoTraffic"
            className="logo__large"
          />
          <img
            src="/logos/icon.svg"
            alt="TrentinoTraffic"
            className="logo__small"
          />
        </a>
        <nav className="link__container">
          <Link
            to={"/"}
            className={
              pathname.startsWith("/home") ? "link link__active" : "link"
            }
          >
            <FaHome className="i" /> Home
          </Link>
          <Link
            to="/webcams"
            className={
              pathname.startsWith("/webcams") ? "link link__active" : "link"
            }
          >
            <IoCamera className="i" /> Webcams
          </Link>
          <Link
            to="/data/hour"
            className={
              pathname.startsWith("/data") ? "link link__active" : "link"
            }
          >
            <SiGoogleanalytics className="i" /> Data
          </Link>
        </nav>
      </div>

      <a
        href="https://github.com/damnicolussi/trentinotraffic"
        target="_blank"
        className="email"
      >
        <FaGithub className="i" /> Contribute on GitHub!
      </a>
    </header>
  );
};

export default Header;
