# 港科广手册 / HKUST(GZ) Online Manual

为香港科技大学（广州）学生和校友提供常用信息入口、校园生活指南与服务说明。

本仓库基于[南科手册（sustech-online-ng）](https://github.com/SUSTech-CRA/sustech-online-ng)改造而来，源项目以 CC BY-SA 4.0 协议发布。

## 内容结构

```text
.
├── docs/
│   ├── about/        # 关于本站
│   ├── calendar/     # 校历
│   ├── canteen/      # 食堂
│   ├── contact/      # 常用联系方式
│   ├── emergency/    # 应急处理
│   ├── facility/     # 校园设施
│   ├── life/         # 校园生活
│   ├── service/      # 服务指南
│   ├── study/        # 学习、选课、教务
│   ├── surroundings/ # 周边
│   └── transport/    # 交通
├── scripts/
├── tools/
└── package.json
```

## 本地开发

### 环境要求

- Node.js v24
- pnpm

```bash
pnpm install
pnpm run docs:dev      # 本地预览
pnpm run docs:build    # 完整构建
```

## 许可证

This work is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).
