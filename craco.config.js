const path = require("path");
module.exports = {
  webpack: {
    configure: (config) => {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
        "fs/promises": false,
        vm: false,
      };
      config.experiments = {
        asyncWebAssembly: true,
        layers: true,
      };

      // turn off static file serving of WASM files
      // we need to let Webpack handle WASM import
      config.module.rules
        .find((i) => "oneOf" in i)
        .oneOf.find((i) => i.type === "asset/resource")
        .exclude.push(/\.wasm$/);
      return config;
    },

    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};

// module.exports = {
//   webpack: {
//     configure: (config) => {
//       config.experiments = {
//         asyncWebAssembly: true,
//         layers: true,
//       };

//       // turn off static file serving of WASM files
//       // we need to let Webpack handle WASM import
//       config.module.rules
//         .find((i) => "oneOf" in i)
//         .oneOf.find((i) => i.type === "asset/resource")
//         .exclude.push(/\.wasm$/);

//       return config;
//     },
//   },
// };
