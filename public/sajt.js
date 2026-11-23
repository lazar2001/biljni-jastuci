(()=>{
'use strict';

/* ================= PODEŠAVANJA =================
   Ovde menjate kontakt, dostavu i prijem porudžbina. */
const CONFIG={
  phone:'065 305 3662',
  instagram:'biljni_jastuci',
  currency:'RSD',
  shippingFee:0,                               // fiksna cena dostave u dinarima (0 = prikazuje se tekst ispod)
  shippingText:'po cenovniku kurirske službe', // tekst kada dostava nema fiksnu cenu
  freeShippingFrom:0,                          // besplatna dostava od ovog iznosa (0 = isključeno)
  orderEndpoint:''                             // adresa za prijem porudžbina, npr. Formspree; prazno = kupac kopira porudžbinu
};

/* ================= VELIČINE I CENE =================
   Probne vrednosti: zamenite pravim dimenzijama i cenama. h i w su u centimetrima. */
const SIZES=[
  {id:'20x30',name:'Jastučić',h:20,w:30,price:1990},
  {id:'30x40',name:'Mali',h:30,w:40,price:2690},
  {id:'40x50',name:'Srednji',h:40,w:50,price:3290},
  {id:'40x60',name:'Standardni',h:40,w:60,price:3890},
  {id:'50x70',name:'Veliki',h:50,w:70,price:4690}
];

/* ================= MIRISNE NOTE =================
   name, alt (drugi naziv), mood, opis, dve boje i 14 biljaka. extra = doplata za notu u dinarima. */
const NOTES=[
  {id:'more',name:'More',alt:'Mediterranean',mood:'Mediteran',line:'Kora limuna i narandže, smilje i borove iglice. Miris leta uz more.',c1:'#3E6F8E',c2:'#E2C044',extra:0,
   herbs:['limun','narandza','zova','eukaliptus','kamilica','maticnjak','nana','borove-iglice','majoran','smilje','ruzmarin','hajducica','timisan','trava-iva']},
  {id:'basta',name:'Bašta',alt:'Giardino',mood:'Bašta, vrt',line:'Lipov cvet, vanila i bela detelina. Miris bašte posle kiše.',c1:'#4D7A3B',c2:'#D2C27A',extra:0,
   herbs:['eukaliptus','maticnjak','kamilica','nana','vanila','lipov-cvet','majcina-dusica','ruzmarin','bela-detelina','majoran','valerijana','borove-iglice','timisan','hajducica']},
  {id:'prolecna',name:'Prolećna',alt:'Milbloom',mood:'Prolećno buđenje',line:'Pasiflora, narandža i lipov cvet. Svež, prolećni vazduh u sobi.',c1:'#B57B9B',c2:'#8DB46C',extra:0,
   herbs:['vanila','narandza','pasiflora','valerijana','lipov-cvet','maticnjak','kamilica','nana','borove-iglice','vranilovka','ruzmarin','majcina-dusica','smilje','hajducica']},
  {id:'osvezavajuca',name:'Osvežavajuća',alt:'Milaria',mood:'Svež vazduh',line:'Limun, nana, žalfija i morač. Najsvežija nota u kolekciji.',c1:'#4A9988',c2:'#D8D36A',extra:0,
   herbs:['limun','bela-detelina','vanila','maticnjak','kamilica','nana','hajducica','vranilovka','smilje','timisan','trava-iva','borove-iglice','zalfija','morac']},
  {id:'letnja',name:'Letnja',alt:'Parisian Night',mood:'Pariska noć',line:'Narandža, zova i koren valerijane. Topla letnja noć.',c1:'#5A4E89',c2:'#DB8B3F',extra:0,
   herbs:['narandza','zova','valerijana','nana','kamilica','maticnjak','trava-iva','timisan','smilje','majcina-dusica','vranilovka','ruzmarin','zalfija','lipov-cvet']},
  {id:'zimska',name:'Zimska',alt:'Inverno',mood:'Zima',line:'Eukaliptus, majoran i hmelj. Miris zimskih večeri.',c1:'#5B7A8D',c2:'#2F5244',extra:0,
   herbs:['eukaliptus','maticnjak','majoran','lipov-cvet','nana','kamilica','ruzmarin','majcina-dusica','vranilovka','hajducica','smilje','timisan','trava-iva','hmelj']},
  {id:'jesenja',name:'Jesenja',alt:'Autonno',mood:'Jesen',line:'Limun, zova, žalfija i morač. Mekan, topao miris jeseni.',c1:'#B2732F',c2:'#7F8B5A',extra:0,
   herbs:['limun','zova','bela-detelina','maticnjak','kamilica','nana','ruzmarin','borove-iglice','morac','majcina-dusica','smilje','zalfija','timisan','hajducica']}
];

/* ================= BILJE =================
   n = naziv, l = latinski naziv, i = ikonica, c = boja ikonice, d = opis. */
const HERBS={
  'limun':{n:'Žuti limun',l:'Citrus limon',i:'citrus',c:'#C29B1C',d:'Vedra citrusna svežina kore limuna. Osvežava prostor od prvog udaha.'},
  'narandza':{n:'Narandža',l:'Citrus sinensis',i:'citrus',c:'#D07A2C',d:'Topla, slatka nota kore narandže koja unosi vedrinu u sobu.'},
  'zova':{n:'Zova',l:'Sambucus nigra',i:'umbel',c:'#8E8A4E',d:'Nežna, medena nota cveta zove, ubranog krajem proleća.'},
  'eukaliptus':{n:'Eukaliptus',l:'Eucalyptus globulus',i:'round',c:'#4F8C88',d:'Sveža, kamforasta nota koja daje osećaj lakog, čistog daha.'},
  'kamilica':{n:'Kamilica',l:'Matricaria chamomilla',i:'daisy',c:'#C4A02A',d:'Nežna, medena nota. U tradiciji biljka večernjeg opuštanja.'},
  'maticnjak':{n:'Matičnjak',l:'Melissa officinalis',i:'leaf',c:'#6E9448',d:'Limunasta, umirujuća nota. U narodu poznat kao biljka mira.'},
  'nana':{n:'Nana',l:'Mentha × piperita',i:'leaf',c:'#3F8C62',d:'Hladna, osvežavajuća nota koja daje osećaj svežine pri svakom udahu.'},
  'borove-iglice':{n:'Borove iglice',l:'Pinus sylvestris',i:'needles',c:'#3D6A4C',d:'Smolasta šumska nota. Miris planine i četinara u vašem prostoru.'},
  'majoran':{n:'Majoran',l:'Origanum majorana',i:'sprig',c:'#7E8C4E',d:'Topla, blago slatka začinska nota koja prostoru daje toplinu.'},
  'smilje':{n:'Smilje',l:'Helichrysum italicum',i:'umbel',c:'#C29A2E',d:'Medeno-začinska nota mediteranskih padina. Cvet koji dugo čuva miris.'},
  'ruzmarin':{n:'Ruzmarin',l:'Salvia rosmarinus',i:'needles',c:'#55786A',d:'Bistra, zeleno-drvenasta nota koja razbuđuje čula.'},
  'hajducica':{n:'Hajdučica',l:'Achillea millefolium',i:'umbel',c:'#9A8466',d:'Travnata, blago gorka nota livade. Stara biljka narodne tradicije.'},
  'timisan':{n:'Timišan',l:'',i:'sprig',c:'#7C8450',d:'Aromatična biljka tople, travnate note.'},
  'trava-iva':{n:'Trava iva',l:'Teucrium montanum',i:'sprig',c:'#8A9466',d:'Gorka planinska nota. Tradicionalna biljka brdskih livada.'},
  'vanila':{n:'Vanila',l:'Vanilla planifolia',i:'pod',c:'#8A6544',d:'Topla, mekana i slatka nota koja zaokružuje mešavinu.'},
  'lipov-cvet':{n:'Lipov cvet',l:'Tilia cordata',i:'linden',c:'#B5A346',d:'Medena, letnja nota. Lipa se u tradiciji vezuje za mirno veče.'},
  'majcina-dusica':{n:'Majčina dušica',l:'Thymus serpyllum',i:'sprig',c:'#8C6E9C',d:'Topla, začinsko-travnata nota zimskih večeri.'},
  'bela-detelina':{n:'Bela detelina',l:'Trifolium repens',i:'clover',c:'#6F9160',d:'Blaga, slatkasta nota pokošene livade.'},
  'valerijana':{n:'Koren valerijane',l:'Valeriana officinalis',i:'root',c:'#8E6C4C',d:'Duboka, zemljana nota. U tradiciji se vezuje za miran san.'},
  'pasiflora':{n:'Pasiflora',l:'Passiflora incarnata',i:'daisy',c:'#8A72AE',d:'Nežna cvetna nota. U tradiciji biljka opuštanja.'},
  'vranilovka':{n:'Vranilovka',l:'Origanum vulgare',i:'sprig',c:'#9A6A82',d:'Topla, začinska nota divljeg origana sa brdskih livada.'},
  'zalfija':{n:'Žalfija',l:'Salvia officinalis',i:'leaf',c:'#6F8C82',d:'Biljna, blago kamforasta nota koja prostoru daje osećaj čistine.'},
  'morac':{n:'Morač',l:'Foeniculum vulgare',i:'umbel',c:'#9C9A44',d:'Slatka, anisasta nota, mekana i topla.'},
  'hmelj':{n:'Hmelj',l:'Humulus lupulus',i:'cone',c:'#7FA046',d:'Gorko-cvetna nota. Hmeljem su se nekada punili jastuci za san.'}
};
const HERB_IDS=Object.keys(HERBS);

/* ================= FOTOGRAFIJE =================
   Sajt prvo traži fajl u folderu slike/ (npr. slike/biljke/kamilica.webp, slike/note/more.webp).
   Ako ga nema, učitava fotografiju sa Unsplash-a po ID-u ispod. Prazan ID = crtež biljke. */
const PHOTOS={
  note:{more:'photo-1764177235576-da62f07e2cf4',basta:'photo-1779538113139-d36ae431a448',prolecna:'photo-1777458480883-506383822bb2',osvezavajuca:'photo-1555037015-1498966bcd7c',letnja:'photo-1678028204645-df95d07e2523',zimska:'photo-1675373420153-809b8d1da50c',jesenja:'photo-1454129170132-347ea87dc9dd'},
  biljke:{'limun':'photo-1608322368735-b6b6ec262af7','narandza':'photo-1582979512210-99b6a53386f9','zova':'photo-1765796716954-6031d15a0244','eukaliptus':'photo-1780599894862-de1f8f9bfa3d','kamilica':'photo-1631037958943-f6c220c4703a','maticnjak':'photo-1777707337106-afe035a119a5','nana':'photo-1618130070080-91f4d55a2383','borove-iglice':'photo-1591509355593-763dca7696a2','majoran':'photo-1501085934018-450c8e615dbc','smilje':'photo-1721934177175-91b8e611e8f5','ruzmarin':'photo-1761464644390-3e8615093ce7','hajducica':'photo-1655768450033-10397b3985df','timisan':'photo-1786019619255-51c892243a6c','trava-iva':'','vanila':'photo-1592788174877-3f99727fd23d','lipov-cvet':'photo-1781056966179-8d2d5a1fddd3','majcina-dusica':'photo-1589562037508-ae76f4c445e2','bela-detelina':'photo-1707547353821-469a452e104f','valerijana':'photo-1654022180371-c4d2d6347e28','pasiflora':'photo-1786910524479-640ac7bc8dc6','vranilovka':'photo-1675644002315-9175c115e792','zalfija':'photo-1734367607096-9005870e78b7','morac':'photo-1696730237833-9b2740a7423e','hmelj':'photo-1598115746165-0c5e79077d30'}
};

/* ================= POMOĆNE FUNKCIJE ================= */
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const nf=new Intl.NumberFormat('sr-Latn-RS');
const money=v=>nf.format(Math.round(v))+' '+CONFIG.currency;
const dims=s=>`${s.h} × ${s.w} cm`;
const noteById=id=>NOTES.find(n=>n.id===id);
const sizeById=id=>SIZES.find(s=>s.id===id);
const unit=(n,s)=>s.price+(n.extra||0);
const plural=(k,one,few,many)=>{const a=k%10,b=k%100;return a===1&&b!==11?one:(a>=2&&a<=4&&(b<12||b>14)?few:many)};
const ico=(t,c='')=>`<svg class="${c}" viewBox="0 0 48 48" aria-hidden="true"><use href="#i-${t}"/></svg>`;
const pillowD=(x,y,w,h)=>{const k=.09,r=v=>+v.toFixed(2);return `M${r(x)} ${r(y)}Q${r(x+w/2)} ${r(y+h*k)} ${r(x+w)} ${r(y)}Q${r(x+w-w*k*.6)} ${r(y+h/2)} ${r(x+w)} ${r(y+h)}Q${r(x+w/2)} ${r(y+h-h*k)} ${r(x)} ${r(y+h)}Q${r(x+w*k*.6)} ${r(y+h/2)} ${r(x)} ${r(y)}Z`};
const pillowStack=(x,y,w,h)=>{const d=pillowD(x,y,w,h),s=pillowD(x+w*.035,y+h*.05,w*.93,h*.9);return `<path class="pl-base" d="${d}"/><path class="pl-tint" d="${d}"/><path d="${d}" fill="url(#lin)"/><path d="${d}" fill="url(#puff)"/><path class="pl-seam" d="${s}"/>`};
const WISPS='<path class="wisp" d="M-58 0c-10-20 12-32 2-52s8-36 0-56"/><path class="wisp" style="animation-delay:-2s" d="M0-2c-12-22 14-36 2-58s10-38 0-60"/><path class="wisp" style="animation-delay:-4s" d="M58 0c-10-20 12-32 2-52s8-36 0-56"/>';
const CHECK='<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M5 12.5 10 17 19 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
/* fotografija: prvo lokalni fajl, pa Unsplash, pa crtež ispod nje */
const pic=(kind,id,w,h,alt,eager)=>{const p=(PHOTOS[kind]||{})[id]||'',remote=p?`https://images.unsplash.com/${p}?w=${w}&h=${h}&fit=crop&q=70&auto=format`:'';return `<img src="slike/${kind}/${id}.webp" data-remote="${remote}" alt="${alt}" ${eager?'':'loading="lazy" '}decoding="async">`};
const dropOlder=im=>{let p=im.previousElementSibling;while(p){const q=p.previousElementSibling;p.remove();p=q}};
document.addEventListener('load',e=>{const im=e.target;if(!(im instanceof HTMLImageElement)||!('remote' in im.dataset))return;im.classList.add('ok');if(im.closest('.o-scene'))setTimeout(()=>dropOlder(im),950)},true);
document.addEventListener('error',e=>{const im=e.target;if(!(im instanceof HTMLImageElement)||!('remote' in im.dataset))return;if(im.dataset.remote&&!im.dataset.tried){im.dataset.tried='1';im.src=im.dataset.remote;return}if(im.closest('.o-scene'))dropOlder(im);im.remove()},true);

/* ================= STANJE I KORPA ================= */
const STORE='bj-korpa-v1';
function loadCart(){
  try{
    const v=JSON.parse(localStorage.getItem(STORE)||'[]');
    return Array.isArray(v)?v.filter(l=>l&&noteById(l.note)&&sizeById(l.size)&&l.qty>0).map(l=>({key:l.note+'|'+l.size,note:l.note,size:l.size,qty:Math.min(99,l.qty|0)})):[];
  }catch(e){return[]}
}
function saveCart(){try{localStorage.setItem(STORE,JSON.stringify(state.cart))}catch(e){}}
const state={note:'more',size:'40x60',qty:1,filter:'sve',cart:loadCart()};
const note=()=>noteById(state.note);
const size=()=>sizeById(state.size);

/* ================= NASLOVNI DEO ================= */
function buildHero(){
  const ph=$('#heroPhoto');
  $('#heroWisps').innerHTML=WISPS;
  if(!reduce&&matchMedia('(pointer: fine)').matches){
    const host=ph.parentElement;
    host.addEventListener('pointermove',e=>{const r=ph.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;ph.style.setProperty('--rx',(-y*7).toFixed(2)+'deg');ph.style.setProperty('--ry',(x*9).toFixed(2)+'deg');ph.style.setProperty('--gx',((x+.5)*100).toFixed(1)+'%');ph.style.setProperty('--gy',((y+.5)*100).toFixed(1)+'%')});
    host.addEventListener('pointerleave',()=>{ph.style.setProperty('--rx','0deg');ph.style.setProperty('--ry','0deg')});
  }
}
function buildRibbon(){
  const leaf='<svg viewBox="0 0 24 24"><use href="#i-flyleaf"/></svg>';
  const row=HERB_IDS.map(id=>`<span>${HERBS[id].n}</span>${leaf}`).join('');
  $('#ribbon').innerHTML=row+row;
}

/* ================= KONFIGURATOR ================= */
function renderNotes(){
  $('#notes').innerHTML=NOTES.map((n,i)=>`<button type="button" class="note pop" role="radio" aria-checked="${n.id===state.note}" data-note="${n.id}" style="--c1:${n.c1};--c2:${n.c2};--i:${i}">
    <span class="swatch">${n.herbs.slice(0,3).map(h=>ico(HERBS[h].i)).join('')}${pic('note',n.id,640,480,'')}</span>
    <span class="note-name">${n.name}</span><span class="note-alt">${n.alt}</span>
    <span class="note-tick">${CHECK}</span></button>`).join('');
}
function miniPillow(s,cls){
  const W=120,H=90,k=1.5,w=s.w*k,h=s.h*k,x=(W-w)/2,y=(H-h)/2-3;
  return `<svg class="${cls||''}" viewBox="0 0 ${W} ${H}" aria-hidden="true"><path class="mini" d="${pillowD(x,y,w,h)}" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M${x} ${H-5}h${w}" stroke="currentColor" stroke-opacity=".45" stroke-width="1" fill="none"/></svg>`;
}
function renderSizes(){
  const n=note();
  $('#sizes').innerHTML=SIZES.map((s,i)=>`<button type="button" class="size pop" role="radio" aria-checked="${s.id===state.size}" data-size="${s.id}" style="--c1:${n.c1};--i:${i}">
    ${miniPillow(s)}<span class="s-name">${s.name}</span><span class="s-dim">${dims(s)}</span><span class="s-price">${money(unit(n,s))}</span></button>`).join('');
}
let lastScene=null;
function renderPreview(){
  const n=note(),s=size(),pv=$('#pv'),bd=$('.build');
  pv.style.setProperty('--c1',n.c1);bd.style.setProperty('--c1',n.c1);bd.style.setProperty('--c2',n.c2);
  if(lastScene!==n.id){lastScene=n.id;$('#oScene').insertAdjacentHTML('beforeend',pic('note',n.id,1100,780,'',true))}
  const sx=s.w/70,sy=s.h/50,pw=448*sx,ph=320*sy,cx=300,cy=240;
  $('#pvBody').style.transform=`scale(${sx},${sy})`;
  $('#pvTag').style.transform=`translate(${cx+pw/2-134}px,${cy+ph/2-22}px) rotate(-4deg)`;
  $('#pvTagT').textContent=n.alt;
  $('#pvWisps').style.transform=`translate(${cx}px,${cy-ph/2+6}px)`;
  const g=$('#pvDims');g.classList.remove('in');
  const x1=cx-pw/2,x2=cx+pw/2,yb=cy+ph/2+24,y1=cy-ph/2,y2=cy+ph/2,xl=x1-24;
  g.innerHTML=`<path d="M${x1} ${yb}H${x2}M${x1} ${yb-6}v12M${x2} ${yb-6}v12"/><text x="${cx}" y="${yb+21}">${s.w} cm</text><path d="M${xl} ${y1}V${y2}M${xl-6} ${y1}h12M${xl-6} ${y2}h12"/><text x="${xl-12}" y="${cy}" transform="rotate(-90 ${xl-12} ${cy})">${s.h} cm</text>`;
  requestAnimationFrame(()=>requestAnimationFrame(()=>g.classList.add('in')));
  pv.setAttribute('aria-label',`Biljni jastuk ${n.name}, ${dims(s)}`);
}
function renderHerbs(){
  const n=note();
  $('#herbs').innerHTML=n.herbs.map((id,i)=>{const h=HERBS[id];return `<li class="herb pop" style="--hc:${h.c};--i:${i}"><span class="ph">${ico(h.i)}${pic('biljke',id,240,240,h.n)}</span><b>${h.n}</b>${h.l?`<i>${h.l}</i>`:''}<span>${h.d}</span></li>`}).join('');
  $('#herbCount').textContent=`${n.herbs.length} ${plural(n.herbs.length,'biljka','biljke','biljaka')} u noti ${n.name}`;
}
function tween(el,to){
  const from=parseFloat(el.dataset.v);el.dataset.v=to;
  if(reduce||isNaN(from)||from===to){el.textContent=money(to);return}
  const t0=performance.now(),d=520;
  const step=t=>{const p=Math.min(1,(t-t0)/d),e=1-Math.pow(1-p,3);el.textContent=money(from+(to-from)*e);if(p<1)requestAnimationFrame(step)};
  requestAnimationFrame(step);
}
function renderOrder(){
  const n=note(),s=size(),u=unit(n,s);
  $('#oAlt').textContent=`${n.alt}, ${n.mood}`;
  $('#oTitle').textContent=`${n.name}, ${dims(s)}`;
  $('#oMood').textContent=n.line;
  tween($('#oPrice'),u);
  tween($('#oTotal'),u*state.qty);
  $('#qty').textContent=state.qty;
  $('#mbT').textContent=`${n.name}, ${dims(s)}`;
  $('#mbP').textContent=money(u*state.qty);
}
function nudge(sel){
  const el=$(sel),r=el.getBoundingClientRect();
  if(r.top>innerHeight*.7||r.top<0)el.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});
}
function selectNote(id,guide){
  if(!noteById(id))return;
  state.note=id;
  $$('#notes .note').forEach(b=>b.setAttribute('aria-checked',String(b.dataset.note===id)));
  renderSizes();renderPreview();renderHerbs();renderOrder();
  if(guide)nudge('#step-size');
}
function selectSize(id,guide){
  if(!sizeById(id))return;
  state.size=id;
  $$('#sizes .size').forEach(b=>b.setAttribute('aria-checked',String(b.dataset.size===id)));
  renderPreview();renderHerbs();renderOrder();
  if(guide)nudge('#step-pillow');
}

