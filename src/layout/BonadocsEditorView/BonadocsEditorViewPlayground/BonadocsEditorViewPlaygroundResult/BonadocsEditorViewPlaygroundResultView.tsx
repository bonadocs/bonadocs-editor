import React, { Fragment } from "react";
import { DisplayResult, ExecutionResult } from "@bonadocs/core";
import { CodeBlock } from "@/components/codeBlock/CodeBlock";

const openBrace = `{`;
const closeBrace = `}`;

function getIndentation(depth: number) {
  return Array(depth).fill(<>&nbsp;&nbsp;</>);
}

function renderArray(
  array: Array<unknown>,
  path: string,
  depth = 0,
  skipIndentation = false,
  sibling?: JSX.Element
) {
  return (
    <Fragment key={path}>
      {!skipIndentation && getIndentation(depth)}
      <span className="bonadocs__editor__codeblock__inner__parenthesis">[</span>
      {array.length ? <br /> : ""}
      {array.map((param, i) =>
        renderObject(
          param,
          `${path}[${i}]`,
          depth + 1,
          false,
          <>
            {i !== array.length - 1 && <>,</>}
            <br />
          </>
        )
      )}
      {array.length ? getIndentation(depth) : ""}
      <span className="bonadocs__editor__codeblock__inner__parenthesis">]</span>
      {sibling}
    </Fragment>
  );
}

function renderPrimitive(
  value: unknown,
  path: string,
  depth = 0,
  skipIndentation = false,
  sibling?: JSX.Element
) {
  if (value == null) {
    return <></>;
  }
  return (
    <Fragment key={path}>
      {!skipIndentation && getIndentation(depth)}
      <span className="bonadocs__editor__codeblock__inner__view">
        {String(value)}
      </span>
      {sibling}
    </Fragment>
  );
}

function renderObject(
  obj: unknown,
  path: string,
  depth = 0,
  skipIndentation = false,
  sibling?: JSX.Element
) {
  if (Array.isArray(obj) && obj.length === 1 && depth === 0) {
    obj = obj[0];
  }

  if (Array.isArray(obj)) {
    return renderArray(obj, path, depth, skipIndentation, sibling);
  }

  if (obj == null || typeof obj !== "object") {
    return renderPrimitive(obj, path, depth, skipIndentation, sibling);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const entries = Object.entries(obj).filter(([_, v]) => v != null);
  return (
    <Fragment key={path}>
      {!skipIndentation && getIndentation(depth)}
      <span className="bonadocs__editor__codeblock__inner__parenthesis">
        {openBrace}
      </span>
      <br />
      {entries.map(([key, value]) => (
        <Fragment key={`${path}.${key}`}>
          {getIndentation(depth + 1)}
          <span className="bonadocs__editor__codeblock__inner__name">
            {key}:&nbsp;
          </span>
          {renderObject(value, `${path}.${key}`, depth + 1, true)}
          <br />
        </Fragment>
      ))}
      {getIndentation(depth)}
      <span className="bonadocs__editor__codeblock__inner__parenthesis">
        {closeBrace}
      </span>
      {sibling}
    </Fragment>
  );
}

type BonadocsEditorViewPlaygroundResultViewProps = {
  response?: Array<DisplayResult | ExecutionResult>;
};

export const BonadocsEditorViewPlaygroundResultView: React.FC<
  BonadocsEditorViewPlaygroundResultViewProps
> = ({ response }) => {
  return (
    <CodeBlock>
      <span className="bonadocs__editor__codeblock__inner"></span>
      {response && renderObject(response, "response")}
    </CodeBlock>
  );
};
