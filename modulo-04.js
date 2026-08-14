const svg = document.getElementById('networkViz');
const note = document.getElementById('selectionNote');
const detail = document.getElementById('conceptDetail');
const resetBtn = document.getElementById('resetBtn');
const NS = 'http://www.w3.org/2000/svg';

const ambient = {
  id: 'ambientalista', x: 270, y: 365, r: 170, color: '#37d477',
  concepts: [
    ['Humedales',270,235], ['Ríos',170,300], ['Quebradas',145,405],
    ['Cerros',210,490], ['Áreas protegidas',315,500], ['Coberturas vegetales',385,420],
    ['Resiliencia climática',390,315], ['Estructura ecológica',330,245]
  ]
};

const humanSystems = [
  {id:'socioeconomico', title:'SISTEMA', subtitle:'SOCIOECONÓMICO', x:820, y:220, r:72, color:'#f5c945', concepts:['Empleo','Comercio','Actividades productivas','Vivienda','Servicios empresariales']},
  {id:'gobernanza', title:'SISTEMA DE', subtitle:'GOBERNANZA', x:965, y:365, r:72, color:'#5b8def', concepts:['Participación','Gestión pública','Coordinación institucional','Instrumentos de planificación','Actores públicos']},
  {id:'funcionalista', title:'SISTEMA', subtitle:'FUNCIONALISTA', x:820, y:510, r:72, color:'#a276f2', concepts:['Red vial','Transporte público','Ciclorutas','Infraestructura','Accesibilidad']}
];

const human = {id:'humanista', x:820, y:365, r:285, color:'#ff9567'};
const allConcepts = new Map();
let activeSystem = null;

function el(tag, attrs={}, parent=svg){
  const node = document.createElementNS(NS, tag);
  Object.entries(attrs).forEach(([key,value]) => node.setAttribute(key,value));
  parent.appendChild(node); return node;
}
function line(x1,y1,x2,y2, cls, parent){ return el('line',{x1,y1,x2,y2,class:cls},parent); }
function text(x,y,content,cls,parent=svg){ const t=el('text',{x,y,class:cls},parent); t.textContent=content; return t; }
function multiline(x,y,lines,cls,parent=svg, gap=16){ lines.forEach((lineText,i)=>text(x,y+i*gap,lineText,cls,parent)); }
function circleNode(x,y,r,color,cls,parent=svg){ return el('circle',{cx:x,cy:y,r,fill:'#111c2b',stroke:color,'stroke-width':3,class:cls},parent); }

function drawAmbientNetwork(){
  const group = el('g',{class:'ambient-network'});
  const pts = ambient.concepts.map(c=>({name:c[0],x:c[1],y:c[2]}));
  const edges = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0],[1,7],[1,5],[2,5],[3,5],[0,6]];
  edges.forEach(([a,b])=>line(pts[a].x,pts[a].y,pts[b].x,pts[b].y,'edge environmental',group));
  pts.forEach(p=>{
    const g=el('g',{class:'svg-node ambient-concept'},group);
    circleNode(p.x,p.y,29,'#8cf0a9','',g);
    text(p.x,p.y+4,p.name,'concept-label',g);
  });
}

function drawAmbient(){
  const group=el('g',{class:'svg-node ambientalista-node'});
  circleNode(ambient.x,ambient.y,ambient.r,ambient.color,'',group);
  el('circle',{cx:ambient.x,cy:ambient.y,r:ambient.r-12,fill:'none',stroke:'#8cf0a9','stroke-width':1,'stroke-dasharray':'4 8',opacity:.6},group);
  text(ambient.x,ambient.y-18,'AMBIENTALISTA','node-title',group);
  text(ambient.x,ambient.y+4,'red ecológica', 'node-subtitle',group);
  text(ambient.x,ambient.y+22,'conceptos concretos','node-subtitle',group);
  group.addEventListener('click',()=>{
    note.textContent='La red ambientalista muestra conceptos ecológicos concretos y sus conexiones.';
    detail.innerHTML='<strong>Ambientalista</strong><span>Humedales, ríos, quebradas, cerros, áreas protegidas, coberturas vegetales, resiliencia climática y estructura ecológica.</span>';
  });
}

function drawHuman(){
  const group=el('g',{class:'svg-node human-node'});
  circleNode(human.x,human.y,human.r,human.color,'',group);
  el('circle',{cx:human.x,cy:human.y,r:human.r-13,fill:'none',stroke:'#ffc0a5','stroke-width':1,'stroke-dasharray':'3 9',opacity:.65},group);
  text(human.x,human.y-22,'HUMANISTA','node-title',group);
  text(human.x,human.y+2,'bienestar y vida', 'node-subtitle',group);
  text(human.x,human.y+20,'en el territorio','node-subtitle',group);
  group.addEventListener('click',()=>{
    note.textContent='La bola humanista conecta las tres dimensiones que puedes explorar a la derecha.';
    detail.innerHTML='<strong>Humanista</strong><span>Selecciona sistema socioeconómico, gobernanza o funcionalista para desplegar sus conceptos.</span>';
  });
}

