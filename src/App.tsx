import React from "react";
import "./styles/sass/main.scss";
import "./App.css";
import { BonadocsEditorContainer } from "./layout/BonadocsEditorContainer";
import { CollectionProvider } from "./context/CollectionContext";
import { BrowserRouter } from "react-router-dom";
import Modal from "react-modal";
import { store } from "./store";
import { Provider } from "react-redux";
Modal.setAppElement("#root");
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <CollectionProvider>
          <BonadocsEditorContainer />
        </CollectionProvider>{" "}
      </BrowserRouter>
    </Provider>
  );
}

export default App;
