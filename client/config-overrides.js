const { override, fixBabelImports, addLessLoader } = require("customize-cra");
const path = require("path");
const fs = require("fs");
const lessToJs = require("less-vars-to-js");

const themeVariables = lessToJs(
  fs.readFileSync(path.join(__dirname, "./ant-theme-vars.less"), "utf8")
);

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      modifyVars: themeVariables,
      javascriptEnabled: true,
    },
  })
);
