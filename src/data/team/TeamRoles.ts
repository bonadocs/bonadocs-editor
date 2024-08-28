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
  },
];
