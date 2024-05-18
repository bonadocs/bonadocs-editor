import {
  CollectionDataManager,
  TransactionOverrides,
  CodeSnippet,
} from "@bonadocs/core";
export type VariableItem = {
  name: string;
  value?: string;
};

export type MethodItem = {
  name: string;
  fragmentKey: string;
  readMethod: boolean;
  contractId?: string;
  instances?: Array<Instance>;
};

export type Instance = {
  chainId: number;
  address: string;
};

export type ContractItem = {
  name: string;
  contractId: string;
  methodItem: Array<MethodItem>;
  instances: Array<Instance>;
  uri?: string;
};

export type ActionItem = {
  id: string;
  name: string;
  documentation?: string;
  code: CodeSnippet[] ;
};

export type WorkflowItem = {
  collection: CollectionDataManager;
  workflowName?: string;
  workflowId?: string;
};

export type WorkflowCodeItem = {
  collection: CollectionDataManager;
  workflowId: string;
  code: string;
};

export type playgroundState = "interaction" | "documentation";

export interface Option {
  label: string;
  value: string | number;
}

export interface BonadocsWidgetParamProps {
  name: string;
  type: string;
  overrideKey: keyof TransactionOverrides;
  description: string;
}

export const transactionOverridesParams: BonadocsWidgetParamProps[] = [
  {
    name: "From",
    type: "address",
    overrideKey: "from",
    description: "The address that's initiating the transaction",
  },
  {
    name: "Value",
    type: "number",
    overrideKey: "value",
    description: "The token value to be used in the transaction",
  },

  {
    name: "Gas",
    type: "number",
    overrideKey: "gasLimit",
    description: "The amount of gas to be used in the transaction",
  },
  {
    name: "Gas price",
    type: "gwei",
    overrideKey: "gasPrice",
    description: "The gas price to be used in the transaction",
  },
];
