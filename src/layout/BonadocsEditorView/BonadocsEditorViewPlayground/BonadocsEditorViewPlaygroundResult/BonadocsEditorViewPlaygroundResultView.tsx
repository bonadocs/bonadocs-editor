import React, { Fragment } from "react";
import { DisplayResult, ExecutionResult } from "@bonadocs/core";
import { CodeBlock } from "@/components/codeBlock/CodeBlock";

type BonadocsEditorViewPlaygroundResultViewProps = {
  response?: Array<DisplayResult | ExecutionResult>;
};

export const BonadocsEditorViewPlaygroundResultView: React.FC<
  BonadocsEditorViewPlaygroundResultViewProps
> = ({ response }) => {
  return (
    <CodeBlock>
      {JSON.stringify(
        typeof response === "object" ? response[0] : response ?? "",
        null,
        2
      )}
    </CodeBlock>
  );
};