/* ================= HERBARIJUM ================= */
function renderFilters(){
  $('#filters').innerHTML=`<button type="button" class="chip" data-filter="sve" aria-pressed="true">Sve biljke</button>`+NOTES.map(n=>`<button type="button" class="chip" data-filter="${n.id}" aria-pressed="false" style="--c1:${n.c1}"><span class="dot"></span>${n.name}</button>`).join('');
}
function renderAtlas(){
  $('#atlas').innerHTML=HERB_IDS.map(id=>{const h=HERBS[id],ns=NOTES.filter(n=>n.herbs.includes(id));return `<li class="spec" data-herb="${id}" style="--hc:${h.c}">
    <span class="ph spec-ph">${ico(h.i,'big')}${pic('biljke',id,480,360,h.n)}</span><div class="spec-label"><b>${h.n}</b>${h.l?`<i>${h.l}</i>`:''}</div><span class="spec-d">${h.d}</span>
    <div class="in"><small>U notama:</small>${ns.map(n=>`<button type="button" class="chip" data-go="${n.id}" style="--c1:${n.c1}" aria-label="Izaberi notu ${n.name}"><span class="dot"></span>${n.name}</button>`).join('')}</div></li>`}).join('');
}
function applyFilter(id){
  state.filter=id;
  $$('#filters .chip').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===id)));
  const n=noteById(id);
  $$('#atlas .spec').forEach(li=>{const on=!n||n.herbs.includes(li.dataset.herb);li.classList.toggle('dim',!on);li.classList.toggle('hit',!!n&&on);if(n)li.style.setProperty('--c1',n.c1)});
  const k=n?n.herbs.length:HERB_IDS.length;
  $('#atlasCount').textContent=n?`${k} ${plural(k,'biljka','biljke','biljaka')} u noti ${n.name}`:`${k} ${plural(k,'biljka','biljke','biljaka')} u kolekciji`;
}

