import React, { useEffect } from "react";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";

interface CodeBlockProps {
  children: React.ReactNode;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ children }) => {
  hljs.registerLanguage("javascript", javascript);
  useEffect(() => {
    hljs.highlightAll();
  });
  return (
    <div className="bonadocs__editor__codeblock">
      <pre>
        <code className="language-javascript">{children}</code>
      </pre>
    </div>
  );
};
