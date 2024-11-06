import React, { useEffect } from "react";
import { CodeBlock } from "@/components/codeBlock/CodeBlock";
import { useCollectionContext } from "@/context/CollectionContext";

interface BonadocsEditorViewActionsOutputResponseProps {
  width: string;
}
export const BonadocsEditorViewActionsOutputResponse: React.FC<
  BonadocsEditorViewActionsOutputResponseProps
> = ({ width }) => {
  const { workflowResponse } = useCollectionContext();
  useEffect(() => {}, [workflowResponse]);

  const response = () => {
    if (workflowResponse) {
      let responseText = "";
      workflowResponse["consoleLogs"].map((arg: any, i: any) => {
        responseText +=
          typeof arg["args"][0] !== "string"
            ? `\n\n${arg["args"][0]["execResult"]["returnValue"]}` 
            : `\n\n${arg["args"]}`;
      });

      return responseText.substring(2);
    }
  };

  return (
    <>
      {workflowResponse["consoleLogs"] && (
        <CodeBlock style={{ maxWidth: `${width}px` }}>
          {JSON.stringify(workflowResponse["consoleLogs"], null, 2)}
        </CodeBlock>
      )}
    </>
  );
};
