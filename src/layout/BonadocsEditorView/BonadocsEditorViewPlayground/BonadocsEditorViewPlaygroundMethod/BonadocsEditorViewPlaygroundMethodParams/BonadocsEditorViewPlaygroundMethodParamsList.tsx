import React from "react";

interface BonadocsEditorViewPlaygroundMethodParamsListProps {
  name?: string;
  index?: number;
  baseType?: string;
  indent?: number;
  path?: string;
  arrayPath?: string;
  arrayIndex?: number;
  indexInArray?: number;
}
export const BonadocsEditorViewPlaygroundMethodParamsList: React.FC<
  BonadocsEditorViewPlaygroundMethodParamsListProps
> = ({
  name,
  index,
  baseType,
  indent = 1,
  path,
  arrayPath,
  arrayIndex,
  indexInArray,
}) => {
  // Component logic goes here
  return (
    <div
      className={`bonadocs__method__parameters__item ${indent === 0 && "bt-1"}`}
      style={{ paddingLeft: `${indent * 1.4}rem` }}
    >
      <div className="bonadocs__widget__params__name">
        <div className="bonadocs__widget__params__decription">
          <span className="bonadocs__widget__params__name__title">{name}</span>{" "}
          ({baseType})
        </div>
        {baseType !== "tuple" && baseType !== "array" && baseType !== "bool" && (
          // <WorkflowFunctionTextParameter
          //   path={path}
          //   name={name}
          //   baseType={baseType}
          //   functionView={functionView}
          // />
          <></>
        )}
        {baseType === "bool" && (
          //   <WorkflowFunctionSelectParameter
          //     functionView={functionView}
          //     path={path}
          //   />
          <></>
        )}
        {baseType === "array" && (
          <a
            className="bonadocs__method__parameters__button"
            onClick={() => {
              //   functionView.addArrayItem(index);
              //   setCounts(counts + 1);
            }}
          >
            <svg
              className="bonadocs__method__parameters__button__img"
              xmlns="http://www.w3.org/2000/svg"
              width="256"
              height="256"
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
            className="bonadocs__method__parameters__button"
            onClick={() => {
              //   functionView.deleteArrayItem(arrayIndex!, indexInArray!);
              //   setCounts(counts - 1);
            }}
          >
            <div className="bonadocs__method__parameters__button__remove__img"></div>
            <span className="bonadocs__method__parameters__button__remove">
              Remove
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// export const WorkflowFunctionParametersList: React.FC<
//   WorkflowFunctionParametersListProps
// > = ({ functionView, className }) => {
//   const [counts, setCounts] = React.useState<number>(0);

//   return functionView ? (
//     <div className={className}>
//       {functionView.displayData.map(
//         (
//           {
//             name,
//             index,
//             baseType,
//             indent,
//             arrayIndex,
//             arrayPath,
//             path,
//             indexInArray,
//           },
//           i
//         ) => (
//           <div
//             key={i}
//             className={`bonadocs__method__parameters__item ${
//               indent === 0 && "bt-1"
//             }`}
//             style={{ paddingLeft: `${indent * 1.4}rem` }}
//           >
//             <div key={i} className="bonadocs__widget__params__name">
//               <div className="bonadocs__widget__params__decription">
//                 <span className="bonadocs__widget__params__name__title">
//                   {name}
//                 </span>{" "}
//                 ({baseType})
//               </div>
//               {baseType !== "tuple" &&
//                 baseType !== "array" &&
//                 baseType !== "bool" && (
//                   <WorkflowFunctionTextParameter
//                     path={path}
//                     name={name}
//                     baseType={baseType}
//                     functionView={functionView}
//                   />
//                 )}
//               {baseType === "bool" && (
//                 <WorkflowFunctionSelectParameter
//                   functionView={functionView}
//                   path={path}
//                 />
//               )}
//               {baseType === "array" && (
//                 <a
//                   className="bonadocs__method__parameters__button"
//                   onClick={() => {
//                     functionView.addArrayItem(index);
//                     setCounts(counts + 1);
//                   }}
//                 >
//                   <svg
//                     className="bonadocs__method__parameters__button__img"
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="256"
//                     height="256"
//                     viewBox="0 0 256 256"
//                   >
//                     <g fill="currentColor">
//                       <path
//                         d="M224 128a96 96 0 1 1-96-96a96 96 0 0 1 96 96"
//                         opacity=".2"
//                       />
//                       <path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88m48-88a8 8 0 0 1-8 8h-32v32a8 8 0 0 1-16 0v-32H88a8 8 0 0 1 0-16h32V88a8 8 0 0 1 16 0v32h32a8 8 0 0 1 8 8" />
//                     </g>
//                   </svg>
//                   Add array property
//                 </a>
//               )}
//               {arrayPath && (
//                 <div
//                   className="bonadocs__method__parameters__button"
//                   onClick={() => {
//                     functionView.deleteArrayItem(arrayIndex!, indexInArray!);
//                     setCounts(counts - 1);
//                   }}
//                 >
//                   <div className="bonadocs__method__parameters__button__remove__img"></div>
//                   <span className="bonadocs__method__parameters__button__remove">
//                     Remove
//                   </span>
//                 </div>
//               )}
//             </div>
//           </div>
//         )
//       )}
//     </div>
//   ) : (
//     <></>
//   );
// };
