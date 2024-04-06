import React from "react";

interface CodeBlockProps {
  children: React.ReactNode;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ children }) => {
  return (
    <div className="bonadocs__editor__codeblock">
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
};
