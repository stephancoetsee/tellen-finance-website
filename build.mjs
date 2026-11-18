import { readFileSync, writeFileSync, mkdirSync, readdirSync, copyFileSync, cpSync, rmSync } from 'node:fs';
import { join, extname, basename } from 'node:path';
const root = process.cwd();
const templates = join(root, 'templates');
const out = join(root, 'dist');
rmSync(out, {recursive:true, force:true});
mkdirSync(out, {recursive:true});
const readData = (name) => JSON.parse(readFileSync(join(root, 'content', `${name}.json`), 'utf8'));
const data = {pricing:readData('pricing'),branding:readData('branding')};
for (const filename of readdirSync(join(root, 'content'))) {
  if (filename.endsWith('.json') && !['pricing.json','branding.json'].includes(filename)) {
    data[basename(filename,'.json')] = readData(basename(filename,'.json'));
  }
}
const escapeHtml = (s) => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
const errors = [];
for (const filename of readdirSync(templates)) {
  const source = join(templates, filename);
  if (extname(filename) !== '.html') {copyFileSync(source,join(out,filename)); continue;}
  let html = readFileSync(source,'utf8');
  html = html.replace(/\{\{cms:([\w.-]+)\}\}/g, (_,path) => {
    const keys = path.split('.');
    let value = data;
    for (const key of keys) {
      if (value == null || !Object.hasOwn(value,key)) {errors.push(`${filename}: missing ${path}`); return ''}
      value = value[key];
    }
    if (typeof value !== 'string' && typeof value !== 'number') {errors.push(`${filename}: invalid value ${path}`); return '';}
    return escapeHtml(value);
  });
  if (/\{\{cms:/.test(html)) errors.push(`${filename}: unresolved placeholders`);
  writeFileSync(join(out,filename), html,'utf8');
}
cpSync(join(root,'media'),join(out,'media'),{recursive:true});
if (errors.length) {console.error(errors.join('\n'));process.exit(1);}
console.log(`Built ${readdirSync(out).length} site entries into dist/`);
