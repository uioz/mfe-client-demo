module.exports = {
  // 本项目的路由配置地址, 如果你没有使用默认的名称和放置到根路径
  // 则需要手动指定, 放置相对本文件路由配置文件的完整路径
  // eg. ./src/route.json or ./src/index.json
  routeConfigPath: "./route.json",
  // 使用项目名称作为 static 目录的前缀修饰
  // 即需要请求 /static/[packageName]/xxxx.xxxx
  // 反之则使用默认值 /static/xxxx.xxx
  usePackageNameAsStaticPrefix: true,
  // 需要代理的远程项目地址
  // 例如 ['app1@http://localhost:3000','app2@http://localhost:3001']
  // app1@http://localhost:3000/xxxx/route.json 如果给定路径以 json 结尾
  // app1@http://localhost:3000/xxxx/index.json 读取将该 json 作为配置读取
  // app1@http://localhost:3000/xxxx 且所有的请求会转发到 /xxxx 下
  // 如果它们的路由重复, 越靠前的优先级越高, 当前项目路由的优先级最高
  appThatNeededProxy: ["express-dev-prototype@http://localhost:3000"],
};
