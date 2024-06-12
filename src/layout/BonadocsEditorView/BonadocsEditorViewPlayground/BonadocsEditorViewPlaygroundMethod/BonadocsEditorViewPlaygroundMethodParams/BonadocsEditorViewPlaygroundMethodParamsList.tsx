import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/index";
import { useCollectionContext } from "@/context/CollectionContext";
import { RootState } from "@/store/index";
import { useSelector } from "react-redux";
import { EditorViewPlaygroundTextInputParam } from "./EditorViewPlaygroundTextInputParam";
import { EditorViewPlaygroundSelectInputParam } from "./EditorViewPlaygroundSelectInputParam";
import { setMethodViewValue } from "@/store/method/methodSlice";

export const BonadocsEditorViewPlaygroundMethodParamsList: React.FC<{}> =
  () => {
    const dispatch = useDispatch<AppDispatch>();
    const { getCollection } = useCollectionContext();
    const [counts, setCounts] = React.useState<number>(0);
    const methodDisplayData = useSelector(
      (state: RootState) => state.method.methodDisplayData
    );

    return methodDisplayData ? (
      <>
        {methodDisplayData.map(
          (
            {
              name,
              index,
              baseType,
              indent,
              arrayIndex,
              arrayPath,
              path,
              indexInArray,
            },
            i
          ) => (
            <div
              className={`bonadocs__editor__method__params__item ${
                indent === 0 && "bt-1"
              }`}
              key={i}
              style={{ paddingLeft: `${indent * 1.4}rem` }}
            >
              <div
                className={`${
                  baseType === "tuple" || baseType === "array"
                    ? "bonadocs__editor__method"
                    : ""
                }`}
              >
                <div
                  className={`${
                    baseType === "tuple" || baseType === "array" || arrayPath
                      ? "bonadocs__editor__method"
                      : ""
                  }`}
                >
                  <div className="bonadocs__editor__method__params">
                    <span className="bonadocs__editor__method__params__name">
                      {name}
                    </span>{" "}
                    ({baseType})
                  </div>
                  {baseType === "array" && (
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a
                      className="bonadocs__editor__method__params__button"
                      onClick={async () => {
                        await dispatch(
                          setMethodViewValue({
                            collection: getCollection()!,
                            addIndex: index,
                          })
                        );

                        setCounts(counts + 1);
                      
                      }}
                    >
                      <svg
                        className="bonadocs__method__parameters__button__img"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 256 256"
                      >
                        <g fill="currentColor">
                          <path
                            d="M224 128a96 96 0 1 1-96-96a96 96 0 0 1 96 96"
                            opacity=".2"
                          />
                          <path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88m48-88a8 8 0 0 1-8 8h-32v32a8 8 0 0 1-16 0v-32H88a8 8 0 0 1 0-16h32V88a8 8 0 0 1 16 0v32h32a8 8 0 0 1 8 8" />
                        </g>
                      </svg>
                      Add array property
                    </a>
                  )}
                  {arrayPath && (
                    <div
                      className="bonadocs__editor__method__params__button"
                      onClick={async () => {
                        await dispatch(
                          setMethodViewValue({
                            collection: getCollection()!,
                            arrayIndex,
                            indexInArray,
                            path,
                          })
                        );
                        setCounts(counts - 1);
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14 3.98763C11.78 3.76763 9.54667 3.6543 7.32 3.6543C6 3.6543 4.68 3.72096 3.36 3.8543L2 3.98763"
                          stroke="#B50037"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5.66699 3.31398L5.81366 2.44065C5.92033 1.80732 6.00033 1.33398 7.12699 1.33398H8.87366C10.0003 1.33398 10.087 1.83398 10.187 2.44732L10.3337 3.31398"
                          stroke="#B50037"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12.5669 6.09375L12.1336 12.8071C12.0603 13.8537 12.0003 14.6671 10.1403 14.6671H5.86026C4.00026 14.6671 3.94026 13.8537 3.86693 12.8071L3.43359 6.09375"
                          stroke="#B50037"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.88672 11H9.10672"
                          stroke="#B50037"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.33301 8.33398H9.66634"
                          stroke="#B50037"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="bonadocs__method__parameters__button__remove">
                        Remove
                      </span>
                    </div>
                  )}
                </div>
                {baseType !== "tuple" &&
                  baseType !== "array" &&
                  baseType !== "bool" && (
                    <EditorViewPlaygroundTextInputParam
                      path={path}
                      name={name}
                      baseType={baseType}
                      collection={getCollection()!}
                      className="bonadocs__editor__method__params__input"
                    />
                  )}
                {baseType === "bool" && (
                  <EditorViewPlaygroundSelectInputParam
                    collection={getCollection()!}
                    path={path}
                    options={[
                      { label: "true", value: "true" },
                      { label: "false", value: "false" },
                    ]}
                    className="bonadocs__editor__method__params__input"
                  />
                )}
              </div>
            </div>
          )
        )}
      </>
    ) : (
      <></>
    );
  };