/* ================= KORPA ================= */
function lineTotal(l){return unit(noteById(l.note),sizeById(l.size))*l.qty}
function totals(){
  const sub=state.cart.reduce((a,l)=>a+lineTotal(l),0);
  const free=CONFIG.freeShippingFrom&&sub>=CONFIG.freeShippingFrom;
  const ship=!sub||free?0:(CONFIG.shippingFee||0);
  return {sub,ship,free,total:sub+ship,count:state.cart.reduce((a,l)=>a+l.qty,0)};
}
function shipLabel(t){if(t.free)return 'Besplatna';return CONFIG.shippingFee?money(t.ship):CONFIG.shippingText}
function renderCart(){
  const t=totals();
  $('#cartCount').textContent=t.count;
  $('#cartBtn').setAttribute('aria-label',`Otvori korpu, ${t.count} ${plural(t.count,'jastuk','jastuka','jastuka')}`);
  $('#lines').innerHTML=state.cart.map(l=>{const n=noteById(l.note),s=sizeById(l.size);return `<li class="line" style="--c1:${n.c1}">
    ${miniPillow(s,'thumb')}<div><b>${n.name}</b><small>${n.alt}, ${dims(s)}</small><small>${money(unit(n,s))} po komadu</small></div><span class="lp">${money(lineTotal(l))}</span>
    <div class="ctrl"><div class="qty sm"><button type="button" data-dec="${l.key}" aria-label="Smanji količinu">−</button><output>${l.qty}</output><button type="button" data-inc="${l.key}" aria-label="Povećaj količinu">+</button></div><button type="button" class="rm" data-rm="${l.key}">Ukloni</button></div></li>`}).join('');
  $$('#lines .line .mini').forEach(p=>{p.style.fill='var(--c1)';p.style.fillOpacity='.45'});
  const has=state.cart.length>0;
  $('#lines').hidden=!has;$('#sum').hidden=!has;$('#empty').hidden=has;
  $('#sSub').textContent=money(t.sub);
  $('#sShip').textContent=shipLabel(t);
  $('#sTot').textContent=money(t.total);
  $('#sHint').textContent=CONFIG.shippingFee?(CONFIG.freeShippingFrom&&!t.free?`Besplatna dostava za porudžbine od ${money(CONFIG.freeShippingFrom)}.`:''):`Iznos je bez dostave. Dostava se plaća ${CONFIG.shippingText}.`;
  $('#sHint').hidden=!$('#sHint').textContent;
}
function bumpCart(){const b=$('#cartBtn');b.classList.remove('bump');void b.offsetWidth;b.classList.add('bump')}
function fly(from){
  if(reduce||!from||!from.getBoundingClientRect){bumpCart();return}
  const a=from.getBoundingClientRect(),b=$('#cartBtn').getBoundingClientRect();
  const d=document.createElement('div');d.className='fly';
  d.style.left=(a.left+a.width/2-9)+'px';d.style.top=(a.top+a.height/2-9)+'px';
  document.body.appendChild(d);
  const dx=b.left+b.width/2-(a.left+a.width/2),dy=b.top+b.height/2-(a.top+a.height/2);
  const an=d.animate([{transform:'translate(0,0) rotate(0) scale(1)'},{transform:`translate(${dx*.45}px,${dy*.45-90}px) rotate(200deg) scale(1.25)`,offset:.5},{transform:`translate(${dx}px,${dy}px) rotate(380deg) scale(.45)`,opacity:.5}],{duration:820,easing:'cubic-bezier(.5,0,.3,1)'});
  an.onfinish=()=>{d.remove();bumpCart()};
}
let toastT;
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('show'),2600)}
function addCurrent(from){
  const n=note(),s=size(),key=n.id+'|'+s.id,line=state.cart.find(l=>l.key===key);
  if(line)line.qty=Math.min(99,line.qty+state.qty);else state.cart.push({key,note:n.id,size:s.id,qty:state.qty});
  saveCart();renderCart();fly(from);
  toast(`Dodato u korpu: ${n.name}, ${dims(s)}`);
  state.qty=1;renderOrder();
}
function changeQty(key,d){
  const l=state.cart.find(x=>x.key===key);if(!l)return;
  l.qty=Math.min(99,l.qty+d);
  if(l.qty<1)state.cart=state.cart.filter(x=>x.key!==key);
  saveCart();renderCart();
}
function removeLine(key){state.cart=state.cart.filter(x=>x.key!==key);saveCart();renderCart();toast('Uklonjeno iz korpe')}

