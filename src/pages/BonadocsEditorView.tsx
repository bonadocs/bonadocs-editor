import React from "react";
import { BonadocsEditorContracts } from "./BonadocsEditorContracts/BonadocsEditorContracts";
import { BonadocsEditorVariables } from "./BonadocsEditorVariables/BonadocsEditorVariables";
import { Route, Routes } from "react-router-dom";

interface BonadocsEditorProps {
  className?: string;
}
export const BonadocsEditorView: React.FC<BonadocsEditorProps> = ({
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
      {/* <Route path="/page-2" component={Page2} />
            <Route path="/page-3" component={Page3} />
            <Route component={NotFound} /> */}
    </Routes>
  );
};
