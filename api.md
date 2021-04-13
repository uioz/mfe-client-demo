```typescript
interface ProjectConfig {
    // 使用项目名称作为 static 目录的前缀修饰
    // 即需要请求 /static/[packageName]/xxxx.xxxx
    // 反之则只使用目录作为前缀
    usePackageNameAsStaticPrefix:boolean;
    // 需要代理的远程项目地址
    // 例如 ['app1@http://localhost:3000','app2@http://localhost:3001']
    // 如果它们的路由重复, 越靠前的优先级越高, 当前项目路由的优先级最高
    appThatneededProxy:Array<string>;
}

interface routeJson {
    // domain 表示路由所接管的路由地址, 当前路由如果以这些字符串开头
    // 那么返回持有该配置的应用所匹配的页面
    // 所有的路径将会交由 path-to-regexp 进行解析
    // 例如 ['/home','/about*','^/next-(step|mission)/.+']
    domain:Array<string>;
    // 或者存储为对象, 给对应的路由地址提供一个名称
    // 这样在引入这份 JSON 配置后, 可以以编程的方式共用路由
    domain:{
        [routeName:string]:string;
    }
}
```

# TODO LIST

1. streaming API support
2. MPA support
3. SSR support
4. friendly API
5. Don't send data when status code is 304 (consider using library instead by hand)