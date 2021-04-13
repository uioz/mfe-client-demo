module.exports = {
  // 使用项目名称作为 static 目录的前缀修饰
  // 即需要请求 /static/[packageName]/xxxx.xxxx
  // 反之则使用默认值 /static/xxxx.xxx
  usePackageNameAsStaticPrefix: true,
  // 需要代理的远程项目地址
  // 例如 ['appName@https://192.168.0.1:80','appName@http://192.168.0.2:8080']
  // 如果它们的路由重复, 越靠前的优先级越高, 当前项目路由的优先级最高
  appThatNeededProxy: ["express-dev-prototype@http://localhost:3000"],
};
