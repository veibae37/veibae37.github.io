"""Render the static homepage from an editable project catalogue. Python stdlib only."""
from pathlib import Path
from html import escape
import json
import re
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]


def link(url, label):
    if urlparse(url).scheme not in ('https', ''):
        raise ValueError(f'Unsupported URL: {url}')
    return f'<a href="{escape(url, quote=True)}">{escape(label)}</a>'


def build():
    data = json.loads((ROOT / 'content/projects.json').read_text(encoding='utf-8'))
    ids = [p['id'] for p in data['projects']] + [r['id'] for r in data['references']]
    if len(ids) != len(set(ids)) or not all(re.fullmatch(r'[a-z][a-z0-9-]*', i) for i in ids):
        raise ValueError('Project and reference IDs must be unique URL-safe identifiers')
    numbers = {r['id']: i for i, r in enumerate(data['references'], 1)}
    menu, modules, references = [], [], []
    for project in data['projects']:
        menu.append(f'<li>{link("#" + project["id"], project["title"])}</li>')
        citations = ' '.join(link('#' + r, f'[{numbers[r]}]') for r in project.get('references', []))
        paragraphs = ''.join(f'<p>{escape(t)}</p>' for t in [project['summary']] + project.get('details', []))
        links = ' '.join(link(l['url'], l['label']) for l in project['links'])
        note = f'<p class="module-note">{escape(project["note"])}</p>' if project.get('note') else ''
        modules.append(f'''<details class="project-module" id="{project['id']}" name="quant-section">
  <summary>{escape(project['title'])}</summary>
  <div class="module-content">
  <p class="project-subtitle">{escape(project['subtitle'])}</p>
  {paragraphs}
  {f'<p class="citations">References: {citations}</p>' if citations else ''}
  <div class="module-links">{links}</div>{note}
  </div>
</details>''')
    for ref in data['references']:
        references.append(f'<li id="{ref["id"]}">{link(ref["url"], ref["title"])}<p>{escape(ref["description"])}</p></li>')
    values = dict(CATEGORY=escape(data['category']), CATEGORY_URL=escape(data['url'], quote=True), DESCRIPTION=escape(data['description']), PROJECT_MENU='\n'.join(menu), PROJECT_MODULES='\n'.join(modules), REFERENCES='\n'.join(references))
    output = (ROOT / 'templates/index.html').read_text(encoding='utf-8')
    for key, value in values.items():
        output = output.replace('{{' + key + '}}', value)
    if '{{' in output:
        raise ValueError('Unresolved template placeholder')
    output = '\n'.join(line.rstrip() for line in output.splitlines()) + '\n'
    (ROOT / 'index.html').write_text(output, encoding='utf-8')
    print(f'Rendered {len(menu)} project modules and {len(references)} references.')


if __name__ == '__main__':
    build()
