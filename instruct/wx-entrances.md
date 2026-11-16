# WX 独立入口说明

本项目包含专为微信环境（微信小程序/微信浏览器）设计的独立入口页面。这些页面以 `-wx.md` 后缀命名，配置了 `sidebar: false` 和 `navbar: false`，以提供精简的、适合移动端和微信环境的访问体验。

## 入口列表

| 文件路径 | 页面标题 | 用途 |
|---------|---------|------|
| `docs/index-wx.md` | 📚 港科广手册 | 微信版主页面，提供常用快捷入口 |
| `docs/canteen/canteen-wx.md` | 🍜 饭堂服务 | 微信版食堂服务页面（待补充） |

## 技术特点

- **无侧边栏和导航栏**：wx 入口页面均设置 `sidebar: false` 和 `navbar: false`，以适应微信内嵌浏览器的显示环境
- **微信 JS-SDK 支持**：项目通过 `wx_helper.js` 和 `jweixin-1.6.0.js` 提供微信 JS-SDK 支持

## 微信相关资源

- `docs/.vuepress/public/wx_helper.js` - 微信辅助脚本
- 配置文件 `docs/.vuepress/config.ts` 中引入了微信 JS-SDK 相关脚本