/* ================= FIOKA: korpa, poručivanje, potvrda ================= */
let lastFocus=null,closeT;
function showView(v){
  $('#vCart').hidden=v!=='cart';$('#checkout').hidden=v!=='checkout';$('#done').hidden=v!=='done';
  $('#dTitle').textContent=v==='checkout'?'Poručivanje':v==='done'?'Hvala':'Korpa';
  $('.d-body').scrollTop=0;
}
function openDrawer(v){
  clearTimeout(closeT);
  lastFocus=document.activeElement;showView(v||'cart');
  const d=$('#drawer'),s=$('#scrim');d.hidden=false;s.hidden=false;
  requestAnimationFrame(()=>requestAnimationFrame(()=>{d.classList.add('open');s.classList.add('open')}));
  document.documentElement.style.overflow='hidden';
  setTimeout(()=>$('#closeDrawer').focus(),60);
}
function closeDrawer(){
  const d=$('#drawer'),s=$('#scrim');
  d.classList.remove('open');s.classList.remove('open');
  document.documentElement.style.overflow='';
  closeT=setTimeout(()=>{d.hidden=true;s.hidden=true},470);
  if(lastFocus&&lastFocus.focus)lastFocus.focus();
}
function openCheckout(){
  if(!state.cart.length)return;
  const t=totals();
  $('#coSum').innerHTML=`<span>Vaša porudžbina</span><strong>${t.count} ${plural(t.count,'jastuk','jastuka','jastuka')}, ${money(t.total)}</strong><span>${state.cart.map(l=>{const n=noteById(l.note),s=sizeById(l.size);return `${l.qty} × ${n.name}, ${dims(s)}`}).join('<br>')}</span>`;
  showView('checkout');
  setTimeout(()=>$('#f-ime').focus(),80);
}
const RULES={
  ime:v=>v.trim().length>=3||'Unesite ime i prezime.',
  tel:v=>/^(\+?381|0)\d{8,9}$/.test(v.replace(/[\s/()-]/g,''))||'Unesite broj telefona, na primer 065 123 4567.',
  email:v=>!v.trim()||/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())||'Proverite e-mail adresu.',
  adresa:v=>v.trim().length>=4||'Unesite ulicu i broj.',
  mesto:v=>v.trim().length>=2||'Unesite mesto.',
  pb:v=>/^\d{5}$/.test(v.trim())||'Poštanski broj ima 5 cifara.'
};
function checkField(name){
  const inp=$('#f-'+name),ok=RULES[name](inp.value),bad=ok!==true;
  inp.closest('.field').classList.toggle('bad',bad);
  inp.setAttribute('aria-invalid',String(bad));
  $('#e-'+name).textContent=bad?ok:'';
  return !bad;
}
function orderNumber(){
  const d=new Date(),p=v=>String(v).padStart(2,'0');
  return `BJ-${String(d.getFullYear()).slice(2)}${p(d.getMonth()+1)}${p(d.getDate())}-${Math.floor(1000+Math.random()*9000)}`;
}
async function submitOrder(e){
  e.preventDefault();
  const names=Object.keys(RULES);let first=null;
  names.forEach(n=>{if(!checkField(n)&&!first)first=n});
  if(first){$('#f-'+first).focus();return}
  const v=n=>$('#f-'+n).value.trim(),t=totals(),broj=orderNumber();
  const stavke=state.cart.map(l=>{const n=noteById(l.note),s=sizeById(l.size);return {nota:`${n.name} (${n.alt})`,velicina:dims(s),kolicina:l.qty,cena:unit(n,s),ukupno:lineTotal(l)}});
  const order={broj,datum:new Date().toISOString(),kupac:{ime:v('ime'),telefon:v('tel'),email:v('email'),adresa:v('adresa'),mesto:v('mesto'),postanskiBroj:v('pb'),napomena:v('napomena')},placanje:'pouzećem',stavke,jastuci:t.sub,dostava:CONFIG.shippingFee?t.ship:CONFIG.shippingText,zaPlacanje:t.total};
  const text=[`Porudžbina ${broj}`,`Ime: ${order.kupac.ime}`,`Telefon: ${order.kupac.telefon}`,...(order.kupac.email?[`E-mail: ${order.kupac.email}`]:[]),`Adresa: ${order.kupac.adresa}, ${order.kupac.postanskiBroj} ${order.kupac.mesto}`,'Plaćanje: pouzećem','',...stavke.map(s=>`${s.kolicina} × ${s.nota}, ${s.velicina}: ${money(s.ukupno)}`),'',`Dostava: ${shipLabel(t)}`,`Za plaćanje: ${money(t.total)}`,...(order.kupac.napomena?['',`Napomena: ${order.kupac.napomena}`]:[])].join('\n');
  const btn=$('#coSubmit');btn.disabled=true;btn.textContent='Šaljem…';
  let sent=false;
  if(CONFIG.orderEndpoint){
    try{const r=await fetch(CONFIG.orderEndpoint,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(Object.assign({},order,{tekst:text}))});sent=r.ok}catch(err){sent=false}
  }
  btn.disabled=false;btn.textContent='Poruči';
  $('#receipt').textContent=text;
  if(sent){
    $('#doneTitle').textContent=`Porudžbina ${broj} je primljena`;
    $('#doneText').textContent=`Pozvaćemo vas na ${order.kupac.telefon} da potvrdimo isporuku. Plaćate pouzećem, kada paket stigne.`;
  }else{
    $('#doneTitle').textContent=`Porudžbina ${broj} je spremna`;
    $('#doneText').textContent=`Kopirajte je i pošaljite nam u Instagram poruke ili SMS-om na ${CONFIG.phone}. Porudžbinu potvrđujemo telefonom.`;
  }
  state.cart=[];saveCart();renderCart();
  $('#checkout').reset();$$('#checkout .field').forEach(f=>f.classList.remove('bad'));$$('#checkout .err').forEach(x=>x.textContent='');
  showView('done');
  setTimeout(()=>$('#doneTitle').focus&&$('#doneTitle').setAttribute('tabindex','-1'),0);
}
async function copyText(txt,node){
  try{await navigator.clipboard.writeText(txt);toast('Kopirano')}
  catch(e){if(node){const r=document.createRange();r.selectNodeContents(node);const s=getSelection();s.removeAllRanges();s.addRange(r)}toast('Tekst je označen, kopirajte ga')}
}

