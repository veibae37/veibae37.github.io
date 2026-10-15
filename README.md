# LIU Yitao — personal homepage

Live site: https://veibae37.github.io/

[中文修改指南：内容、图片、样式及发布步骤](EDITING.md)

A static academic-style homepage with a restrained red accent, a profile photograph, CV downloads and a modular research catalogue. GitHub Pages serves `main` at the repository root. The committed HTML works without JavaScript or a server build.

## Update projects

1. Edit `content/projects.json`. Each project contains a stable `id`, `title`, `subtitle`, `summary`, `details`, `links`, optional `references` and optional `note`.
2. Add a new entry to the `projects` array to create another secondary-menu item and project section. Keep IDs stable so shared links continue to work.
3. Add reference entries to `references` and use their IDs in the project's `references` array.
4. Run `python scripts/build.py` from this directory (Python 3, standard library only).
5. Commit the JSON and regenerated `index.html` together, then push to `main`.

The generator validates IDs and reference targets and escapes content. Generated content is already present in `index.html` for search engines, accessibility and JavaScript-free browsing.

## Update the profile or layout

- Biography, education, experience, activities and photograph caption: `templates/index.html`.
- Colours, spacing and responsive layout: `styles.css`.
- Photograph: `assets/profile-photo.jpg` (supplied by LIU Yitao; caption credited to F.).
- CV downloads: `assets/LIU-Yitao-CV.pdf` and `assets/LIU-Yitao-CV.docx`.
- The historical `resume of Liuyitao.pdf` URL retains the current CV.

Run the generator after changing the template. Preview the repository with any static HTTP server. Quant uses a two-level disclosure menu: open the platform category, then select a project or References. All panels start closed unless a shared fragment URL targets one. Photo credit is a click-to-reveal disclosure. Logo provenance is recorded in `assets/logos/sources.json`.

## Sources

CV content is based on the supplied 15 October 2026 Word document. Project descriptions are grounded in the public platform and the owner's requested research organisation. References include XAlpha (arXiv:2607.08332v2, Table 4), the SSE's 2016 China volatility-index announcement and its original methodology. The iVX source is attributed to the SSE/CSI, not to the CSRC. Research reconstruction is distinguished from the official index.
