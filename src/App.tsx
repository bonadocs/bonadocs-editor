import React from "react";
import './styles/sass/main.scss'
import "./App.css";
import { BonadocsEditorContainer } from "./layout/BonadocsEditorContainer";
import Modal from "react-modal";

Modal.setAppElement("#root");
function App() {
  return <BonadocsEditorContainer />;
}

export default App;
