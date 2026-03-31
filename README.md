# 作品集网站 - 内容填写指南

## 快速开始

1. 打开 `index.html`，直接在浏览器中预览效果
2. 按照下面的清单逐项替换占位内容
3. 把图片和 PDF 放进 `assets/` 文件夹

## 需要准备的素材

### 个人信息
- [ ] 个人照片（建议 3:4 竖版，至少 600px 宽）→ 放入 `assets/photo.jpg`
- [ ] 名字（替换 HTML 中所有 "你的名字" 和 "YOUR NAME"）
- [ ] 一句话定位（替换 hero-tag：Brand Strategist & Creative Planner）
- [ ] 个人简介文字（2-3 句，替换 about-desc）
- [ ] 数据统计（服务品牌数、管理预算、ROI 等，修改 data-target 值）
- [ ] 联系方式（邮箱、LinkedIn、电话）

### 精选案例 ×3（每个案例需要）
- [ ] 品牌名称
- [ ] 案例类型（品牌策略/创意Campaign/数字营销 等）
- [ ] 年份
- [ ] 案例标题（一句话概括）
- [ ] 主图（建议 16:9，至少 1200px 宽）→ `assets/case{N}-hero.jpg`
- [ ] 挑战描述（2-3 句）
- [ ] 策略描述（2-3 句）
- [ ] 执行描述（2-3 句）
- [ ] 结果数据（2-3 个关键数字 + 标签）
- [ ] 执行图片（2-3 张）→ `assets/case{N}-{描述}.jpg`
- [ ] 方案 PDF → `assets/case{N}-deck.pdf`

### 更多作品 ×4（每个需要）
- [ ] 缩略图（建议 4:3，至少 600px 宽）→ `assets/work{N}.jpg`
- [ ] 项目类型
- [ ] 项目名称
- [ ] 一句话简介

## 如何替换内容

### 替换图片
找到 `<div class="visual-placeholder">` 所在的行，把整个 div 替换为：
```html
<img src="assets/你的图片.jpg" alt="图片描述">
```

### 替换数据数字
找到 `data-target="数字"`，修改数字即可，动画会自动生效。

### 添加视频
在案例的 `case-visual` 区域嵌入：
```html
<video controls poster="assets/video-poster.jpg">
  <source src="assets/video.mp4" type="video/mp4">
</video>
```

## 部署方式

### 方式 1：GitHub Pages（免费，推荐）
1. 在 GitHub 创建仓库
2. 上传所有文件
3. Settings → Pages → 选择 main 分支
4. 得到 `https://你的用户名.github.io/仓库名` 的地址

### 方式 2：Vercel（免费，自动部署）
1. 注册 vercel.com
2. 导入 GitHub 仓库
3. 自动部署，还能绑定自定义域名

### 方式 3：直接发送
把整个文件夹打包发给别人，双击 index.html 就能看。

## 文件结构
```
个人作品集网站/
├── index.html          ← 主页面
├── style.css           ← 样式
├── script.js           ← 交互动画
├── README.md           ← 本文件
└── assets/             ← 素材文件夹
    ├── photo.jpg       ← 个人照片
    ├── case1-hero.jpg  ← 案例1主图
    ├── case1-deck.pdf  ← 案例1方案
    ├── case2-hero.jpg
    ├── case2-deck.pdf
    ├── case3-hero.jpg
    ├── case3-deck.pdf
    ├── work1.jpg       ← 更多作品缩略图
    ├── work2.jpg
    ├── work3.jpg
    └── work4.jpg
```
