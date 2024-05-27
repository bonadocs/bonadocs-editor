import React from "react";
import { useCollectionContext } from "@/context/CollectionContext";
interface BonadocsEditorViewPlaygroundResultTabProps {
  // Add any props you need here
}

export const BonadocsEditorViewPlaygroundResultTab: React.FC<
  BonadocsEditorViewPlaygroundResultTabProps
> = (props) => {
  const { response } = useCollectionContext();
  const hasError =
    response?.some((r) => r.parsedError || ("error" in r && r.error)) ?? true;
  const statusClass = hasError ? "error__red" : "connected__green";
  const circleClass = hasError
    ? "error__red__circle"
    : "connected__green__circle";

  return (
    <div
      className={`bonadocs__tab ${statusClass} bonadocs__tab__result__status`}
    >
      <span className={`${circleClass}`}></span>
      <span>{hasError ? "Execution Failed" : "Execution Successful"}</span>
    </div>
  );
};
