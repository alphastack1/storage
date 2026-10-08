import {readFile} from 'node:fs/promises';
const file=process.argv[2];
if(!file){console.error('Usage: npm run review-inspection -- /path/to/awbw-inspection.json');process.exit(1);}
const data=JSON.parse(await readFile(file,'utf8'));
if(!['field-command-inspection-v1','field-command-inspection-v2'].includes(data.format)||!Array.isArray(data.contracts))throw new Error('Unsupported inspection export.');
const contracts=data.contracts;
const state=contracts.filter(c=>c.responseSample&&/"(?:units|units_id|units_x|terrain|buildings)"/.test(JSON.stringify(c.responseSample)));
const actions=contracts.filter(c=>c.requestSample?.action||/(?:move|attack|capture|end_?turn|build|buy|purchase|action|order)/i.test(c.path));
const acknowledged=actions.filter(c=>c.status>=200&&c.status<300&&c.responseSample?.success===true);
const rejected=actions.filter(c=>c.status>=400||c.status===0||c.responseSample?.success===false);
console.log(`Inspection ${data.format}; ${contracts.length} observed requests; ${data.publicFiles?.length||0} public source files.`);
console.log(`Visible map snapshot: ${data.snapshot?'present':'missing'}${data.snapshotError?' ('+data.snapshotError+')':''}`);
console.log(`Structured game samples: ${state.length}; action candidates: ${actions.length}; explicit success responses: ${acknowledged.length}; rejected/network failures: ${rejected.length}.`);
for(const c of actions.slice(0,15))console.log(`${c.method} ${c.path} — HTTP ${c.status}; fields: ${c.requestFieldNames.join(', ')}`);
console.log('\nLive orders remain UNVERIFIED. Observations from the official page are evidence, not proof that an independent client can safely submit orders.');
console.log('Required next: read public source, map exact state/action contracts, verify active-player permissions and turn versions, confirm rejected/stale/duplicate orders, and test independent orders in a designated test match. No commands are sent by this review.');
