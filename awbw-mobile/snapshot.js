export function validateSnapshot(input) {
  const s=['field-command-inspection-v1','field-command-inspection-v2'].includes(input?.format)?input.snapshot:input;
  if(!['field-command-snapshot-v1','field-command-snapshot-v2'].includes(s?.format))throw new Error('Use a snapshot exported by the AWBW bridge.');
  if(!/^\d+$/.test(String(s.gameId)))throw new Error('Invalid game ID.');
  const map=s.map;
  if(!map||!Number.isInteger(map.width)||!Number.isInteger(map.height)||map.width<1||map.height<1||map.width>128||map.height>128||!Array.isArray(map.layers)||map.layers.length>20000)throw new Error('Invalid map dimensions or layers.');
  const frame=map.frame;if(frame!==undefined&&(!/^data:image\/png;base64,[A-Za-z0-9+/=]+$/.test(frame)||frame.length>4000000))throw new Error('Invalid map frame.');
  const layers=map.layers.map(l=>{
    if(!Number.isInteger(l.x)||!Number.isInteger(l.y)||l.x<0||l.y<0||l.x>=map.width||l.y>=map.height)throw new Error('A sprite is outside the map.');
    const url=new URL(l.source);
    if(url.origin!=='https://awbw.amarriner.com'||!url.pathname.startsWith('/terrain/')||!/[.](gif|png|webp|jpg|jpeg)$/i.test(url.pathname))throw new Error('Unknown sprite source.');
    if(!Number.isFinite(l.width)||!Number.isFinite(l.height)||l.width<1||l.height<1||l.width>1024||l.height>2048)throw new Error('Invalid sprite size.');
    const css=value=>typeof value==='string'&&/^[\d.\s%pxauto-]+$/.test(value)&&value.length<60?value:'';
    return {x:l.x,y:l.y,source:url.href,kind:l.kind==='unit'?'unit':'terrain',width:l.width,height:l.height,background:!!l.background,backgroundPosition:css(l.backgroundPosition),backgroundSize:css(l.backgroundSize),filter:typeof l.filter==='string'&&l.filter.length<200&&/^(?:(?:brightness|contrast|grayscale|opacity|saturate|sepia)\([\d.%]+\)\s*)*$/.test(l.filter)?l.filter:'',opacity:Number.isFinite(l.opacity)?Math.max(0,Math.min(1,l.opacity)):1};
  });
  return {format:s.format,gameId:String(s.gameId),title:typeof s.title==='string'?s.title.slice(0,100):`AWBW #${s.gameId}`,day:Number.isInteger(s.day)&&s.day>0?s.day:null,capturedAt:typeof s.capturedAt==='string'?s.capturedAt:'',map:{width:map.width,height:map.height,layers,...(frame?{frame}:{})},coverage:s.coverage&&typeof s.coverage==='object'?{renderedOnly:true,warning:String(s.coverage.warning||'').slice(0,300)}:{renderedOnly:true}};
}
