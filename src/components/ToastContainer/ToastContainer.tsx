import { ToastContainer as ToastifyContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastContainer() {
  return (
    <ToastifyContainer
      style={{ zIndex: 9999999 }}
      toastStyle={{
        fontFamily: "Inter",
      }}
      progressStyle={{
        background: "#EEEEEE",
      }}
      position="bottom-left"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
}
