import React, { useEffect } from "react";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";

interface CodeBlockProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ children, style }) => {
  hljs.registerLanguage("javascript", javascript);
  useEffect(() => {
    hljs.highlightAll();
  });
  return (
    <div style={style} className="bonadocs__editor__codeblock">
      <pre>
        <code className="language-javascript">{children}</code>
      </pre>
    </div>
  );
};
