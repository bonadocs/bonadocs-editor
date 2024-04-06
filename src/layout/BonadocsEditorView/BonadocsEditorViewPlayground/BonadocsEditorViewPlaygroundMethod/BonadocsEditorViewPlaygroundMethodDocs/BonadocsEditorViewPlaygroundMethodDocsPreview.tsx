import React from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface BonadocsEditorViewPlaygroundMethodDocsPreviewProps {
  markdownInput: string;
}
export const BonadocsEditorViewPlaygroundMethodDocsPreview: React.FC<
  BonadocsEditorViewPlaygroundMethodDocsPreviewProps
> = ({ markdownInput }) => {
  // Component logic here
  return (
    <div className="bonadocs__editor__dashboard__playground__method__view__preview">
      <Markdown
        children={markdownInput}
        components={{
          code(props) {
            const { children, className, node, ...rest } = props;
            const { ref, ...otherProps } = rest;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter
                {...otherProps}
                PreTag="div"
                children={String(children).replace(/\n$/, "")}
                language={match[1]}
                style={dark}
              />
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
      />
    </div>
  );
};
