import { ReactComponent as ActionIcon } from "@/assets/SidebarIcons/action.svg";
import { ReactComponent as ContractIcon } from "@/assets/SidebarIcons/contract.svg";
import { ReactComponent as VariableIcon } from "@/assets/SidebarIcons/variable.svg";
import { ReactComponent as PackagesIcon } from "@/assets/SidebarIcons/packages.svg";
import { ReactComponent as RecentIcon } from "@/assets/SidebarIcons/recent.svg";
import { ReactComponent as TeamIcon } from "@/assets/SidebarIcons/team.svg";
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

export const SidebarTeamItems: SidebarItemsProp[] = [
  {
    name: "Recent",
    route: "/",
    icon: React.createElement(RecentIcon) as React.ReactNode,
  },

  {
    name: "All teams",
    route: "/teams",
    icon: React.createElement(TeamIcon),
  },
];

export const SidebarProjectItems: SidebarItemsProp[] = [
  {
    name: "All projects",
    route: "/projects",
    icon: React.createElement(TeamIcon),
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
    link: "mailto:hello@bonadocs.com",
  },
];
