const path = require("path");
module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          fs: false,
          path: false,
          os: false,
          "fs/promises": false,
          "vm": false,
        },
      },
    },

    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};
