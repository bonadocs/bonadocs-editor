export const teamRoles = [
  {
    label: "Viewer",
    value: "viewer",
    permission: ["readCollections", "readUsers"],
  },
  {
    label: "Can edit",
    value: "editor",
    permission: ["readCollections", "writeCollections", "readUsers"],
  },
  {
    label: "Owner",
    value: "owner",
    permission: [
      "readCollections",
      "writeCollections",
      "readUsers",
      "writeUsers",
    ],
  },
  {
    label: "Admin",
    value: "admin",
    permission: [
      "admin",
      "readUsers",
      "writeUsers",
      "manageSubscriptions",
      "readCollections",
      "writeCollections",
    ],
  }
];

export const TeamSettings = [
  { name: "Projects" },
  { name: "Members" },
  { name: "Billing" },
];

export const TeamMembersTable = [
  { name: "Name" },
  { name: "Email" },
  // { name: "Last active" },
  { name: "Permission" },
];

export const TeamBilling = [
  {
    name: "Starter Team",
    price: "Free",
    features: [
      {
        name: "One team and one project",
        description: "Get started with one project playground to explore",
      },
      {
        name: "No invitation",
        description: "Collaborate solo with no invitations",
      },
    ],
  },
  {
    name: "PRO Team",
    price: "$15/member/month",
    features: [
      {
        name: "20 projects",
        description: "Create and manage 20 projects",
      },
      {
        name: "Collaborate with invitations",
        description:
          "Work in real-time with your team, making edits and updates together instantly",
      },
    ],
  },
];
