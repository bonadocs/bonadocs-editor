import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/button/Button";
import { useCollectionContext } from "@/context/CollectionContext";
import { Playground } from "@/components/playground/Playground";
// import hljs from "highlight.js/lib/core";
// import javascript from "highlight.js/lib/languages/javascript";
// import typescript from "highlight.js/lib/languages/typescript";

// hljs.registerLanguage("javascript", javascript);
// hljs.registerLanguage("typescript", typescript);

interface BonadocsEditorViewActionsCodeViewProps {
  // Add any props you need for your component here
}

export const BonadocsEditorViewActionsCodeView: React.FC<
  BonadocsEditorViewActionsCodeViewProps
> = (props) => {
  const { collection } = useCollectionContext();
  const [codeContent, setCodeContent] = useState<string>(
    `function modifyArrayElements(collection, contractName, functionDataKey, paramSegments, arrayDefinitionIndex, countToAdd = 1) {
  const arrayDefinition = paramSegments[arrayDefinitionIndex]
  if (!arrayDefinition) {
    throw new Error('Invalid selection for add element')
  }

  if (arrayDefinition.baseType !== 'array' || arrayDefinition.length !== -1) {
    throw new Error('Selected element is not a dynamic array')
  }

  const elementDisplaySegments = []
  const arrayInputParam = collection.getInputParamAtPath(contractName, functionDataKey, arrayDefinition.path)
  if (!arrayInputParam) {
    throw new Error('Invalid array selection')
  }
  let generatedCount = countToAdd + Number(collection.getValue(contractName, functionDataKey, arrayDefinition.path))
  if (generatedCount < 1) {
    generatedCount = 1
  }

  collection.updateValue(contractName, {
    key: dataKey,
    subPath: paramPath,
    value: generatedCount.toString()
  })

  paramSegment(collection, contractName, functionDataKey, arrayInputParam, elementDisplaySegments, arrayDefinition.indent, arrayDefinition.path.substring(0, arrayDefinition.path.lastIndexOf('.')))
  const elementsPerItem = (elementDisplaySegments.length - 1) / generatedCount
  paramSegments.splice(arrayDefinitionIndex, 1 + elementsPerItem * generatedCount, ...elementDisplaySegments)
}
`
  );

  return (
    <Playground
      className="bonadocs__editor__dashboard__playground__action__code__view"
      code={codeContent}
    />
  );
};
