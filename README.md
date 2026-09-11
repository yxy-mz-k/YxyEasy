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
const viewModules = import.meta.glob("./views/**/index.vue");

app.use(yxyeasy, {
  key: "park",
  VITE_ORIGIN: origin,
  VITE_HOST: host,
  isEnv,
  name: "园区档案管理",
  views: viewModules,
});
```

本地测试步骤：

YxyEasy：

1.package.json 的`scripts`:

`"dev": "vite build --mode development --watch",`

2.yarn link

3.然后 npm run dev

根据连接解决掉报错：

使用的项目：

1.yarn link @yxy_27/yxyeasy

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
