```typescript
// 项目配置, 主要用于开发服务器和 server 使用
// 文件名称 mfe-config.js(暂定)
interface ProjectConfig {
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
  domain: Array<string>;
  // rewrites 支持(暂定)
}

// 由工具自动生成的应用
interface mfeProxyConfig {
  applications: Array<{
    name: string;
    dir: string;
  }>;
}
```

# package list

1. mfe-proxy-cli
2. mfe-proxy-server
3. mfe-proxy-middware

# TODO LIST

1. streaming API support
2. MPA support
3. SSR support
4. friendly API
5. Don't send data when status code is 304 (consider using library instead by hand)
6. local first
7. http config support
8. use momorepo to manage packages instead of separate
