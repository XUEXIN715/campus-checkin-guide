# 校园指南 - Campus Guide

一个基于 Vue3 + Vite + TailwindCSS 构建的校园指南展示网站。

## 功能特性

### 🏠 首页功能
- **景点展示**：展示12+个校园景点，包含图片、名称、描述和位置信息
- **搜索功能**：支持按景点名称和描述进行搜索
- **分类筛选**：支持按学习、运动、生活、风景四大类别筛选
- **点赞收藏**：支持对景点点赞，数据持久化存储
- **图片预览**：支持Lightbox图片查看器，支持键盘左右切换

### 👤 关于页面
- **站长介绍**：展示站长信息和网站统计数据
- **留言板**：支持用户留言，使用localStorage存储

### ✨ 高级特性
- **图片懒加载**：优化页面加载性能
- **返回顶部**：一键返回页面顶部
- **响应式布局**：完美适配桌面端和移动端
- **动画效果**：滚动动画、悬浮交互、过渡动画

## 技术栈

- **框架**: Vue 3 (Composition API)
- **构建工具**: Vite 6
- **样式**: TailwindCSS 3
- **图标**: Lucide Vue Next
- **数据存储**: localStorage

## 项目结构

```
campus-checkin-guide/
├── src/
│   ├── components/          # 组件目录
│   │   ├── Header.vue       # 页头导航
│   │   ├── SpotCard.vue     # 景点卡片
│   │   ├── SearchBar.vue    # 搜索栏
│   │   ├── CategoryFilter.vue # 分类筛选
│   │   ├── CommentBoard.vue # 留言板
│   │   ├── Lightbox.vue     # 图片预览灯箱
│   │   └── BackToTop.vue    # 返回顶部按钮
│   ├── views/              # 页面视图
│   │   ├── Home.vue         # 首页
│   │   └── About.vue        # 关于页面
│   ├── data/               # 模拟数据
│   │   └── spots.js         # 校园景点数据
│   ├── utils/              # 工具函数
│   │   └── storage.js       # localStorage封装
│   ├── App.vue             # 根组件
│   ├── main.js             # 入口文件
│   └── style.css           # 全局样式
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173 查看效果。

### 生产构建

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

## 部署到 GitHub Pages

1. 安装 gh-pages 依赖：
```bash
npm install -D gh-pages
```

2. 在 `package.json` 中添加脚本：
```json
{
  "scripts": {
    "deploy": "gh-pages -d dist"
  }
}
```

3. 配置 vite.config.js：
```js
export default defineConfig({
  base: '/campus-checkin-guide/'
})
```

4. 部署：
```bash
npm run build
npm run deploy
```

## 数据说明

所有数据均为前端本地数据，使用 localStorage 存储点赞和留言信息，无需后端支持。

## License

MIT