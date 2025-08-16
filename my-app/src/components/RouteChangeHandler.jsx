import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function RouteChangeHandler() {
  const location = useLocation();

  useEffect(() => {
    // Reset scroll
    window.scrollTo(0, 0);

    // Optionally clear localStorage/sessionStorage if needed
    // localStorage.clear();
    // sessionStorage.clear();

    // Optionally trigger a global refetch
    // window.dispatchEvent(new Event("refreshData"));

  }, [location.pathname]);

  return null;
}