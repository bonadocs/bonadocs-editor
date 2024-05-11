import React from "react";
import { BonadocsEditorContracts } from "./BonadocsEditorContracts/BonadocsEditorContracts";
import { BonadocsEditorVariables } from "./BonadocsEditorVariables/BonadocsEditorVariables";
import { Route, Routes } from "react-router-dom";
import { BonadocsEditorActions } from "./BonadocsEditorActions/BonadocsEditorActions";
import { BonadocsEditorLogin } from "./BonadocsEditorLogin/BonadocsEditorLogin";
import { BonadocsEditorProjects } from "./BonadocsEditorProjects/BonadocsEditorProjects";

interface BonadocsEditorProps {
  className?: string;
}
export const BonadocsEditor: React.FC<BonadocsEditorProps> = ({
  className,
}) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<BonadocsEditorContracts className={className} />}
      />
      <Route
        path="/contracts"
        element={<BonadocsEditorContracts className={className} />}
      />
      <Route
        path="/variables"
        element={<BonadocsEditorVariables className={className} />}
      />
      <Route
        path="/actions"
        element={<BonadocsEditorActions className={className} />}
      />
      <Route path="/login" element={<BonadocsEditorLogin />} />
      <Route path="/projects" element={<BonadocsEditorProjects />} />
      //{" "}
      {/* <Route path="/page-2" component={Page2} />
      //       <Route path="/page-3" component={Page3} />
      //       <Route component={NotFound} /> */}
    </Routes>
  );
};
