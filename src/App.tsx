import React from "react";
import "./styles/sass/main.scss";
import "./App.css";
import { BonadocsEditorContainer } from "./layout/BonadocsEditorContainer";
import { CollectionProvider } from "./context/CollectionContext";
import { BrowserRouter } from "react-router-dom";
import Modal from "react-modal";
import { store } from "./store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root");
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <CollectionProvider>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            toastClassName="toast"
            className="toast"
          />
          <BonadocsEditorContainer />
        </CollectionProvider>{" "}
      </BrowserRouter>
    </Provider>
  );
}

export default App;
