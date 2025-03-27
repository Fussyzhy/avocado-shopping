# 🥑 牛油果商城 (Avocado Shopping)

牛油果商城是一个基于Vue.js开发的移动端电商应用，专注于提供优质的牛油果及相关产品的在线购物体验。 🛒

## ⚙️ 项目技术栈

- 前端框架：Vue 2.6.14
- 路由管理：Vue Router 3.5.1
- 状态管理：Vuex 3.6.2
- UI组件库：Vant 2.13.2
- HTTP请求：Axios 1.7.7
- CSS预处理器：Less 4.0.0
- 构建工具：Vue CLI 5.0.0

## 🚀 安装与运行

### 📋 环境要求
- Node.js (推荐v14.0.0以上)
- npm 或 yarn

### 📥 安装步骤

```bash
# 克隆项目
git clone [项目仓库地址]

# 进入项目目录
cd avocado-shopping

# 安装依赖
yarn install
# 或
npm install

# 启动开发服务器
yarn serve
# 或
npm run serve
```

### 📦 构建生产版本

```bash
yarn build
# 或
npm run build
```

## ✨ 项目功能

### 🔍 主要功能

- **首页展示**：轮播图、商品分类导航、推荐商品展示
- **商品分类**：多级商品分类浏览
- **商品搜索**：支持关键词搜索商品
- **商品详情**：商品图片轮播、价格展示、商品描述、用户评价
- **购物车**：添加/删除商品、修改商品数量、商品选择/取消、结算功能
- **用户中心**：用户信息管理
- **订单管理**：订单创建、订单列表、订单详情
- **支付功能**：订单支付流程

### 🌟 特色功能

- 响应式设计，适配各种移动设备
- 商品图片懒加载，提升页面加载性能
- 本地存储用户信息，提升用户体验

## 📁 项目结构

```
├── public/                 # 静态资源目录
├── src/                    # 源代码目录
│   ├── api/                # API接口目录
│   ├── assets/             # 图片等资源文件
│   ├── components/         # 公共组件
│   ├── router/             # 路由配置
│   ├── store/              # Vuex状态管理
│   ├── styles/             # 全局样式文件
│   ├── utils/              # 工具函数
│   ├── views/              # 页面组件
│   │   ├── layout/         # 布局组件
│   │   ├── login/          # 登录相关页面
│   │   ├── myorder/        # 订单相关页面
│   │   ├── pay/            # 支付相关页面
│   │   ├── prodetail/      # 商品详情页面
│   │   └── search/         # 搜索相关页面
│   ├── App.vue             # 根组件
│   └── main.js             # 入口文件
├── .browserslistrc         # 浏览器兼容配置
├── .editorconfig           # 编辑器配置
├── .eslintrc.js            # ESLint配置
├── babel.config.js         # Babel配置
├── package.json            # 项目依赖配置
├── postcss.config.js       # PostCSS配置
└── vue.config.js           # Vue CLI配置
```

## 👨‍💻 开发团队

- [张昊阳]

## 📄 许可证

[许可证类型] © [年份] [版权所有者]