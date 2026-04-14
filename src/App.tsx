import { useEffect } from "react";


import AppRouter from "./router/AppRouter";
import Loader from "./Component/loader";
import { Toaster } from "react-hot-toast";
import GlobalModal from "./Component/GlobalModal";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { logout } from "./Redux/Slice/authSlice";

export default function App() {
  
  const dispatch = useDispatch();
  useEffect(() => {
    const interval = setInterval(() => {
      const token = Cookies.get("token");

      if (!token) {
        dispatch(logout());
      }
    }, 5000); // check every 5 sec

    return () => clearInterval(interval);
  }, [dispatch]);



  return (
    <div>
      <AppRouter/>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3000,
          style: {
            background: "var(--primary)",
            color: "#fff",
          },
        }}
      />
      <GlobalModal />
      <Loader />
    </div>
  );
}
