import React from "react";
import { BonadocsEditorContracts } from "./BonadocsEditorContracts/BonadocsEditorContracts";
import { BonadocsEditorVariables } from "./BonadocsEditorVariables/BonadocsEditorVariables";
import { Route, Routes } from "react-router-dom";
import { BonadocsEditorActions } from "./BonadocsEditorActions/BonadocsEditorActions";
import { BonadocsEditorLogin } from "./BonadocsEditorLogin/BonadocsEditorLogin";
import { BonadocsEditorProjects } from "./BonadocsEditorProjects/BonadocsEditorProjects";
import { BonadocsEditorProjectsCreation } from "@/layout/BonadocsEditorProjects/BonadocsEditorProjectsCreation/BonadocsEditorProjectsCreation";
import { BonadocsEditorTeams } from "./BonadocsEditorTeams/BonadocsEditorTeams";
import { ProtectedRoute } from "@/router/ProtectedRoute";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { BonadocsEditorLayout } from "./BonadocsEditorLayout";
import { BonadocsEditorTeamsInvite } from "./BonadocsEditorTeams/BonadocsEditorTeamsInvite";
interface BonadocsEditorProps {
  className?: string;
}
export const BonadocsEditor: React.FC<BonadocsEditorProps> = ({
  className,
}) => {
  const authSession = useSelector((state: RootState) => state.auth.inSession);
  return (
    <Routes>
      <Route path={"/"}>
        <Route
          index
          element={
            !authSession ? (
              <BonadocsEditorLogin className={className} />
            ) : (
              <BonadocsEditorTeams />
            )
          }
        />

        <Route path="login" element={<BonadocsEditorLogin />} />
        <Route element={<BonadocsEditorLayout />}>
          <Route
            path="contracts"
            element={<BonadocsEditorContracts className={className} />}
          />
          <Route
            path="variables"
            element={<BonadocsEditorVariables className={className} />}
          />
          <Route
            path="actions"
            element={<BonadocsEditorActions className={className} />}
          />
        </Route>
      </Route>

      <Route path={"teams"} element={<ProtectedRoute />}>
        <Route index element={<BonadocsEditorTeams />} />
        <Route path="invite" element={<BonadocsEditorTeamsInvite />} />
        <Route path=":id">
          <Route index element={<BonadocsEditorProjects />} />
          <Route path={"projects"}>
            <Route index element={<BonadocsEditorProjects />} />
            <Route path="create" element={<BonadocsEditorProjectsCreation />} />
            <Route path=":projectId" element={<BonadocsEditorLayout />}>
              <Route
                index
                element={<BonadocsEditorContracts className={className} />}
              />
              <Route
                path="contracts"
                element={<BonadocsEditorContracts className={className} />}
              />
              <Route
                path="variables"
                element={<BonadocsEditorVariables className={className} />}
              />
              <Route
                path="actions"
                element={<BonadocsEditorActions className={className} />}
              />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