/* ================= DOGAĐAJI ================= */
document.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  const ds=b.dataset;
  if(ds.note){selectNote(ds.note,true);return}
  if(ds.size){selectSize(ds.size,true);return}
  if(ds.filter){applyFilter(ds.filter);return}
  if(ds.go){selectNote(ds.go,false);$('#note').scrollIntoView({behavior:reduce?'auto':'smooth'});toast(`Izabrana nota ${noteById(ds.go).name}`);return}
  if(ds.inc){changeQty(ds.inc,1);return}
  if(ds.dec){changeQty(ds.dec,-1);return}
  if(ds.rm){removeLine(ds.rm);return}
  if(ds.copy){copyText(ds.copy,ds.copyNode?$(ds.copyNode):null);return}
});
$('#qMinus').addEventListener('click',()=>{state.qty=Math.max(1,state.qty-1);renderOrder()});
$('#qPlus').addEventListener('click',()=>{state.qty=Math.min(99,state.qty+1);renderOrder()});
$('#addBtn').addEventListener('click',e=>addCurrent(e.currentTarget));
$('#mbAdd').addEventListener('click',e=>addCurrent(e.currentTarget));
$('#cartBtn').addEventListener('click',()=>openDrawer('cart'));
$('#closeDrawer').addEventListener('click',closeDrawer);
$('#scrim').addEventListener('click',closeDrawer);
$('#emptyGo').addEventListener('click',()=>{closeDrawer();setTimeout(()=>$('#note').scrollIntoView({behavior:reduce?'auto':'smooth'}),80)});
$('#toCheckout').addEventListener('click',openCheckout);
$('#backToCart').addEventListener('click',()=>showView('cart'));
$('#checkout').addEventListener('submit',submitOrder);
Object.keys(RULES).forEach(n=>$('#f-'+n).addEventListener('input',()=>{if($('#f-'+n).closest('.field').classList.contains('bad'))checkField(n)}));
$('#copyOrder').addEventListener('click',()=>copyText($('#receipt').textContent,$('#receipt')));
$('#backShop').addEventListener('click',()=>{closeDrawer();setTimeout(()=>showView('cart'),480)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#drawer').hidden)closeDrawer()});

/* traka na telefonu kada dugme za korpu nije vidljivo */
let inStudio=false,addSeen=true;
if('IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>{es.forEach(en=>{if(en.target.id==='note')inStudio=en.isIntersecting;else addSeen=en.isIntersecting});$('#mbar').classList.toggle('show',inStudio&&!addSeen)});
  io.observe($('#note'));io.observe($('#addBtn'));
}

/* vreža i lišće prate skrol */
const vine=$('#vinePath'),hero=$('#hero');let ticking=false;
function onScroll(){
  ticking=false;
  const de=document.documentElement,p=de.scrollTop/Math.max(1,de.scrollHeight-de.clientHeight);
  if(vine)vine.style.strokeDashoffset=String(1-Math.min(1,p*1.05));
  if(!reduce)hero.style.setProperty('--sy',String(Math.min(window.scrollY,900)));
}
window.addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(onScroll)}},{passive:true});

