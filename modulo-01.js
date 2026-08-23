const nodes=[
{id:'cerros',label:'Cerros orientales',system:'EEP',x:130,y:100,detail:'Estructura ecológica principal'},
{id:'rios',label:'Ríos',system:'EEP',x:295,y:78,detail:'Agua y conectividad ecológica'},
{id:'humedales',label:'Humedales',system:'EEP',x:455,y:118,detail:'Ecosistemas urbanos'},
{id:'bosques',label:'Bosques urbanos',system:'EEP',x:690,y:88,detail:'Coberturas vegetales'},
{id:'resiliencia',label:'Áreas de resiliencia climática',system:'EEP',x:795,y:230,detail:'Adaptación y soporte ambiental'},
{id:'vial',label:'Red vial',system:'EFC',x:145,y:335,detail:'Soporte de movilidad'},
{id:'transporte',label:'Transporte público',system:'EFC',x:342,y:310,detail:'Conectividad urbana'},
{id:'equipamientos',label:'Equipamientos',system:'EFC',x:535,y:355,detail:'Anclas de proximidad'},
{id:'vivienda',label:'Vivienda',system:'EFC',x:734,y:335,detail:'Hábitat cotidiano'},
{id:'cuidado',label:'Manzanas del Cuidado',system:'EFC',x:835,y:475,detail:'Red de cuidado'},
{id:'financieros',label:'Centros financieros',system:'ESECI',x:125,y:565,detail:'Actividad económica'},
{id:'distrito',label:'Distrito tecnológico',system:'ESECI',x:330,y:535,detail:'Innovación'},
{id:'mercados',label:'Plazas de mercado',system:'ESECI',x:560,y:575,detail:'Abastecimiento'},
{id:'turismo',label:'Zonas de interés turístico',system:'ESECI',x:760,y:555,detail:'Economía y cultura'},
{id:'patrimonio',label:'Patrimonio material e inmaterial',system:'EIP',x:470,y:210,detail:'Memoria territorial'}
];
const relations=[
{a:'cerros',b:'rios',type:'soporte',style:'discontinua',page:'p. 72, art. 42',text:'La Estructura Ecológica Principal se organiza como un sistema de áreas y corredores que sostiene la biodiversidad, el agua y los servicios ecosistémicos.'},
{a:'rios',b:'humedales',type:'soporte',style:'directa',page:'pp. 92–94',text:'Los ríos, quebradas y humedales se reconocen como componentes conectados de la estructura ecológica y del sistema hídrico.'},
{a:'humedales',b:'resiliencia',type:'soporte',style:'directa',page:'p. 96',text:'Los humedales y otros ecosistemas urbanos contribuyen a la regulación hídrica y a la resiliencia climática.'},
{a:'bosques',b:'resiliencia',type:'resiliencia',style:'directa',page:'pp. 98–100',text:'Las coberturas vegetales y los bosques urbanos aportan regulación térmica, biodiversidad y adaptación frente al cambio climático.'},
{a:'cerros',b:'patrimonio',type:'soporte',style:'discontinua',page:'pp. 118–121',text:'Los Cerros Orientales articulan valores ecológicos, paisajísticos, culturales y patrimoniales en la lectura territorial.'},
{a:'patrimonio',b:'humedales',type:'resiliencia',style:'directa',page:'pp. 118–123',text:'El patrimonio natural participa simultáneamente de la memoria territorial y de la protección de ecosistemas.'},
{a:'vial',b:'transporte',type:'soporte',style:'directa',page:'p. 43',text:'Además del Metro, Bogotá necesita ampliar sus entradas y salidas, hacer vías, ciclorrutas, cables y corredores verdes con buses eléctricos.'},
{a:'transporte',b:'vivienda',type:'soporte',style:'discontinua',page:'p. 169',text:'La conectividad multimodal y la proximidad al transporte condicionan el acceso de la vivienda a las oportunidades urbanas.'},
{a:'equipamientos',b:'vivienda',type:'soporte',style:'directa',page:'p. 126',text:'Se prioriza que los colegios y equipamientos educativos estén cerca de la vivienda o del trabajo de los padres.'},
{a:'equipamientos',b:'cuidado',type:'soporte',style:'directa',page:'p. 125',text:'Los equipamientos existentes funcionan como anclas de las Manzanas del Cuidado.'},
{a:'cuidado',b:'transporte',type:'soporte',style:'discontinua',page:'p. 122',text:'Las Manzanas del Cuidado agrupan infraestructuras y servicios para personas cuidadoras, sus familias y quienes reciben cuidado.'},
{a:'financieros',b:'distrito',type:'soporte',style:'directa',page:'pp. 164–171',text:'Los centros financieros y los servicios empresariales se conectan con los distritos tecnológicos y la innovación.'},
{a:'distrito',b:'turismo',type:'soporte',style:'directa',page:'p. 171',text:'La innovación se articula con actividades productivas, creativas y de interés turístico.'},
{a:'mercados',b:'turismo',type:'soporte',style:'discontinua',page:'pp. 164–166',text:'Las plazas de mercado aportan abastecimiento, identidad urbana y oportunidades para actividades culturales y turísticas.'},
{a:'patrimonio',b:'turismo',type:'resiliencia',style:'directa',page:'pp. 118–126',text:'El patrimonio material e inmaterial sostiene memoria, identidad y prácticas que producen sentido de lugar.'},
{a:'rios',b:'vial',type:'soporte',style:'discontinua',page:'pp. 239–241',text:'Los corredores verdes buscan articular estructura ecológica, movilidad eléctrica, ciclorrutas y espacio público.'}
];
const state={filter:'all'};
const byId=id=>nodes.find(n=>n.id===id);
const active=n=>state.filter==='all'||n.system===state.filter;
function svgEl(tag,attrs={}){const e=document.createElementNS('http://www.w3.org/2000/svg',tag);Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,v));return e;}
function showPopup(title,text,page){document.getElementById('popupTitle').textContent=title;document.getElementById('popupText').textContent=text;document.getElementById('popupPage').textContent='Rastro POT · '+page;document.getElementById('relationPopup').classList.add('open');}
function render(){
 const canvas=document.getElementById('networkCanvas'),svg=document.getElementById('networkSvg');svg.innerHTML='';canvas.querySelectorAll('.node').forEach(e=>e.remove());
 const defs=svgEl('defs');const marker=svgEl('marker',{id:'arrow',markerWidth:'8',markerHeight:'8',refX:'7',refY:'3.5',orient:'auto'});marker.appendChild(svgEl('path',{d:'M0,0 L7,3.5 L0,7 z',fill:'currentColor'}));defs.appendChild(marker);svg.appendChild(defs);
 let visible=0,support=0,res=0;
 relations.forEach((r,i)=>{const a=byId(r.a),b=byId(r.b);if(!active(a)||!active(b))return;visible++;r.type==='soporte'?support++:res++;const line=svgEl('line',{x1:a.x,y1:a.y,x2:b.x,y2:b.y,class:`rel-line ${r.type} ${r.style}`,style:`color:${r.type==='soporte'?'#f1a05f':'#70a9ff'}`,"marker-end":"url(#arrow)"});line.tabIndex=0;line.setAttribute('aria-label',`${a.label} hacia ${b.label}`);line.addEventListener('click',()=>showPopup(`${a.label} → ${b.label}`,r.text, r.page));line.addEventListener('keydown',e=>{if(e.key==='Enter')showPopup(`${a.label} → ${b.label}`,r.text,r.page)});svg.appendChild(line);});
 nodes.forEach(n=>{const el=document.createElement('button');el.className=`node ${n.system.toLowerCase()}`;el.style.left=`${n.x}px`;el.style.top=`${n.y}px`;el.innerHTML=`${n.label}<small>${n.system} · ${n.detail}</small>`;el.disabled=!active(n);el.addEventListener('click',()=>showPopup(n.label,`Este concepto pertenece a la ${n.detail.toLowerCase()} y participa en la red de relaciones del POT.`, 'ficha de lectura del módulo 01'));if(active(n))canvas.appendChild(el);});
 document.getElementById('visibleCount').textContent=visible;document.getElementById('nodeCount').textContent=nodes.filter(active).length;document.getElementById('supportCount').textContent=support;document.getElementById('resilienceCount').textContent=res;
}
document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{state.filter=btn.dataset.filter;document.querySelectorAll('.filter').forEach(b=>b.classList.toggle('active',b===btn));render();}));document.getElementById('popupClose').addEventListener('click',()=>document.getElementById('relationPopup').classList.remove('open'));document.addEventListener('keydown',e=>{if(e.key==='Escape')document.getElementById('relationPopup').classList.remove('open')});render();});
