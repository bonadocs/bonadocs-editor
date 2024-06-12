import { TextInput } from "@/components/input/TextInput";
import React, { useState, useCallback } from "react";
import clsx from "clsx";
import { BonadocsEditorActionsModalPackageAddSearchResult } from "./BonadocsEditorActionsModalPackageAddSearchResult";
import MoonLoader from "react-spinners/ClipLoader";
import _ from "lodash";

interface BonadocsEditorActionsModalPackageAddSearchProps {
  showSearch: (show: boolean) => void;
}

export const BonadocsEditorActionsModalPackageAddSearch: React.FC<
  BonadocsEditorActionsModalPackageAddSearchProps
> = ({ showSearch }) => {
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<Array<any>>([]);
  const showLoader = (loader: boolean) => {

    setLoading(loader);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchResults = useCallback(
    _.debounce(async (searchTerm: string) => {
      if (searchTerm) {
        try {
          const response = await fetch(
            `https://api.npms.io/v2/search?q=${searchTerm?.trim()}`
          );
          const data = await response.json();
          setLoading(false);
          showLoader(false);
          const resultList = data["results"].map((result: any) => {
            return {
              name: result.package.name,
              description: result.package.description,
              github: result.package.links.repository,
              popular: result.score.detail.popularity,
            };
          });
          
          setResults(resultList);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }, 1000),
    []
  );

  return (
    <div
      className={clsx(
        "modal__side__container__search",
        input.length !== 0 && "modal__side__container__search__open"
      )}
    >
      <div className="modal__side__container__search__bar">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.5 21.75C5.85 21.75 1.25 17.15 1.25 11.5C1.25 5.85 5.85 1.25 11.5 1.25C17.15 1.25 21.75 5.85 21.75 11.5C21.75 17.15 17.15 21.75 11.5 21.75ZM11.5 2.75C6.67 2.75 2.75 6.68 2.75 11.5C2.75 16.32 6.67 20.25 11.5 20.25C16.33 20.25 20.25 16.32 20.25 11.5C20.25 6.68 16.33 2.75 11.5 2.75Z"
            fill="#95A8C0"
          />
          <path
            d="M21.9999 22.7499C21.8099 22.7499 21.6199 22.6799 21.4699 22.5299L19.4699 20.5299C19.1799 20.2399 19.1799 19.7599 19.4699 19.4699C19.7599 19.1799 20.2399 19.1799 20.5299 19.4699L22.5299 21.4699C22.8199 21.7599 22.8199 22.2399 22.5299 22.5299C22.3799 22.6799 22.1899 22.7499 21.9999 22.7499Z"
            fill="#95A8C0"
          />
        </svg>
        <TextInput
          className="modal__side__container__input"
          handleChange={(e) => {
            setInput(e.target.value);
            if (e.target.value.length === 0) {
              showSearch(true);
            } else {
              showSearch(false);

              if (e.target.value) {
                if (results?.length === 0) {
                  setLoading(true);
                  showLoader(true);
                }
                fetchResults(e.target.value);
              }
            }
          }}
          placeholder="Search for new packages"
          value={input}
        />
        <svg
          onClick={() => {
            showSearch(true);
            setInput("");
          }}
          className="modal__side__close__img"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#B8C8FF"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 6L6 18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 6L18 18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {loading && (
        <MoonLoader
          className="modal__side__container__search__icon"
          color="#fff"
          loading={true}
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
      <BonadocsEditorActionsModalPackageAddSearchResult
        show={input.length !== 0 ? true : false}
        results={results}
        showLoader={showLoader}
      />
    </div>
  );
};
