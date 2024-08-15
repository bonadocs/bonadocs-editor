import React from "react";
import { BonadocsEditorContracts } from "./BonadocsEditorContracts/BonadocsEditorContracts";
import { BonadocsEditorVariables } from "./BonadocsEditorVariables/BonadocsEditorVariables";
import { Route, Routes } from "react-router-dom";
import { BonadocsEditorActions } from "./BonadocsEditorActions/BonadocsEditorActions";
import { BonadocsEditorLogin } from "./BonadocsEditorLogin/BonadocsEditorLogin";
import { BonadocsEditorProjects } from "./BonadocsEditorProjects/BonadocsEditorProjects";
import { BonadocsEditorProjectsCreation } from "@/layout/BonadocsEditorProjects/BonadocsEditorProjectsCreation/BonadocsEditorProjectsCreation";
import { BonadocsEditorTeams } from "./BonadocsEditorTeams/BonadocsEditorTeams";

interface BonadocsEditorProps {
  className?: string;
}
export const BonadocsEditor: React.FC<BonadocsEditorProps> = ({
  className,
}) => {
  return (
    <>
      <Routes>
        <Route path={"/"}>
          <Route
            index
            element={<BonadocsEditorContracts className={className} />}
          />
          <Route
            path="contracts"
            element={
              <>
                <BonadocsEditorContracts className={className} />
              </>
            }
          />
          <Route
            path="variables"
            element={
              <>
                <BonadocsEditorVariables className={className} />
              </>
            }
          />
          <Route
            path="actions"
            element={
              <>
                <BonadocsEditorActions className={className} />
              </>
            }
          />
        </Route>
        <Route path="/login" element={<BonadocsEditorLogin />} />
        <Route path={"projects"}>
          <Route index element={<BonadocsEditorProjects />} />
          <Route path="create" element={<BonadocsEditorProjectsCreation />} />
        </Route>
        <Route path="/teams" element={<BonadocsEditorTeams />} />
      </Routes>
    </>
  );
};
