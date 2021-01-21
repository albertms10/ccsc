/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: "/",
    src: "/dist",
  },
  installOptions: {
    namedExports: ["antd"],
  },
  plugins: ["@snowpack/plugin-react-refresh", "@snowpack/plugin-dotenv"],
  routes: [{ match: "routes", src: ".*", dest: "/index.html" }],
};
