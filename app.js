(() => {
const $ = id => document.getElementById(id);
const translations = {
 es:{project:"Proyecto",horizontal:"Horizontal",vertical:"Vertical",save:"Guardar",export:"Exportar",workspace:"ESPACIO DE TRABAJO",editor:"Editor",statistics:"Estadísticas",simulation:"Simulación",tree:"ÁRBOL",localSaved:"Guardado localmente",addBranch:"Añadir rama",templates:"Plantillas",import:"Importar proyecto",quickTip:"Consejo rápido",tipText:"Las probabilidades de las ramas de un mismo nodo deberían sumar el 100 %.",probabilityWorkspace:"ESPACIO DE PROBABILIDAD",treeEditor:"Editor de árbol",pageSubtitle:"Construye escenarios, asigna probabilidades y entiende cada resultado.",share:"Compartir",liveCalculation:"Cálculo en tiempo real",fitView:"Ajustar vista",clear:"Limpiar",canvasHint:"Selecciona un nodo para editarlo · Pulsa + para añadir ramas",selection:"SELECCIÓN",nodeProperties:"Propiedades del nodo",selectNode:"Selecciona un nodo o una rama del árbol.",label:"Nombre",probability:"Probabilidad",inputMethod:"Método",favourable:"Favorables",total:"Total de casos",notes:"Notas",color:"Color",duplicate:"Duplicar",delete:"Eliminar",qualityCheck:"CONTROL DE CALIDAD",validation:"Validación",outcomes:"RESULTADOS",finalOutcomes:"Resultados finales",path:"Recorrido",jointProbability:"Probabilidad conjunta",conditional:"Condicionada",monteCarlo:"MONTE CARLO",runSimulation:"Ejecutar simulación",simDescription:"Repite el experimento para comparar frecuencias observadas con probabilidades teóricas.",repetitions:"Número de repeticiones",run:"Ejecutar simulación",results:"RESULTADOS",simulationResults:"Resultados de simulación",runToSee:"Ejecuta una simulación para ver los resultados.",localOnly:"Tus proyectos permanecen en este navegador.",saved:"Proyecto guardado",added:"Rama añadida",invalidSum:"Las probabilidades de las ramas suman",missing:"Hay probabilidades sin definir.",over:"La suma supera el 100 %.",under:"La suma es inferior al 100 %.",allGood:"No se detectan incoherencias en los datos actuales.",exportTitle:"Exportar proyecto",exportJson:"Proyecto JSON",exportSvg:"Diagrama SVG",exportPng:"Imagen PNG",exportPdf:"PDF / Imprimir",shareTitle:"Compartir árbol",shareFile:"Descargar archivo para compartir",shareLink:"Copiar enlace con los datos",templatesTitle:"Plantillas",coin:"Dos lanzamientos de moneda",weather:"Previsión meteorológica",medical:"Prueba hipotética",empty:"Árbol vacío",imported:"Proyecto importado",linkCopied:"Enlace copiado",selectFirst:"Selecciona primero un nodo.",deleteRoot:"No se puede eliminar la raíz.",simulated:"Simulación completada",outcomesCount:"resultados",probOf:"Probabilidad",observed:"Observada",theoretical:"Teórica",branch:"Rama",root:"Raíz",nodes:"nodos",branches:"ramas",noOutcomes:"Añade ramas para generar resultados.",rootLabel:"Experimento",guideTitle:"Empieza en 3 pasos",guideIntro:"No necesitas configurar nada antes de empezar.",guideStep1:"Selecciona un nodo para editar su nombre.",guideStep2:"Pulsa + o «Añadir rama» para crear opciones.",guideStep3:"Asigna porcentajes; las ramas del mismo nodo deben sumar 100 %.",addBranchAction:"＋ Añadir rama",nodeHelp:"Haz clic en un nodo del diagrama para editarlo.",probabilityHelp:"Las opciones que salen del mismo nodo deben sumar 100 %.",yes:"Sí",no:"No",fair:"Cara",tails:"Cruz",autoModeLabel:"Automatización de ramas de este proyecto",autoCopy:"Copiar opciones y porcentajes",autoEqual:"Copiar opciones y repartir porcentajes por igual",autoNames:"Copiar solo los nombres",autoManual:"Manual, sin autocompletar",autoModeHelp:"Al crear opciones bajo una rama, Branch replica los mismos nombres y posiciones en todas las ramas hermanas del mismo nivel. Puedes editar las copias por separado."},
 en:{project:"Project",horizontal:"Horizontal",vertical:"Vertical",save:"Save",export:"Export",workspace:"WORKSPACE",editor:"Editor",statistics:"Statistics",simulation:"Simulation",tree:"TREE",localSaved:"Saved locally",addBranch:"Add branch",templates:"Templates",import:"Import project",quickTip:"Quick tip",tipText:"Branch probabilities from the same node should add up to 100%.",probabilityWorkspace:"PROBABILITY WORKSPACE",treeEditor:"Tree editor",pageSubtitle:"Build scenarios, assign probabilities and understand every outcome.",share:"Share",liveCalculation:"Live calculations",fitView:"Fit view",clear:"Clear",canvasHint:"Select a node to edit it · Press + to add branches",selection:"SELECTION",nodeProperties:"Node properties",selectNode:"Select a node or branch in the tree.",label:"Label",probability:"Probability",inputMethod:"Method",favourable:"Favourable",total:"Total cases",notes:"Notes",color:"Color",duplicate:"Duplicate",delete:"Delete",qualityCheck:"QUALITY CHECK",validation:"Validation",outcomes:"OUTCOMES",finalOutcomes:"Final outcomes",path:"Path",jointProbability:"Joint probability",conditional:"Conditional",monteCarlo:"MONTE CARLO",runSimulation:"Run simulation",simDescription:"Repeat the experiment to compare observed frequencies with theoretical probabilities.",repetitions:"Number of repetitions",run:"Run simulation",results:"RESULTS",simulationResults:"Simulation results",runToSee:"Run a simulation to see results.",localOnly:"Your projects stay in this browser.",saved:"Project saved",added:"Branch added",invalidSum:"Branch probabilities add up to",missing:"Some probabilities are undefined.",over:"The sum exceeds 100%.",under:"The sum is below 100%.",allGood:"No inconsistencies detected in the current data.",exportTitle:"Export project",exportJson:"JSON project",exportSvg:"SVG diagram",exportPng:"PNG image",exportPdf:"PDF / Print",shareTitle:"Share tree",shareFile:"Download shareable file",shareLink:"Copy data link",templatesTitle:"Templates",coin:"Two coin tosses",weather:"Weather forecast",medical:"Hypothetical test",empty:"Empty tree",imported:"Project imported",linkCopied:"Link copied",selectFirst:"Select a node first.",deleteRoot:"The root cannot be deleted.",simulated:"Simulation complete",outcomesCount:"outcomes",probOf:"Probability",observed:"Observed",theoretical:"Theoretical",branch:"Branch",root:"Root",nodes:"nodes",branches:"branches",noOutcomes:"Add branches to generate outcomes.",rootLabel:"Experiment",guideTitle:"Get started in 3 steps",guideIntro:"You can start without configuring anything.",guideStep1:"Select a node to edit its name.",guideStep2:"Press + or “Add branch” to create options.",guideStep3:"Set percentages; branches from the same node must add up to 100%.",addBranchAction:"＋ Add branch",nodeHelp:"Click a node in the diagram to edit it.",probabilityHelp:"Options branching from the same node must add up to 100%.",yes:"Yes",no:"No",fair:"Heads",tails:"Tails",autoModeLabel:"Branch automation for this project",autoCopy:"Copy options and probabilities",autoEqual:"Copy options and split probabilities equally",autoNames:"Copy names only",autoManual:"Manual, no auto-fill",autoModeHelp:"When you create options under a branch, Branch mirrors the same names and positions across every sibling branch at that level. You can edit each copy independently."}
};
let lang="es",orientation="horizontal",selected="root",view="editor",lastSimulation=null,undoStack=[],redoStack=[];
let theme=localStorage.getItem("branch-theme")==="dark"?"dark":"light";
function applyTheme(){
 document.documentElement.dataset.theme=theme;
 const dark=theme==="dark";
 const button=$("themeBtn");
 if(button){button.textContent=dark?"☀":"☾";button.title=dark?(lang==="es"?"Activar modo claro":"Switch to light mode"):(lang==="es"?"Activar modo oscuro":"Switch to dark mode");button.setAttribute("aria-label",button.title)}
 const meta=document.querySelector('meta[name="theme-color"]');
 if(meta)meta.content=dark?"#171a18":"#f7f7f5";
}

const makeNode=(id,label,p=null)=>({id,label,p,method:"manual",favourable:1,total:2,notes:"",color:"#6e8f7a",children:[]});
let tree=makeNode("root","Experimento");tree.children=[makeNode("a","Opción A",50),makeNode("b","Opción B",50)];
let projectName="Mi primer árbol",projectMode="copy";
const t=k=>translations[lang][k]||k;
function snapshot(){undoStack.push(JSON.stringify({tree,projectName,orientation,projectMode}));if(undoStack.length>60)undoStack.shift();redoStack=[]}
function id(){return "n"+Math.random().toString(36).slice(2,9)}
function find(n,key){if(n.id===key)return n;for(const c of n.children){const r=find(c,key);if(r)return r}return null}
function parentOf(n,key){for(const c of n.children){if(c.id===key)return n;const r=parentOf(c,key);if(r)return r}return null}
function probability(n){if(n.method==="data"&&n.total>0)return Math.max(0,Math.min(100,100*n.favourable/n.total));return n.p===null?null:Number(n.p)}
function allPaths(n=tree,path=[],nodeIds=[],prob=100){
 if(!n.children.length)return [{labels:path.concat(n.label),nodeIds:nodeIds.concat(n.id),prob}];
 let out=[];
 for(const c of n.children){
  const p=probability(c);
  out=out.concat(allPaths(c,path.concat(n.label),nodeIds.concat(n.id),p===null||prob===null?null:prob*p/100));
 }
 return out
}
function walk(n,fn){fn(n);n.children.forEach(c=>walk(c,fn))}
function render(){ $("projectName").value=projectName;drawTree();renderInspector();renderValidation();$("branchCount").textContent=countNodes(tree)-1+" "+t("branches");if(view==="stats")renderStats(); }
function countNodes(n){return 1+n.children.reduce((s,c)=>s+countNodes(c),0)}
function drawTree(){
 const svg=$("treeSvg"),W=svg.clientWidth||900,H=svg.clientHeight||460;svg.setAttribute("viewBox","0 0 "+W+" "+H);svg.innerHTML="";
 const levels=[];function level(n,d){(levels[d]||(levels[d]=[])).push(n);n.children.forEach(c=>level(c,d+1))}level(tree,0);
 const maxD=levels.length-1,positions={};levels.forEach((arr,d)=>arr.forEach((n,i)=>{let x,y;if(orientation==="horizontal"){x=70+d*(Math.max(120,(W-170)/Math.max(1,maxD)));y=(H/(arr.length+1))*(i+1)}else{x=(W/(arr.length+1))*(i+1);y=45+d*(Math.max(100,(H-100)/Math.max(1,maxD)))}positions[n.id]={x,y}}));
 function line(x1,y1,x2,y2){let p=document.createElementNS("http://www.w3.org/2000/svg","path");p.setAttribute("d","M"+x1+" "+y1+" C"+((x1+x2)/2)+" "+y1+" "+((x1+x2)/2)+" "+y2+" "+x2+" "+y2);p.setAttribute("class","branch-line");svg.appendChild(p)}
 walk(tree,n=>{if(n.id!=="root"){let par=parentOf(tree,n.id),a=positions[par.id],b=positions[n.id];line(a.x+66,a.y,b.x-66,b.y);let tx=(a.x+b.x)/2,ty=(a.y+b.y)/2-7;let label=document.createElementNS("http://www.w3.org/2000/svg","text");label.setAttribute("x",tx);label.setAttribute("y",ty);label.setAttribute("text-anchor","middle");label.setAttribute("class","branch-prob");let p=probability(n);label.textContent=p===null?"—":p.toFixed(1)+"%";svg.appendChild(label)}});
 walk(tree,n=>{let p=positions[n.id],g=document.createElementNS("http://www.w3.org/2000/svg","g");g.setAttribute("class","node"+(n.id===selected?" selected":""));g.setAttribute("transform","translate("+(p.x-62)+","+(p.y-23)+")");g.addEventListener("click",()=>{selected=n.id;renderInspector();drawTree()});let r=document.createElementNS("http://www.w3.org/2000/svg","rect");r.setAttribute("width","124");r.setAttribute("height","46");r.setAttribute("stroke",n.color);g.appendChild(r);let dot=document.createElementNS("http://www.w3.org/2000/svg","circle");dot.setAttribute("cx","12");dot.setAttribute("cy","14");dot.setAttribute("r","4");dot.setAttribute("fill",n.color);g.appendChild(dot);let text=document.createElementNS("http://www.w3.org/2000/svg","text");text.setAttribute("x","22");text.setAttribute("y","18");text.setAttribute("class","node-label");text.textContent=n.label.length>14?n.label.slice(0,13)+"…":n.label;g.appendChild(text);let sub=document.createElementNS("http://www.w3.org/2000/svg","text");sub.setAttribute("x","12");sub.setAttribute("y","35");sub.setAttribute("class","node-sub");sub.textContent=n.children.length?n.children.length+" "+t("branches"):t("finalOutcomes");g.appendChild(sub);svg.appendChild(g);
 if(n.id===selected){let plus=document.createElementNS("http://www.w3.org/2000/svg","g");plus.setAttribute("transform","translate("+(p.x+55)+","+(p.y+13)+")");plus.style.cursor="pointer";plus.addEventListener("click",e=>{e.stopPropagation();addBranch(n.id)});let c=document.createElementNS("http://www.w3.org/2000/svg","circle");c.setAttribute("r","10");c.setAttribute("class","add-node");plus.appendChild(c);let tx=document.createElementNS("http://www.w3.org/2000/svg","text");tx.setAttribute("text-anchor","middle");tx.setAttribute("y","4");tx.setAttribute("class","add-node-text");tx.textContent="+";plus.appendChild(tx);svg.appendChild(plus)}
 });
}
function renderInspector(){let n=find(tree,selected);$("emptyInspector").hidden=!!n;$("nodeInspector").hidden=!n;if(!n)return;$("selectedType").textContent=n.id==="root"?t("root").toUpperCase():t("branch").toUpperCase();$("nodeLabel").value=n.label;$("nodeNotes").value=n.notes||"";$("branchFields").hidden=n.id==="root";$("probability").value=n.p??"";$("probMethod").value=n.method||"manual";$("dataFields").hidden=n.method!=="data";$("favourable").value=n.favourable??1;$("total").value=n.total??2;document.querySelectorAll(".swatches button").forEach(b=>b.classList.toggle("selected",b.dataset.color===n.color))}
function renderValidation(){let warnings=[];walk(tree,n=>{if(n.children.length){let vals=n.children.map(probability);if(vals.some(x=>x===null||!Number.isFinite(x)))warnings.push(t("missing"));else{let sum=vals.reduce((a,b)=>a+b,0);if(sum>100.001)warnings.push(t("over")+" ("+sum.toFixed(1)+" %).");else if(sum<99.999)warnings.push(t("under")+" ("+sum.toFixed(1)+" %).")}}});$("validationCount").textContent=warnings.length;$("validationCount").className="pill "+(warnings.length?"":"green-pill");$("validationList").innerHTML=warnings.length?warnings.map(w=>'<div class="validation-item"><span class="v-icon">!</span><span>'+escapeHtml(w)+'</span></div>').join(''):'<div class="validation-item ok"><span class="v-icon">✓</span><span>'+escapeHtml(t("allGood"))+'</span></div>'}
function renderStats(){let paths=allPaths();let valid=paths.filter(p=>p.prob!==null);let total=valid.reduce((s,p)=>s+p.prob,0);$("statsCards").innerHTML=[["Σ P",total.toFixed(2)+"%"],[t("outcomesCount"),paths.length],[t("nodes"),countNodes(tree)]].map(x=>'<div class="stat-card"><span>'+escapeHtml(x[0])+'</span><strong>'+escapeHtml(String(x[1]))+'</strong></div>').join("");$("outcomeRows").innerHTML=paths.length?paths.map(p=>'<tr><td>'+escapeHtml(p.labels.join(" → "))+'</td><td>'+ (p.prob===null?"—":p.prob.toFixed(3)+"%")+'</td><td>'+ (p.prob===null?"—":p.prob.toFixed(3)+"%")+'</td></tr>').join(""):'<tr><td colspan="3">'+t("noOutcomes")+'</td></tr>'}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function addBranch(parentId){
 const parent=find(tree,parentId);
 if(!parent)return;
 snapshot();
 const node=makeNode(id(),lang==="es"?"Nueva opción":"New option",parent.children.length?null:100);
 parent.children.push(node);

 if(projectMode==="copy"||projectMode==="equal"){
  const share=100/parent.children.length;
  parent.children.forEach(child=>{child.p=share;child.method="manual"});
 }

 // Mirror the complete set of child options across every sibling branch,
 // not only branches that happen to be empty or previously auto-generated.
 if(projectMode!=="manual"&&parent.id!=="root"){
  const group=parentOf(tree,parent.id);
  if(group){
   const sourceChildren=parent.children;
   const sourceKeys=sourceChildren.map(child=>child._mirrorSourceId||child.id);
   group.children.filter(peer=>peer.id!==parent.id).forEach(peer=>{
    sourceChildren.forEach((source,index)=>{
     let mirror=peer.children.find(child=>child._mirrorSourceId===sourceKeys[index]);
     if(!mirror)mirror=peer.children[index];
     if(!mirror){
      mirror=makeAutoCopy(source,sourceChildren.length);
      peer.children.push(mirror);
     }
     mirror._mirrorSourceId=sourceKeys[index];
     if(mirror._autoGenerated||!mirror._mirrorSourceId){
      mirror.label=source.label;
      mirror._autoGenerated=true;
     }else if(!mirror._autoGenerated){
      // Existing options at the same position join the mirrored pattern
      // when automation is enabled for this project.
      mirror.label=source.label;
      mirror._autoGenerated=true;
     }
     if(projectMode==="copy"){
      mirror.p=source.p;
      mirror.method=source.method||"manual";
      if(source.method==="data"){mirror.method="data";mirror.favourable=source.favourable;mirror.total=source.total}
     }else if(projectMode==="equal"){
      mirror.p=100/sourceChildren.length;
      mirror.method="manual";
     }
    });
    if(projectMode==="copy"||projectMode==="equal"){
     const share=100/peer.children.length;
     peer.children.forEach(child=>{child.p=share;child.method="manual"});
    }
   });
  }
 }
 selected=node.id;
 render();
 toast(t("added"));
}
function makeAutoCopy(source,total){
 const value=probability(source);
 const copy=makeNode(id(),source.label,projectMode==="copy"?value:projectMode==="equal"?100/total:null);
 copy._autoGenerated=true;
 copy._mirrorSourceId=source._mirrorSourceId||source.id;
 if(projectMode==="copy"&&source.method==="data"){copy.method="data";copy.favourable=source.favourable;copy.total=source.total}
 return copy
}
function toast(s){let el=$("toast");el.textContent=s;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2100)}
function save(){localStorage.setItem("branch-project",JSON.stringify({tree,projectName,orientation,projectMode}));$("treeStatus").textContent=t("localSaved");toast(t("saved"))}
function download(name,content,type){let a=document.createElement("a"),url=URL.createObjectURL(new Blob([content],{type}));a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
function serialize(){return JSON.stringify({version:1,projectName,orientation,projectMode,tree},null,2)}
function xmlText(value){return String(value).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"}[ch]))}
function svgMarkup(){
 const levels=[];function collect(n,d){(levels[d]||(levels[d]=[])).push(n);n.children.forEach(child=>collect(child,d+1))}collect(tree,0);
 const maxCount=Math.max(1,...levels.map(a=>a.length)),margin=90,nodeW=180,nodeH=64,positions={};
 let width,height;
 if(orientation==="horizontal"){width=Math.max(520,margin*2+Math.max(0,levels.length-1)*250+nodeW);height=Math.max(260,margin*2+maxCount*112);levels.forEach((arr,d)=>arr.forEach((n,i)=>positions[n.id]={x:margin+d*250,y:margin+(i+.5)*(height-margin*2)/arr.length}))}
 else{width=Math.max(520,margin*2+maxCount*220);height=Math.max(280,margin*2+Math.max(0,levels.length-1)*155+nodeH);levels.forEach((arr,d)=>arr.forEach((n,i)=>positions[n.id]={x:margin+(i+.5)*(width-margin*2)/arr.length,y:margin+d*155}))}
 const parts=[`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${xmlText(projectName)}"><rect width="100%" height="100%" fill="#ffffff"/><text x="32" y="38" font-family="Arial,sans-serif" font-size="18" font-weight="700" fill="#263b2d">${xmlText(projectName)}</text>`];
 walk(tree,n=>{if(n.id==="root")return;const p=parentOf(tree,n.id),a=positions[p.id],b=positions[n.id];let d,labelX,labelY;
 if(orientation==="horizontal"){d=`M ${a.x+nodeW/2} ${a.y} C ${(a.x+b.x)/2} ${a.y}, ${(a.x+b.x)/2} ${b.y}, ${b.x-nodeW/2} ${b.y}`;labelX=(a.x+b.x)/2;labelY=(a.y+b.y)/2-10}
 else{d=`M ${a.x} ${a.y+nodeH/2} C ${a.x} ${(a.y+b.y)/2}, ${b.x} ${(a.y+b.y)/2}, ${b.x} ${b.y-nodeH/2}`;labelX=(a.x+b.x)/2;labelY=(a.y+b.y)/2-8}
 parts.push(`<path d="${d}" fill="none" stroke="#b8c4b9" stroke-width="2"/>`);
 const prob=probability(n);parts.push(`<text x="${labelX}" y="${labelY}" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" font-weight="700" fill="#426b55">${prob===null?"—":prob.toFixed(1)+"%"}</text>`);
 });
 walk(tree,n=>{const p=positions[n.id],x=p.x-nodeW/2,y=p.y-nodeH/2,color=/^#[0-9a-f]{6}$/i.test(n.color||"")?n.color:"#6e8f7a";parts.push(`<rect x="${x}" y="${y}" width="${nodeW}" height="${nodeH}" rx="10" fill="#ffffff" stroke="${color}" stroke-width="2"/><circle cx="${x+17}" cy="${y+19}" r="5" fill="${color}"/><text x="${x+31}" y="${y+24}" font-family="Arial,sans-serif" font-size="13" font-weight="700" fill="#303a32">${xmlText(n.label)}</text><text x="${x+16}" y="${y+47}" font-family="Arial,sans-serif" font-size="11" fill="#7d887e">${n.children.length? n.children.length+" "+xmlText(t("branches")):xmlText(t("finalOutcomes"))}</text>`)});
 parts.push("</svg>");return parts.join("");
}
function exportPng(){
 const source=svgMarkup(),url=URL.createObjectURL(new Blob([source],{type:"image/svg+xml;charset=utf-8"})),img=new Image();
 img.onload=()=>{const scale=2,canvas=document.createElement("canvas");canvas.width=img.naturalWidth*scale;canvas.height=img.naturalHeight*scale;const ctx=canvas.getContext("2d");ctx.fillStyle="#fff";ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);canvas.toBlob(blob=>{URL.revokeObjectURL(url);if(!blob){toast(lang==="es"?"No se pudo generar el PNG":"Could not create PNG");return}download("branch-tree.png",blob,"image/png")}, "image/png")};
 img.onerror=()=>{URL.revokeObjectURL(url);toast(lang==="es"?"No se pudo generar la imagen":"Could not create image")};img.src=url;
}
function printTree(){
 let area=$("printArea");if(!area){area=document.createElement("div");area.id="printArea";document.body.appendChild(area)}
 area.innerHTML=svgMarkup();document.body.classList.add("printing-tree");
 const cleanup=()=>{document.body.classList.remove("printing-tree");area.innerHTML=""};
 window.addEventListener("afterprint",cleanup,{once:true});
 setTimeout(()=>{window.print();setTimeout(cleanup,1200)},180);
}
function modal(title,items){$("modalTitle").textContent=title;$("modalBody").innerHTML=items.map((x,i)=>'<button class="modal-option" type="button" data-action="'+i+'"><span>'+x.label+'</span>'+(x.description?'<small>'+x.description+'</small>':'')+'</button>').join("");$("modal").hidden=false;$("modalBody").querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{const action=items[Number(b.dataset.action)].run;$("modal").hidden=true;setTimeout(()=>action(),80)}))}
function template(kind){snapshot();if(kind==="coin"){tree=makeNode("root","Dos lanzamientos");let first=makeNode("one","Primer lanzamiento");first.children=[makeNode("a","Cara",50),makeNode("b","Cruz",50)];first.children[0].children=[makeNode("aa","Cara",50),makeNode("ab","Cruz",50)];first.children[1].children=[makeNode("ba","Cara",50),makeNode("bb","Cruz",50)];tree.children=[first]}else if(kind==="weather"){tree=makeNode("root","Previsión");tree.children=[makeNode("sun","Lluvia",30),makeNode("dry","Sin lluvia",70)];tree.children[0].children=[makeNode("rain","Lluvia intensa",20),makeNode("drizzle","Llovizna",80)];}else if(kind==="medical"){tree=makeNode("root","Prueba hipotética");tree.children=[makeNode("pos","Positivo",5),makeNode("neg","Negativo",95)];tree.children[0].children=[makeNode("ill","Condición presente",90),makeNode("healthy","Sin condición",10)];tree.children[1].children=[makeNode("ill2","Condición presente",10),makeNode("healthy2","Sin condición",90)]}else tree=makeNode("root",t("rootLabel"));selected="root";render()}
function setView(v){view=v;["editorView","statsView","simulationView"].forEach(id=>$(id).hidden=true);$(v+"View").hidden=false;$("pageTitle").textContent=v==="editor"?t("treeEditor"):v==="stats"?t("statistics"):t("simulation");["editorTab","statsTab","simulationTab"].forEach(id=>$(id).classList.toggle("active",id===(v==="editor"?"editorTab":v==="stats"?"statsTab":"simulationTab")));if(v==="stats")renderStats()}
function localize(){document.documentElement.lang=lang;document.querySelectorAll("[data-i18n]").forEach(el=>{let k=el.dataset.i18n;if(translations[lang][k])el.textContent=t(k)});$("langBtn").textContent=lang.toUpperCase();$("orientationBtn").innerHTML=(orientation==="horizontal"?"↔ ":"↕ ")+t(orientation);render()}
function simulate(){
 const n=Math.max(1,Number($("iterations").value)||1000),counts={};
 const pathLabels={},pathIds={};
 for(let i=0;i<n;i++){
  let cur=tree,labels=[],ids=[],guard=0;
  while(cur.children.length&&guard++<100){
   const valid=cur.children.map(c=>({c,p:probability(c)})).filter(x=>x.p!==null&&Number.isFinite(x.p)&&x.p>=0);
   const sum=valid.reduce((s,x)=>s+x.p,0);
   if(!valid.length||sum<=0)break;
   let r=Math.random()*sum,chosen=valid[valid.length-1];
   for(const x of valid){r-=x.p;if(r<0){chosen=x;break}}
   cur=chosen.c;labels.push(cur.label);ids.push(cur.id);
  }
  const key=ids.join("/");
  counts[key]=(counts[key]||0)+1;
  pathLabels[key]=labels.join(" → ")||"—";
  pathIds[key]=ids;
 }
 const theoreticalByPath=new Map(allPaths().map(p=>[p.nodeIds.slice(1).join("/"),p]));
 $("simulationResults").innerHTML=Object.keys(counts).map(key=>{
  const theoretical=theoreticalByPath.get(key);
  const observed=(counts[key]/n*100).toFixed(2);
  const expected=theoretical&&theoretical.prob!==null?theoretical.prob.toFixed(2):"—";
  return '<div class="sim-row"><span>'+escapeHtml(pathLabels[key])+'</span><span>'+observed+'% <small class="muted">('+expected+'% '+t("theoretical")+' )</small></span></div>';
 }).join("")+'<p class="muted">'+n.toLocaleString()+' '+t("repetitions").toLowerCase()+'</p>';
 lastSimulation=counts
}
function importData(data){if(!data||!data.tree||!data.tree.id)throw Error("Invalid");snapshot();tree=data.tree;projectName=data.projectName||"Imported project";orientation=data.orientation||"horizontal";projectMode=data.projectMode||"manual";selected="root";render();renderProjectMode()}
function syncAutoGeneratedPeers(source){
 const branch=parentOf(tree,source.id);
 if(!branch)return;
 const group=parentOf(tree,branch.id);
 if(!group)return;
 const index=branch.children.findIndex(child=>child.id===source.id);
 if(index<0)return;
 const sourceKey=source._mirrorSourceId||source.id;
 group.children.forEach(peerBranch=>{
  if(peerBranch.id===branch.id)return;
  const target=peerBranch.children.find(child=>child._mirrorSourceId===sourceKey)||peerBranch.children[index];
  if(!target||!target._autoGenerated)return;
  target._mirrorSourceId=sourceKey;
  if(projectMode==="copy"||projectMode==="names")target.label=source.label;
  if(projectMode==="copy"){
   target.p=source.p;
   target.method=source.method||"manual";
   target.favourable=source.favourable;
   target.total=source.total;
  }
  if(projectMode==="equal"){
   const share=peerBranch.children.length?100/peerBranch.children.length:null;
   peerBranch.children.forEach(child=>{if(child._autoGenerated){child.p=share;child.method="manual"}});
  }
 });
}
$("nodeLabel").addEventListener("input",e=>{let n=find(tree,selected);if(n){n._autoGenerated=false;n.label=e.target.value;syncAutoGeneratedPeers(n);drawTree();renderValidation();snapshotSoft()}});
$("nodeNotes").addEventListener("input",e=>{let n=find(tree,selected);if(n)n.notes=e.target.value});
$("probability").addEventListener("input",e=>{let n=find(tree,selected);if(n){n._autoGenerated=false;n.p=e.target.value===""?null:Number(e.target.value);syncAutoGeneratedPeers(n);snapshotSoft();drawTree();renderValidation()}});
function snapshotSoft(){clearTimeout(window._branchSave);window._branchSave=setTimeout(()=>localStorage.setItem("branch-project",JSON.stringify({tree,projectName,orientation,projectMode})),500)}
$("probMethod").addEventListener("change",e=>{let n=find(tree,selected);if(n){n.method=e.target.value;$("dataFields").hidden=n.method!=="data";render() }});
["favourable","total"].forEach(id=>$(id).addEventListener("input",e=>{let n=find(tree,selected);if(n){n._autoGenerated=false;n[id]=Number(e.target.value);n.p=probability(n);$("probability").value=n.p.toFixed(2);syncAutoGeneratedPeers(n);drawTree();renderValidation();snapshotSoft()}}));
$("swatches").addEventListener("click",e=>{let b=e.target.closest("button[data-color]");if(!b)return;let n=find(tree,selected);if(n){n.color=b.dataset.color;renderInspector();drawTree()}});
$("addBranchBtn").onclick=()=>addBranch(selected);$("addBranchQuickBtn").onclick=()=>addBranch(selected);
function rebalanceBranchProbabilities(branch){
 if(!branch||!branch.children.length||(projectMode!=="copy"&&projectMode!=="equal"))return;
 const share=100/branch.children.length;
 branch.children.forEach(child=>{child.p=share;child.method="manual"});
}
$("deleteBtn").onclick=()=>{
 if(selected==="root"){toast(t("deleteRoot"));return}
 const node=find(tree,selected),parent=parentOf(tree,selected);
 if(!node||!parent)return;
 snapshot();
 const sourceId=node._mirrorSourceId||node.id;
 const grand=parentOf(tree,parent.id);
 parent.children=parent.children.filter(child=>child.id!==node.id&&child._mirrorSourceId!==sourceId);
 rebalanceBranchProbabilities(parent);
 if(grand&&projectMode!=="manual"){
  grand.children.forEach(peer=>{
   if(peer.id===parent.id)return;
   peer.children=peer.children.filter(child=>child.id!==sourceId&&child._mirrorSourceId!==sourceId);
   rebalanceBranchProbabilities(peer);
  });
 }
 selected=parent.id;render()
};
$("duplicateBtn").onclick=()=>{let n=find(tree,selected);if(!n){toast(t("selectFirst"));return}snapshot();let p=parentOf(tree,selected);if(!p){let copy=JSON.parse(JSON.stringify(n));copy.id=id();copy.label+=" (copia)";tree.children.push(copy);selected=copy.id}else{let copy=JSON.parse(JSON.stringify(n));copy.id=id();copy.label+=" (copia)";p.children.push(copy);selected=copy.id}render()};
$("saveBtn").onclick=save;$("projectName").onchange=e=>{projectName=e.target.value;snapshotSoft()};
function renderProjectMode(){const el=$("projectMode");if(el)el.value=projectMode}
$("projectMode").onchange=e=>{projectMode=e.target.value;snapshotSoft();toast(lang==="es"?"Modo del proyecto actualizado":"Project mode updated")};
$("orientationBtn").onclick=()=>{orientation=orientation==="horizontal"?"vertical":"horizontal";localize()};
$("langBtn").onclick=()=>{lang=lang==="es"?"en":"es";localize();applyTheme()};
$("themeBtn").onclick=()=>{theme=theme==="light"?"dark":"light";localStorage.setItem("branch-theme",theme);applyTheme()};
$("editorTab").onclick=()=>setView("editor");$("statsTab").onclick=()=>setView("stats");$("simulationTab").onclick=()=>setView("simulation");

function showShortcuts(){
 const rows=lang==="es"?[
  ["Ctrl / ⌘ + S","Guardar el proyecto"],
  ["Ctrl / ⌘ + Z","Deshacer"],
  ["Ctrl / ⌘ + Shift + Z","Rehacer"],
  ["Ctrl + Y","Rehacer"],
  ["Ctrl / ⌘ + Enter","Añadir una rama al nodo seleccionado"],
  ["Supr / Retroceso","Eliminar el nodo seleccionado"],
  ["Ctrl / ⌘ + E","Abrir las opciones de exportación"],
  ["Esc","Cerrar la ventana abierta"]
 ]:[
  ["Ctrl / ⌘ + S","Save project"],
  ["Ctrl / ⌘ + Z","Undo"],
  ["Ctrl / ⌘ + Shift + Z","Redo"],
  ["Ctrl + Y","Redo"],
  ["Ctrl / ⌘ + Enter","Add a branch to the selected node"],
  ["Delete / Backspace","Delete the selected node"],
  ["Ctrl / ⌘ + E","Open export options"],
  ["Esc","Close the open dialog"]
 ];
 $("modalTitle").textContent=lang==="es"?"Atajos de teclado":"Keyboard shortcuts";
 $("modalBody").innerHTML=rows.map(([key,description])=>'<div class="modal-option"><span>'+escapeHtml(key)+'</span><small>'+escapeHtml(description)+'</small></div>').join("");
 $("modal").hidden=false;
}
$("shortcutsBtn").onclick=showShortcuts;
document.addEventListener("keydown",e=>{
 const key=e.key.toLowerCase(),mod=e.ctrlKey||e.metaKey;
 const target=e.target;
 const editing=!!(target&&(target.matches("input,textarea,select")||target.isContentEditable));
 if(e.key==="Escape")return;
 if(mod&&key==="s"){e.preventDefault();save();return}
 if(mod&&key==="e"){e.preventDefault();$("exportBtn").click();return}
 if(editing)return;
 if(mod&&key==="z"){
  e.preventDefault();
  if(e.shiftKey)$("redoBtn").click();else $("undoBtn").click();
  return;
 }
 if(mod&&key==="y"){e.preventDefault();$("redoBtn").click();return}
 if(mod&&e.key==="Enter"){e.preventDefault();addBranch(selected);return}
 if((e.key==="Delete"||e.key==="Backspace")&&selected!=="root"){
  e.preventDefault();$("deleteBtn").click();
 }
});
$("runSimulation").onclick=simulate;
$("templateBtn").onclick=()=>modal(t("templatesTitle"),[{label:t("coin"),run:()=>template("coin")},{label:t("weather"),run:()=>template("weather")},{label:t("medical"),run:()=>template("medical")},{label:t("empty"),run:()=>template("empty")}]);
$("exportBtn").onclick=()=>modal(t("exportTitle"),[
 {label:t("exportJson"),description:lang==="es"?"Guarda el proyecto para volver a editarlo.":"Save the project so you can edit it later.",run:()=>download("branch-project.json",serialize(),"application/json")},
 {label:t("exportSvg"),description:lang==="es"?"Diagrama vectorial, ampliable sin perder calidad.":"Scalable vector diagram.",run:()=>download("branch-tree.svg",svgMarkup(),"image/svg+xml;charset=utf-8")},
 {label:t("exportPng"),description:lang==="es"?"Imagen de alta resolución lista para compartir.":"High-resolution image ready to share.",run:exportPng},
 {label:t("exportPdf"),description:lang==="es"?"Imprime únicamente el diagrama o guárdalo como PDF.":"Print only the diagram or save it as PDF.",run:printTree}
]);
$("shareBtn").onclick=()=>modal(t("shareTitle"),[{label:t("shareFile"),run:()=>download("branch-share.json",serialize(),"application/json")},{label:t("shareLink"),run:()=>{let data=btoa(unescape(encodeURIComponent(serialize())));let url=location.origin+location.pathname+"#data="+data;navigator.clipboard.writeText(url).then(()=>toast(t("linkCopied"))).catch(()=>download("branch-share-link.txt",url,"text/plain"))}}]);
$("importBtn").onclick=()=>$("fileInput").click();$("fileInput").onchange=async e=>{let f=e.target.files[0];if(!f)return;try{importData(JSON.parse(await f.text()));toast(t("imported"))}catch(_){toast("Invalid JSON project")}e.target.value=""};
$("clearBtn").onclick=()=>{if(confirm(lang==="es"?"¿Crear un árbol vacío?":"Create an empty tree?"))template("empty")};
$("fitBtn").onclick=()=>drawTree();$("closeModal").onclick=()=>$("modal").hidden=true;document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("modal").hidden)$("modal").hidden=true});$("modal").onclick=e=>{if(e.target.id==="modal")$("modal").hidden=true};
$("undoBtn").onclick=()=>{if(!undoStack.length)return;redoStack.push(JSON.stringify({tree,projectName,orientation,projectMode}));let s=JSON.parse(undoStack.pop());tree=s.tree;projectName=s.projectName;orientation=s.orientation;selected="root";render()};
$("redoBtn").onclick=()=>{if(!redoStack.length)return;undoStack.push(JSON.stringify({tree,projectName,orientation,projectMode}));let s=JSON.parse(redoStack.pop());tree=s.tree;projectName=s.projectName;orientation=s.orientation;selected="root";render()};
$("statsLevel").onchange=renderStats;
try{let saved=localStorage.getItem("branch-project");if(saved){let s=JSON.parse(saved);tree=s.tree;projectName=s.projectName||projectName;orientation=s.orientation||orientation;projectMode=s.projectMode||"manual"}}catch(_){}
if(location.hash.startsWith("#data=")){try{let d=decodeURIComponent(escape(atob(location.hash.slice(6))));let s=JSON.parse(d);tree=s.tree;projectName=s.projectName||projectName;orientation=s.orientation||orientation;projectMode=s.projectMode||"manual";history.replaceState(null,"",location.pathname)}catch(_){}}
window.addEventListener("resize",drawTree);applyTheme();render();renderProjectMode();localize();
})();