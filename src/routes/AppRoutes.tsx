import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "../pages/home";
import { useEffect } from "react";
import PageNotFound from "../components/pageNotFound";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (hash && pathname === "/") {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (hash && pathname !== "/") {
      navigate(`/${hash}`);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, navigate]);
  return null;
};

const PageTitleManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    let pageTitle = "My Love";
    document.title = `${pageTitle}`;
  }, [pathname]);

  return null;
};

const AppRoutes = () => (
  <>
    <ScrollToTop />
    <PageTitleManager />

    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </>
);
export default AppRoutes;
