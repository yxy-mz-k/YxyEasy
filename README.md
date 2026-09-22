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
  key: import.meta.env["VITE_GLOB_APP_KEY"],
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
VITE_GLOB_APP_KEY  = 'zhaj'
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

index.html

```html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=0"
    />
    <title><%= title %></title>
    <script type="text/javascript">
      document.write(
        '<script src="./js/config.js?a=' + Math.random() + '"><\/script>',
      );
    </script>
  </head>

  <body>
    <div id="app">
      <style>
        html[data-theme="dark"] .app-loading {
          background-color: #2c344a;
        }

        html[data-theme="dark"] .app-loading .app-loading-title {
          color: rgb(255 255 255 / 85%);
        }

        .app-loading {
          display: flex;
          width: 100%;
          height: 100%;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          background-color: #f4f7f9;
        }

        .app-loading .app-loading-wrap {
          position: absolute;
          top: 50%;
          left: 50%;
          display: flex;
          transform: translate3d(-50%, -50%, 0);
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

        .app-loading .dots {
          display: flex;
          padding: 98px;
          justify-content: center;
          align-items: center;
        }

        .app-loading .app-loading-title {
          display: flex;
          margin-top: 30px;
          font-size: 30px;
          color: rgb(0 0 0 / 85%);
          justify-content: center;
          align-items: center;
        }

        .app-loading .app-loading-logo {
          display: block;
          width: 90px;
          margin: 0 auto;
          margin-bottom: 20px;
        }

        .dot {
          position: relative;
          display: inline-block;
          width: 48px;
          height: 48px;
          margin-top: 30px;
          font-size: 32px;
          transform: rotate(45deg);
          box-sizing: border-box;
          animation: antRotate 1.2s infinite linear;
        }

        .dot i {
          position: absolute;
          display: block;
          width: 20px;
          height: 20px;
          background-color: #0065cc;
          border-radius: 100%;
          opacity: 30%;
          transform: scale(0.75);
          animation: antSpinMove 1s infinite linear alternate;
          transform-origin: 50% 50%;
        }

        .dot i:nth-child(1) {
          top: 0;
          left: 0;
        }

        .dot i:nth-child(2) {
          top: 0;
          right: 0;
          animation-delay: 0.4s;
        }

        .dot i:nth-child(3) {
          right: 0;
          bottom: 0;
          animation-delay: 0.8s;
        }

        .dot i:nth-child(4) {
          bottom: 0;
          left: 0;
          animation-delay: 1.2s;
        }

        @keyframes antRotate {
          to {
            transform: rotate(405deg);
          }
        }

        @keyframes antRotate {
          to {
            transform: rotate(405deg);
          }
        }

        @keyframes antSpinMove {
          to {
            opacity: 100%;
          }
        }

        @keyframes antSpinMove {
          to {
            opacity: 100%;
          }
        }
      </style>
      <div class="app-loading">
        <div class="app-loading-wrap">
          <img
            src="resource/img/logo.png"
            class="app-loading-logo"
            alt="Logo"
          />
          <div class="app-loading-dots">
            <span class="dot dot-spin"><i></i><i></i><i></i><i></i></span>
          </div>
          <div class="app-loading-title"><%= title %></div>
        </div>
      </div>
    </div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

vite.config.ts

```typescript
import { fileURLToPath, URL } from "node:url";

import { loadEnv, defineConfig } from "vite";
import { createVitePlugins } from "./build/vite/plugin";

const httpsRE = /^https:\/\//;
function createProxy(VITE_PROXY?: any) {
  const ret: any = {};
  for (const [prefix, target] of VITE_PROXY) {
    const isHttps = httpsRE.test(target);
    ret[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      rewrite: (path: any) => path.replace(new RegExp(`^${prefix}`), ""),
      ...(isHttps ? { secure: false } : {}),
    };
  }
  return ret;
}
function wrapperEnv(envConf: any): any {
  const ret: any = {};

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName =
      realName === "true" ? true : realName === "false" ? false : realName;

    if (envName === "VITE_PORT") {
      realName = Number(realName);
    }
    if (envName === "VITE_PROXY" && realName) {
      try {
        realName = JSON.parse(realName.replace(/'/g, '"'));
      } catch (error) {
        realName = "";
      }
    }
    ret[envName] = realName;
    if (typeof realName === "string") {
      process.env[envName] = realName;
    } else if (typeof realName === "object") {
      process.env[envName] = JSON.stringify(realName);
    }
  }
  return ret;
}

export default ({ command, mode }: any): any => {
  // const root = process.cwd()
  const env = loadEnv(mode, process.cwd());
  const viteEnv = wrapperEnv(env);
  const { VITE_PORT, VITE_PROXY, VITE_PUBLIC_PATH } = viteEnv;
  const isBuild = command === "build";
  return {
    base: VITE_PUBLIC_PATH,
    // root,
    plugins: createVitePlugins(viteEnv, isBuild),
    resolve: {
      dedupe: [
        "vue",
        "vue-router",
        "pinia",
        "ant-design-vue",
        "dayjs",
        "crypto-js",
        "element-plus",
        "@vueuse/components",
        "@vueuse/core",
        "@vueuse/shared",
        "echarts",
        "xlsx",
        "qrcode",
      ],
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      https: false,
      // Listening on all local IPs
      host: true,
      port: VITE_PORT,
      fs: {
        strict: false, // 关闭严格模式
        // 允许访问依赖库目录
        allow: [
          "..", // 允许上级目录
          "D:/soft/myProject/YxyEasy", // 明确允许依赖库目录
        ],
      },
      proxy: createProxy(VITE_PROXY ?? []),
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            "primary-color": "#0960bd",
          },
          javascriptEnabled: true,
        },
      },
    },
    optimizeDeps: {
      exclude: ["@yxy_27/yxyeasy"],
    },
  };
};
// https://vite.dev/config/
// export default defineConfig(
// })
```

本地测试步骤：

YxyEasy：

1.package.json 的`scripts`:

`"dev": "vite build --mode development --watch",`

2.yarn link (取消链接 yarn unlink)

3.然后 npm run dev

根据连接解决掉报错：

使用的项目：

1.yarn link @yxy_27/yxyeasy (取消链接 yarn unlink @yxy_27/yxyeasy,如果下载依赖需要取消连接)

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
