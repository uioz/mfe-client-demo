```typescript
// 项目配置, 主要用于开发服务器和 server 使用
// 文件名称 mfe-config.js(暂定)
interface ProjectConfig {
  // 打包后输出的路径, 默认 ./dist
  outputDir?:string;
  // 静态资源目录输出的路径, 默认 ./dist/static
  staticDir?:string;
  // 当前项目路由配置的相对地址, 包含扩展名
  // 如果不填写则读取项目根目录的 route.json
  // eg. ./src/route.json
  routeConfigPath?: string;
  // 使用项目名称作为 static 目录的前缀修饰
  // 即需要请求 /static/[packageName]/xxxx.xxxx
  // 反之则只使用目录作为前缀
  // 默认为 true
  usePackageNameAsStaticPrefix?: boolean;
  // 需要代理的远程项目地址
  // 例如 ['app1@http://localhost:3000','app2@http://localhost:3001']
  // app1@http://localhost:3000/xxxx/route.json 可以指定具体路径
  // 如果多个项目路由重复则优先匹配靠前的路由
  // 本地路由的优先级最高
  appThatneededProxy: Array<string>;
}

// 该项目所负责的路由列表
// 文件名 route.json(可以自由修改名称)
interface routeJson {
  // domain 表示路由所接管的路由地址, 当前路由如果以这些字符串开头
  // 那么返回持有该配置的应用所匹配的页面
  // 所有的路径将会交由 path-to-regexp(express) find-my-way(fastify) 进行解析
  // 所以你需要确保所编写的路由兼容上述的两个类库
  // 幸运的是 '99%' 的匹配模式上述的两个库规则都是一致的
  // eg. /path, /path/:id/:arg, /path/*(匹配所有以/path 开头的路径)
  // 具体的路由规则需要先于通用的匹配规则, 例如 /path/specific 要先于 /path/
  domain: Array<string>;
  // domain 基于对象的 API
  // rewrites 支持(暂定)
}

// 由工具自动生成的应用
interface mfeProxyConfig {
  applications: Array<{
    // 应用程序名称(包名称)
    name: string;
    // 所在目录
    dir: string;
    // 路由配置文件地址
    routePath: string;
    // 构建后的输出路径
    outputDir: string;
    // 静态资源路径
    staticDir: string
  }>;
}
```

# package list

1. mfe-cli
2. mfe-server
3. mfe-middleware

# TODO LIST

- 查找 mfe-config.js 文件中的 dist 目录, 默认 dist
- 查找 mfe-config.js 文件中的 static 目录, 默认 dist/static
- 将 `router.json` 改为 `mfe-route.json`
- 考虑将 `mfe-config.js` 与 `mfe-route.json` 进行合并 x 这样会让 `mfe-route` 无法放置到其他位置.
- 使用 typescript 来编写 mfe-server

2. MPA support
3. SSR support
4. friendly API
5. Don't send data when status code is 304 (consider using library instead by hand)
6. local first
7. http config support
8. use momorepo to manage packages instead of separate
9. 移除 npm install 下载时携带的依赖
10. create 支持 git 仓库下载
11. 添加 init 名称, 支持 install 完成后进行初始化
12. 通过 postinstall 自行下载 static
13. debugger support
14. 不针对 HTML 文件以外的文件进行协商缓存(配置开关)
15. create 命令需要支持目录
15. manifest 路径需要使用相对路径而不是绝对路径
16. `middware` 支持无 `route.json` 模式, 在这种情况下优先匹配远程地址
18. `cli` 需要支持增删除改查, 创建一个类来完成 npm 的封装

# 已知问题

1. 应用程序的 /static 路径需要进行修改
2. mfe-example 路由需要先去重, 否则会报错
3. static 目录不应该嵌套到 dist 目录中(如果不会出现重复代理的问题)
4. 强制使用 dist 目录进行代理, 避免泄漏项目信息



1. 扫描 dist 目录下的文件(不进行递归扫描), 然后记录其对应的项目地址存入 Map 中
   1. 当请求进入后检查 Map 如果存在则返回该项目下的文件
   2. 然后进入路由匹配
   3. 优势经过 Map 查询速度非常块, 缺点逻辑复杂, 容易出现问题
2. 直接代理 dist 目录, 排除 `index.html` 和 `static` 地址
   1. 然后进入路由匹配
   2. 实现简单, 容错率高, 效率取决于 `fastify-static`.