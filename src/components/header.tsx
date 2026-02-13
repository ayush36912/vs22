import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import LOGO from "../assets/img/logo/logo.svg";

export const Header: React.FC = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isTransparent, setIsTransparent] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsTransparent(currentScrollY < 10);
      if (currentScrollY < 10) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsHeaderVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      // className="header-main "
      className={`wrapper header-main ${isTransparent ? "transparent" : ""} ${
        isHeaderVisible ? "header-visible " : "header-hidden"
      }`}
    >
      <Link to="/">
        <img
          src={LOGO}
          className="logo"
          width="160"
          height="64"
          alt="logo"
          // style={{
          //   width: "90`px",
          //   height: "50px",
          // }}
        />
      </Link>
      {/* <a href="index.html"><img src="assets/img/logo/logo.svg" width="160" height="64" alt="logo"></a> */}
    </header>
  );
};

export default Header;
