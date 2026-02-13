import { Suspense } from "react";
import AppRoutes from "./routes/AppRoutes";
import { useLocation } from "react-router-dom";
const App = () => {
  const location = useLocation();

  const definedRoutes = ["/", "/privacy-policy", "/terms-conditions"];
  const isPageNotFound = !definedRoutes.includes(location.pathname);

  return (
    <Suspense fallback={"Loading..."}>

      <div
        style={{ minHeight: isPageNotFound ? "100vh" : "85vh" }}
        className="overflow-hidden"
      >
        <AppRoutes />
      </div>
      {/* {!isPageNotFound && <ProgressWrap />} */}
    </Suspense>
  );
};
export default App;
