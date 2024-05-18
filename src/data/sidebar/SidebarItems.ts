import { ReactComponent as ActionIcon } from "@/assets/SidebarIcons/action.svg";
import { ReactComponent as ContractIcon } from "@/assets/SidebarIcons/contract.svg";
import { ReactComponent as VariableIcon } from "@/assets/SidebarIcons/variable.svg";
import { ReactComponent as PackagesIcon } from "@/assets/SidebarIcons/packages.svg";
import { ReactComponent as HelpIcon } from "@/assets/SidebarIcons/help.svg";
import React from "react";

interface SidebarItemsProp {
  name: string;
  route: string;
  icon?: React.ReactNode;
  link?: string;
}

export const SidebarItems: SidebarItemsProp[] = [
  {
    name: "Contracts",
    route: "/contracts",
    icon: React.createElement(ContractIcon) as React.ReactNode,
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
    name: "Packages",
    route: "",
    icon: React.createElement(PackagesIcon),
  },
  {
    name: "Help",
    route: "",
    icon: React.createElement(HelpIcon),
    link: "https://bonadocs.com",
  },
];
