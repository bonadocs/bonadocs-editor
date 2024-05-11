import React from "react";
import Editor from "@monaco-editor/react";

interface PlaygroundProps {
  code: string;
  className?: string;
}
export const Playground: React.FC<PlaygroundProps> = ({
  code,
  className,
}: PlaygroundProps) => {
  function handleOnChange(value?: string) {
    console.log(value);
  }
  return (
    <div className={className}>
      <Editor
        defaultLanguage="javascript"
        defaultValue={code.trim()}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          contextmenu: false,
        }}
        onChange={handleOnChange}
      />
    </div>
  );
};
