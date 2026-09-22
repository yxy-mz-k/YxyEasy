# Vue 3 + TypeScript + Vite

发布到线上步骤：

1.修改功能完之后更新 package.json 的版本号

2.删除 dist 文件

3.重新打包 npm run build

4.登录 npm login

5.发布 npm publish

（可以通过 authenticator 这个 app 验证）

使用项目

1.yarn add @yxy_27/yxyeasy

2.main.ts

```typescript
import yxyeasy from "@yxy_27/yxyeasy";
import "@yxy_27/yxyeasy/dist/style.css";

const isEnv = import.meta.env["MODE"] === "development" ? true : false;
const origin = isEnv ? import.meta.env["VITE_ORIGIN"] : window.location.origin;
const host = isEnv ? import.meta.env["VITE_HOST"] : window.location.host;
const VITE_PUBLIC_PATH = import.meta.env["VITE_PUBLIC_PATH"];
const VITE_GLOB_API_URL = import.meta.env["VITE_GLOB_API_URL"];
const viewModules = import.meta.glob("./views/**/*.vue");

app.use(yxyeasy, {
  key: import.meta.env["VITW_KEY"],
  name: import.meta.env["VITE_GLOB_APP_TITLE"],
  // appId: 'uauth',
  // project: '/center/',
  VITE_ORIGIN: origin,
  VITE_HOST: host,
  isEnv,
  VITE_PUBLIC_PATH,
  // VITE_GLOB_API_URL,
  views: viewModules,
  whitePathList: ["/DURegister"],
  basicRoutes: [
    {
      path: "/register",
      name: "DURegister",
      component: () => import("@/views/DURegister/index.vue"),

      meta: {
        title: "排水户注册",
      },
    },
  ],
});
```

.env

```shell
VITE_PORT = 3100
VITW_KEY  = 'zhaj'
VITE_GLOB_APP_TITLE = '智慧安监'
```

.env.development

```shell

# VITE_PROXY = [["/basic-api","http://192.168.6.2:8899/"],["/upload","http://192.168.6.2:8899/upload"],["/oss","http://192.168.6.2:8899/oss"]]
# VITE_ORIGIN = 'http://192.168.6.2:8899'
# VITE_HOST = '192.168.6.2:8899'
# VITE_PUBLIC_PATH = /center/
# VITE_GLOB_API_URL=/basic-api



VITE_PROXY = [["/zhaj-center","http://192.168.6.2:8899/"],["/upload","http://192.168.6.2:8899/upload"],["/oss","http://192.168.6.2:8899/oss"]]
VITE_ORIGIN = 'http://192.168.6.2:8899'
VITE_HOST = '192.168.6.2:8899'
VITE_PUBLIC_PATH = /zhaj/
```

同时修改.env .env.development

本地测试步骤：

YxyEasy：

1.package.json 的`scripts`:

`"dev": "vite build --mode development --watch",`

2.yarn link (取消链接 yarn unlink)

3.然后 npm run dev

根据连接解决掉报错：

使用的项目：

1.yarn link @yxy_27/yxyeasy (取消链接 yarn unlink @yxy_27/yxyeasy)

2.vite.config.ts 修改

```typescript
server: {
    fs: {
      strict: false, // 关闭严格模式
      // 允许访问依赖库目录
      allow: [
        '..', // 允许上级目录
        'D:/soft/myProject/YxyEasy', // 明确允许依赖库目录
      ],
    },
},
optimizeDeps: {
  exclude: ['@yxy_27/yxyeasy'],
},
```

3.npm run dev
