import React, { useEffect } from "react";
import { CodeBlock } from "@/components/codeBlock/CodeBlock";
import { useCollectionContext } from "@/context/CollectionContext";

export const BonadocsEditorViewActionsOutputResponse: React.FC = () => {
  const { workflowResponse } = useCollectionContext();

    useEffect(() => { }, [workflowResponse]);
  return (
    <>
      {workflowResponse && (
        <CodeBlock>{JSON.stringify(workflowResponse)}</CodeBlock>
      )}
    </>
  );
};
