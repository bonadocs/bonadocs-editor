import React, { useEffect, useState } from "react";
import { BonadocsEditorActionsModalPackageAddSearchResultItem } from "./BonadocsEditorActionsModalPackageAddSearchResultItem";
import axios from "axios";
import { toast } from "react-toastify";

interface BonadocsEditorActionsModalPackageAddSearchResultProps {
  show?: boolean;
  results?: any;
  showLoader: (loader: boolean) => void;
}

export const BonadocsEditorActionsModalPackageAddSearchResult: React.FC<
  BonadocsEditorActionsModalPackageAddSearchResultProps
> = ({ show, results, showLoader }) => {
  const [resultItems, setResults] = useState<Array<any>>(results);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      {show && results && (
        <div className="modal__side__container__result">
          {results.map((result: any, i: any) => (
            <BonadocsEditorActionsModalPackageAddSearchResultItem
              key={i}
              name={result.name}
              description={result.description}
              github={result.github}
              popular={result.popular > 0.7 ? true : false}
            />
          ))}
        </div>
      )}
    </>
  );
};
