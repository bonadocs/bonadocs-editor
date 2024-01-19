import { ReactComponent as ActionIcon } from "@/data/sidebar/SidebarIcons/action.svg";
import { ReactComponent as ContractIcon } from "@/data/sidebar/SidebarIcons/contract.svg";
import { ReactComponent as VariableIcon } from "@/data/sidebar/SidebarIcons/variable.svg";
import { ReactComponent as SettingIcon } from "@/data/sidebar/SidebarIcons/setting.svg";
import { ReactComponent as HelpIcon } from "@/data/sidebar/SidebarIcons/help.svg";
import React from "react";

interface SidebarItemsProp {
  name: string;
  route: string;
  icon?: JSX.Element;
}

export const SidebarItems: SidebarItemsProp[] = [
  {
    name: "Contracts",
    route: "/",
    icon: React.createElement(ContractIcon),
  },
  {
    name: "Actions",
    route: "/dashboard",
    icon: React.createElement(ActionIcon),
  },
  {
    name: "Variables",
    route: "/page-1",
    icon: React.createElement(VariableIcon),
  },
];

export const SidebarOptions: SidebarItemsProp[] = [
  {
    name: "Settings",
    route: "",
    icon: React.createElement(SettingIcon),
  },
  {
    name: "Help",
    route: "",
    icon: React.createElement(HelpIcon),
  },
];
