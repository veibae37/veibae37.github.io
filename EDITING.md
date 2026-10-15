# 网站修改指南

网站：https://veibae37.github.io/

仓库：https://github.com/veibae37/veibae37.github.io

## 要改什么，去哪里改

| 内容 | 文件 | 定位方式 |
| --- | --- | --- |
| 姓名、个人简介、联系方式、导航 | `templates/index.html` | 搜索 `LIU Yitao`、`bio`、`profile-links`、`Main navigation` |
| 学校、专业、毕业年份 | `templates/index.html` | 搜索 `id="education"` |
| 公司、职位、实习日期和说明 | `templates/index.html` | 搜索 `id="experience"` 或公司名 |
| 技能、活动和荣誉 | `templates/index.html` | 搜索 `Technical skills`、`id="beyond"` |
| 照片署名 | `templates/index.html` | 搜索 `photo-credit`；保持在折叠区域中 |
| 个人照片 | `assets/profile-photo.jpg` | 替换同名文件；若比例变化，同步修改模板中图片的 `width` 和 `height` |
| 学校、公司 logo | `assets/logos/` | 替换图片，或在模板中修改对应的 `img src`；来源记录在 `sources.json` |
| Quant 大类名称和介绍 | `content/projects.json` | 修改 `category`、`description`、`url` |
| 项目名称、介绍、链接、顺序 | `content/projects.json` | 修改 `projects` 数组；数组顺序就是菜单顺序 |
| 新增或删除项目 | `content/projects.json` | 新增或删除一个完整项目对象，再生成页面 |
| 参考文献 | `content/projects.json` | 修改顶层 `references`；项目里的 `references` 填引用的 ID |
| 课程项目 | `templates/index.html` | 搜索 `course-project` |
| 主题色、字体、间距、字号、手机布局 | `styles.css` | 红色为 `--red`；手机规则在 `@media` 中 |
| 折叠菜单和照片说明结构 | `templates/index.html`、`scripts/build.py` | 外层 Quant 在模板中；项目折叠项由生成脚本创建 |
| 分享链接自动展开、引用跳转行为 | `navigation.js` | `revealHash()` |
| PDF / Word 简历下载 | `assets/LIU-Yitao-CV.pdf`、`assets/LIU-Yitao-CV.docx` | 替换同名文件；同时更新旧链接使用的 `resume of Liuyitao.pdf` |
| 浏览器标题、搜索简介、分享信息 | `templates/index.html` | 修改 `<title>`、`description`、`og:` |
| 标签页图标 | `assets/favicon.svg` | 替换图标 |
| 页脚更新时间 | `templates/index.html` | 搜索 `Updated` |

## 修改后如何生效

`index.html` 是生成结果。应修改模板或项目数据，再生成它；直接修改它会在下次生成时被覆盖。

在本地 `website` 文件夹打开终端：

```powershell
python scripts/build.py
git diff --check
git diff
```

预览可使用：

```powershell
python -m http.server 8000
```

打开 `http://localhost:8000`，确认内容、折叠菜单和手机布局后提交：

```powershell
git add templates/index.html content/projects.json index.html styles.css navigation.js assets README.md EDITING.md scripts/build.py "resume of Liuyitao.pdf"
git commit -m "Update personal homepage"
git push origin main
```

只修改了其中几个文件也可以只添加那些文件。更改模板或 JSON 时，必须把重新生成的 `index.html` 一并提交。更换图片、PDF 或 CSS 后无需重新生成 HTML，除非文件路径发生变化。

GitHub Pages 会从 `main` 分支根目录自动发布，可在仓库 **Actions → pages build and deployment** 查看结果。它目前不会自动运行 Python 生成脚本，因此仅在 GitHub 网页编辑模板或 JSON 不会直接更新首页。

## 项目字段说明

- `id`：唯一、稳定的英文标识，用于分享链接；尽量不要改已有 ID。
- `title`、`subtitle`：项目标题与副标题。
- `summary`、`details`：简述与段落数组。
- `links`：入口数组，每项包含 `label` 和 `url`。
- `references`：可选，填写顶层参考文献的 ID。
- `note`：可选，补充入口操作等简短说明。

Quant 下的项目与 References 默认折叠。学校仅展示 SIM、UOL 两个 logo；守常 logo 暂不展示。GPA 不显示在主页。
