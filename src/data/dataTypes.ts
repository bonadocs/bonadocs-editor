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
};

export type playgroundState = "interaction" | "documentation";

export interface Option {
  label: string;
  value: string | number;
}

export interface BonadocsWidgetParamProps {
  name: string;
  type: string;
  overrideKey: string;
}

export const transactionOverridesParams: BonadocsWidgetParamProps[] = [
  {
    name: "From",
    type: "address",
    overrideKey: "from",
  },
  {
    name: "Value",
    type: "number",
    overrideKey: "value",
  },

  {
    name: "Gas",
    type: "number",
    overrideKey: "gasLimit",
  },
  {
    name: "Gas price",
    type: "gwei",
    overrideKey: "gasPrice",
  },
];
