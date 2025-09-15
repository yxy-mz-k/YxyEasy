# YxyEasy

快速构建页面。

## 特性

- 🚀 基于TypeScript，提供完整类型支持
- 📦 使用Rollup进行打包，支持多种输出格式（CommonJS、ES Module、UMD）
- 🎨 支持CSS/SCSS样式处理
- 🧪 包含测试环境，方便验证功能
- 📚 详细的开发文档和示例

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式（构建并测试）
npm run dev

# 在浏览器中测试
npm run test:browser

# 构建生产版本
npm run build:pro
```

## 目录结构

```
.
├── src/               # 源代码目录
│   ├── index.ts       # 主入口文件
│   └── styles/        # 样式文件
├── build/             # 构建配置
├── dist/              # 打包输出目录
├── types/             # 类型声明文件
├── test-project/      # 测试项目
├── tsconfig.json      # TypeScript配置
└── rollup.config.js   # Rollup配置
```

## 构建输出

构建后将生成以下格式的输出：

- CommonJS (`.js`) - 用于Node.js环境
- ES Modules (`.mjs`) - 用于支持ESM的环境
- UMD (`.umd.js`) - 用于浏览器环境
- 类型声明 (`.d.ts`) - 为TypeScript用户提供类型支持

## 发布到NPM

```bash
# 构建生产版本
npm run build:pro

# 发布到NPM
npm run toPublish
```

## 许可证

MIT