function drawHumanSystems(){
  humanSystems.forEach(system=>{
    line(human.x + Math.cos(Math.atan2(system.y-human.y,system.x-human.x))*human.r, human.y + Math.sin(Math.atan2(system.y-human.y,system.x-human.x))*human.r, system.x - Math.cos(Math.atan2(system.y-human.y,system.x-human.x))*system.r, system.y - Math.sin(Math.atan2(system.y-human.y,system.x-human.x))*system.r,'edge human');
    const g=el('g',{class:'svg-node human-system', 'data-system':system.id});
    g.style.color=system.color;
    circleNode(system.x,system.y,system.r,system.color,'',g);
    text(system.x,system.y-11,system.title,'node-subtitle',g);
    text(system.x,system.y+9,system.subtitle,'node-title',g);
    text(system.x,system.y+29,'clic para explorar','node-subtitle',g);
    system.concepts.forEach((name,index)=>{
      const angle=(-145 + index*72)*Math.PI/180;
      const cx=system.x+Math.cos(angle)*88;
      const cy=system.y+Math.sin(angle)*66;
      const cg=el('g',{class:'svg-node concept-node', 'data-parent':system.id});
      cg.style.color=system.color;
      line(system.x,system.y,cx,cy,'edge cross',cg);
      circleNode(cx,cy,22,system.color,'',cg);
      text(cx,cy+4,name,'concept-label',cg);
      allConcepts.set(`${system.id}-${index}`,{node:cg,name,system});
    });
    g.addEventListener('click',(event)=>{event.stopPropagation(); toggleSystem(system.id);});
  });
}

function toggleSystem(id){
  activeSystem=activeSystem===id?null:id;
  document.querySelectorAll('.human-system').forEach(node=>node.classList.toggle('selected',node.dataset.system===activeSystem));
  document.querySelectorAll('.concept-node').forEach(node=>{
    node.classList.toggle('visible',node.dataset.parent===activeSystem);
    node.classList.toggle('dim',activeSystem && node.dataset.parent!==activeSystem);
  });
  const system=humanSystems.find(s=>s.id===id);
  if(activeSystem){
    note.textContent=`Mostrando conceptos del ${system.subtitle.toLowerCase()}. Haz clic nuevamente para ocultarlos.`;
    detail.innerHTML=`<strong>${system.subtitle}</strong><span>${system.concepts.join(' · ')}. Estos conceptos se conectan con la lectura humanista del POT.</span>`;
  }else{
    note.textContent='Selecciona un sistema de la red humanista.';
    detail.innerHTML='<strong>Cómo leer la red</strong><span>La bola ambientalista contiene conceptos ecológicos concretos. La bola humanista se conecta con tres sistemas: socioeconómico, gobernanza y funcionalista.</span>';
  }
}

function drawCrossRelations(){
  const relations=[
    [ambient.x+ambient.r,ambient.y-35,human.x-human.r,human.y-55,'ambiental ↔ bienestar'],
    [ambient.x+ambient.r-8,ambient.y+42,human.x-human.r,human.y+54,'naturaleza ↔ territorio'],
    [human.x+human.r,human.y-52,humanSystems[0].x-humanSystems[0].r,humanSystems[0].y+25,'vida ↔ empleo'],
    [human.x+human.r,human.y,humanSystems[1].x-humanSystems[1].r,humanSystems[1].y,'vida ↔ participación'],
    [human.x+human.r,human.y+52,humanSystems[2].x-humanSystems[2].r,humanSystems[2].y-25,'vida ↔ movilidad']
  ];
  relations.forEach(r=>{line(r[0],r[1],r[2],r[3],'edge cross');text((r[0]+r[2])/2,(r[1]+r[3])/2-7,r[4],'relation-label');});
}

function render(){
  svg.innerHTML='';
  drawAmbientNetwork();
  drawAmbient();
  drawHuman();
  drawHumanSystems();
}
resetBtn.addEventListener('click',()=>{activeSystem=null;render();note.textContent='Selecciona un sistema de la red humanista.';detail.innerHTML='<strong>Cómo leer la red</strong><span>La bola ambientalista contiene conceptos ecológicos concretos. La bola humanista se conecta con tres sistemas: socioeconómico, gobernanza y funcionalista.</span>';});
render();
