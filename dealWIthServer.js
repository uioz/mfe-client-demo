const { default: got } = require("got");
const { join } = require("path");
const packageJson = require("./package.json");
const config = require("./config");

const publicPath = "/";

let manifest = undefined;
let appNameMap = new Map();

function staticMiddleware(request, response) {
  const appName = request.params.appName;

  if (appNameMap.has(appName)) {
    const { appUrl } = manifest[appNameMap.get(appName)];

    // TODO: GOT streaming response
  }
}

module.exports = async function dealWithServer() {
  if (
    Array.isArray(config.appThatNeededProxy) ??
    config.appThatNeededProxy.length > 0
  ) {
    const queue = [];

    for (const appBaseInfo of config.appThatNeededProxy) {
      // TODO: 需要改用正则匹配, 因为项目名称和对应的地址都可能含有 @, 直接从 webpack 里取逻辑即可
      const [appName, appUrl] = appBaseInfo.split("@");

      appNameMap.set(
        appName,
        queue.push({
          appName,
          appUrl,
          appDomain: (async () => {
            const { body } = await got.get(appUrl + "/route.json", {
              responseType: "json",
            });

            // transfer to Regexp('^xxxx') from 'xxxx'
            // transfer to Regexp('^xxxx') from '^xxxx'
            if (body.domain ?? Array.isArray(body.domain)) {
              return body.domain;
            }

            return [];
          })(),
        }) - 1
      );
    }

    for (const appBaseInfo of queue) {
      appBaseInfo.appDomain = await appBaseInfo.appDomain;
    }

    manifest = queue;
    debugger
  }

  return {
    before(app) {
      if (manifest) {
        // host static
        app.get("/static/:appName", staticMiddleware);

        for (const appBaseInfo of manifest) {
          for (const regexp of appBaseInfo.appDomain) {
            app.get(regexp, (request, response) => {
              // TODO: GOT streaming response
              // got.get(`${appBaseInfo.appUrl}/${request.url}`);
            });
          }
        }
      }
    },
    proxy: {
      "/api": "http://localhost:3000",
    },
    historyApiFallback: true,
    contentBase: join(__dirname, "static"),
    // optional down below
    contentBasePublicPath: config.usePackageNameAsStaticPrefix
      ? `/static/${packageJson.name}`
      : "/static",
    publicPath,
    clientLogLevel: "silent",
    noInfo: true,
    historyApiFallback: true,
    hot: true,
    port: 8080,
    compress: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  };
};
