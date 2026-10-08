import { mkdir, copyFile, readFile, writeFile, cp, rm } from 'node:fs/promises';
const metadata=`// ==UserScript==
// @name         Field Command — AWBW harness
// @namespace    field-command-awbw
// @version      0.1.0
// @description  A mobile-first dashboard for your existing AWBW account, with original game controls.
// @match        https://awbw.amarriner.com/yourgames.php*
// @grant        none
// @run-at       document-idle
// @noframes
// ==/UserScript==
`;
const css=await readFile('styles.css','utf8'),source=await readFile('harness.js','utf8');
await writeFile('field-command.user.js',metadata+'\n(() => { const FIELD_COMMAND_CSS = '+JSON.stringify(css)+';\n'+source+'\n})();\n');
await rm('dist',{recursive:true,force:true});
await mkdir('dist',{recursive:true});
for(const file of ['index.html','styles.css','app.js','favicon.svg','field-command.user.js','asset-collector.user.js','asset-library.html','asset-library.js','asset-library.css','operations.html','play.html','play.css','play.js','tactics.js','snapshot.js','bridge.html','awbw-bridge.user.js','_headers'])await copyFile(file,`dist/${file}`);
console.log('Built installation site and self-contained userscript in dist/');

await cp('assets','dist/assets',{recursive:true});