/* ================= UTISCI =================
   Screenshotove stavite u slike/utisci/ kao utisak-1.webp, utisak-2.webp... (može i .jpg: promenite EXT). */
const REVIEWS={count:6,ext:'webp'};
(function(){
  const t=$('#rvTrack');
  t.innerHTML=Array.from({length:REVIEWS.count},(_,i)=>`<li class="rv"><div class="rv-card">${ico('leaf')}<b>Utisak ${i+1}</b><small>slike/utisci/utisak-${i+1}.${REVIEWS.ext}</small><img src="slike/utisci/utisak-${i+1}.${REVIEWS.ext}" data-remote="" alt="Utisak kupca ${i+1}" loading="lazy" decoding="async"></div></li>`).join('');
  const step=()=>t.querySelector('.rv').getBoundingClientRect().width+16;
  $('#rvPrev').addEventListener('click',()=>t.scrollBy({left:-step()*2}));
  $('#rvNext').addEventListener('click',()=>t.scrollBy({left:step()*2}));
  let down=false,x0=0,s0=0,moved=false;
  t.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')return;down=true;moved=false;x0=e.clientX;s0=t.scrollLeft});
  window.addEventListener('pointermove',e=>{if(!down)return;const dx=e.clientX-x0;if(Math.abs(dx)>4){moved=true;t.classList.add('drag')}t.scrollLeft=s0-dx});
  window.addEventListener('pointerup',()=>{if(!down)return;down=false;t.classList.remove('drag')});
  t.addEventListener('click',e=>{if(moved){e.preventDefault();e.stopPropagation()}},true);
})();

/* ================= POKRETANJE ================= */
$('#pvWisps').innerHTML=WISPS;
$('#pvBody').innerHTML=pillowStack(76,80,448,320);
renderNotes();renderSizes();renderPreview();renderHerbs();renderOrder();
renderFilters();renderAtlas();applyFilter('sve');
renderCart();buildHero();onScroll();
$('#year').textContent=new Date().getFullYear();
})();
