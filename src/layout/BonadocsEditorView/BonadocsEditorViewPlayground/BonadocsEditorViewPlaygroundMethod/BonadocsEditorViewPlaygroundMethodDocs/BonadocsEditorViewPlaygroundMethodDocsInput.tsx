import React, { useEffect, useRef, useCallback } from "react";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { setMethodViewDocs } from "@/store/method/methodSlice";
import { useCollectionContext } from "@/context/CollectionContext";
import { RootState } from "@/store/index";
import { useSelector } from "react-redux";

interface BonadocsEditorViewPlaygroundMethodDocsInputProps {
  markdownInput: string;
  setMarkdownInput: (markdownInput: string) => void;
}
export const BonadocsEditorViewPlaygroundMethodDocsInput: React.FC<
  BonadocsEditorViewPlaygroundMethodDocsInputProps
> = ({ markdownInput, setMarkdownInput }) => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { getCollection } = useCollectionContext();
  const method = useSelector((state: RootState) => state.method.methodItem);

  const setCurrentMethodDocs = useCallback(
    _.debounce(async (docs: string) => {
      dispatch(
        setMethodViewDocs({
          collection: getCollection()!,
          docs,
        })
      );
      console.log(docs, "docs");
    }, 1000),
    []
  );

  useEffect(() => {
    textRef.current?.focus();
  }, []);

  return (
    <textarea
      ref={textRef}
      value={markdownInput}
      onChange={(e) => {
        setMarkdownInput(e.target.value);
        if (method) {
          setCurrentMethodDocs(e.target.value);
        }
      }}
      className="bonadocs__editor__dashboard__playground__method__view__markdown"
    />
  );
};
