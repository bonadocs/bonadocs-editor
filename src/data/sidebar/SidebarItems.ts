import { ReactComponent as ActionIcon } from "@/assets/SidebarIcons/action.svg";
import { ReactComponent as ContractIcon } from "@/assets/SidebarIcons/contract.svg";
import { ReactComponent as VariableIcon } from "@/assets/SidebarIcons/variable.svg";
import { ReactComponent as SettingIcon } from "@/assets/SidebarIcons/setting.svg";
import { ReactComponent as HelpIcon } from "@/assets/SidebarIcons/help.svg";
import React from "react";

interface SidebarItemsProp {
  name: string;
  route: string;
  icon?: JSX.Element;
  link?: string;
}

export const SidebarItems: SidebarItemsProp[] = [
  {
    name: "Contracts",
    route: "/contracts",
    icon: React.createElement(ContractIcon),
  },
  {
    name: "Actions",
    route: "/actions",
    icon: React.createElement(ActionIcon),
  },
  {
    name: "Variables",
    route: "/variables",
    icon: React.createElement(VariableIcon),
  },
];

export const SidebarOptions: SidebarItemsProp[] = [
  // {
  //   name: "Settings",
  //   route: "",
  //   icon: React.createElement(SettingIcon),
  // },
  {
    name: "Help",
    route: "",
    icon: React.createElement(HelpIcon),
    link: "https://bonadocs.com",
  },
];
