// FoodFlix: choose a section -> show recipes (vertical list)

const RECIPES = [
  {id:"r1",  t:"Spicy Tomato Pasta",   d:"Quick pasta with tomato-chilli sauce.",   time:"25 min", diff:"Easy",   tags:["Italian","Quick"],      ing:["Pasta","Tomatoes","Garlic","Chilli","Olive oil","Parmesan","Basil"], hue:0},
  {id:"r2",  t:"Red Pepper Shakshuka", d:"Eggs simmered in pepper-tomato sauce.",  time:"35 min", diff:"Medium", tags:["One-pan","Vegetarian"], ing:["Eggs","Peppers","Tomatoes","Onion","Cumin","Paprika"], hue:18},
  {id:"r3",  t:"Bibimbap Bowl",        d:"Rice bowl with veg and gochujang.",      time:"45 min", diff:"Medium", tags:["Bowl","Umami"],          ing:["Rice","Spinach","Carrot","Mushrooms","Egg","Gochujang"], hue:330},
  {id:"r4",  t:"Crispy Chicken Wrap",  d:"Crispy chicken wrap with smoky sauce.",  time:"30 min", diff:"Easy",   tags:["Lunch","Comfort"],       ing:["Chicken","Tortillas","Lettuce","Yoghurt","Paprika"], hue:350},
  {id:"r5",  t:"Garlic Butter Salmon", d:"Pan-seared salmon with garlic butter.",  time:"20 min", diff:"Easy",   tags:["Quick","Protein"],       ing:["Salmon","Butter","Garlic","Lemon","Parsley"], hue:8},
  {id:"r6",  t:"Smoky Bean Tacos",     d:"Fast tacos with smoky beans and lime.",  time:"20 min", diff:"Easy",   tags:["Vegetarian","Quick"],    ing:["Beans","Taco shells","Onion","Lime","Cumin"], hue:25},
  {id:"r7",  t:"Classic Burger",       d:"Juicy burger with onions and cheese.",   time:"35 min", diff:"Medium", tags:["Dinner","Comfort"],      ing:["Beef","Buns","Onion","Cheddar","Pickles"], hue:345},
  {id:"r8",  t:"Ramen-Style Soup",     d:"Comforting noodle soup with toppings.",  time:"30 min", diff:"Medium", tags:["Soup","Comfort"],        ing:["Noodles","Broth","Soy","Ginger","Egg"], hue:5},
  {id:"r9",  t:"Chocolate Mug Cake",   d:"Warm chocolate cake in minutes.",        time:"8 min",  diff:"Easy",   tags:["Dessert","Quick"],      ing:["Flour","Cocoa","Sugar","Milk","Butter"], hue:340},
  {id:"r10", t:"Caesar Salad",         d:"Crisp salad with sharp dressing.",       time:"15 min", diff:"Easy",   tags:["Salad","Classic"],      ing:["Romaine","Croutons","Parmesan","Garlic","Lemon"], hue:12},
  {id:"r11", t:"Paneer Tikka Skillet", d:"Spiced paneer and peppers, fast.",       time:"25 min", diff:"Medium", tags:["Vegetarian","Spiced"],   ing:["Paneer","Peppers","Onion","Yoghurt","Spices"], hue:20},
  {id:"r12", t:"Overnight Oats",       d:"Cold creamy oats with berries.",         time:"10 prep",diff:"Easy",   tags:["Breakfast","No-cook"],  ing:["Oats","Milk","Yoghurt","Berries","Honey"], hue:0},
];

const INSP = ["r1","r2","r5","r6","r9","r10","r12","r8"];
const TOP10 = ["r5","r1","r8","r3","r6","r2","r9","r7","r10","r11"];

const LS_RATE="ff_rate";
const LS_LIST="ff_list";

let currentId = null;
let currentPage = null;

const $ = s => document.querySelector(s);
const byId = id => RECIPES.find(r => r.id === id);

const get = (k,d)=>{ try{ return JSON.parse(localStorage.getItem(k)) ?? d; }catch{ return d; } };
const set = (k,v)=>localStorage.setItem(k, JSON.stringify(v));

const rate = id => (get(LS_RATE,{})[id] || 0);
const inList = id => get(LS_LIST,[]).includes(id);

function posterStyle(r){
  const h=r.hue||0;
  return `background:
    linear-gradient(135deg, rgba(229,9,20,.75), rgba(0,0,0,.35)),
    radial-gradient(420px 160px at 30% 20%, hsla(${h},90%,60%,.22), transparent 60%);`;
}

/* Preview strip (Option 2) */
function setFeatured(r){
  $("#fTitle").textContent = r.t;
  $("#fDesc").textContent  = r.d;
  $("#fTime").textContent  = r.time;
  $("#fDiff").textContent  = r.diff;
  $("#fRate").textContent  = "★ " + (rate(r.id) ? `${rate(r.id)}/5` : "—");
}

/* Create vertical item */
function makeItem(r){
  const div = document.createElement("div");
  div.className = "item";
  div.innerHTML = `
    <div class="poster" style="${posterStyle(r)}"></div>
    <div>
      <div class="itTitle">${escape(r.t)}</div>
      <div class="itMeta">${escape(r.time)} • ${escape(r.diff)} • ${escape(r.tags.join(", "))}</div>
    </div>
    <div class="itRate">★ ${rate(r.id) ? rate(r.id)+"/5" : "—"}</div>
  `;

  div.onclick = () => openRecipe(r.id);
  div.onmouseenter = () => setFeatured(r);
  return div;
}

function escape(s){
  return String(s).replace(/[&<>"]/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;" }[c]));
}

/* Render selected page */
function showPage(page){
  currentPage = page;

  // hide chooser, show section
  $("#section").hidden = false;
  document.querySelector(".choose").hidden = true;

  // title + clear button visibility
  const title = page === "inspiration" ? "Inspiration"
              : page === "top10" ? "Top 10"
              : "Your Choice";
  $("#sectionTitle").textContent = title;

  $("#clearList").hidden = page !== "yourchoice";

  // build list of recipe ids
  let ids = [];
  if (page === "inspiration") ids = INSP;
  if (page === "top10") ids = TOP10;
  if (page === "yourchoice") ids = get(LS_LIST, []);

  renderList(ids);

  // set featured to first visible item if possible
  const first = ids.map(byId).filter(Boolean)[0] || byId(INSP[0]);
  if (first) setFeatured(first);
}

/* Render vertical list with optional search */
function renderList(ids){
  const s = ($("#q").value || "").trim().toLowerCase();

  const recipes = ids
    .map(byId)
    .filter(Boolean)
    .filter(r => {
      if(!s) return true;
      const hay = (r.t+" "+r.d+" "+r.tags.join(" ")+" "+r.ing.join(" ")).toLowerCase();
      return hay.includes(s);
    });

  const list = $("#list");
  list.innerHTML = "";
  recipes.forEach(r => list.appendChild(makeItem(r)));

  const empty = $("#empty");
  if (currentPage === "yourchoice"){
    empty.hidden = recipes.length > 0;
  } else {
    empty.hidden = true;
  }
}

/* Back to choose screen */
function goBack(){
  $("#section").hidden = true;
  document.querySelector(".choose").hidden = false;
  $("#q").value = "";
  $("#list").innerHTML = "";
  $("#empty").hidden = true;
  currentPage = null;
}

/* Modal */
function openRecipe(id){
  const r = byId(id); if(!r) return;
  currentId = id;

  $("#mPoster").setAttribute("style", posterStyle(r));
  $("#mTitle").textContent = r.t;
  $("#mDesc").textContent  = r.d;
  $("#mTime").textContent  = r.time;
  $("#mDiff").textContent  = r.diff;
  $("#mTags").textContent  = r.tags.join(", ");

  const ul = $("#mIng");
  ul.innerHTML = "";
  r.ing.forEach(x=>{
    const li=document.createElement("li");
    li.textContent=x;
    ul.appendChild(li);
  });

  $("#toggleList").textContent = inList(id) ? "✓ In Your Choice (Remove)" : "+ Your Choice";
  renderStars();

  $("#recipeModal").classList.add("show");
  document.body.style.overflow="hidden";
}

function closeModal(){
  $("#recipeModal").classList.remove("show");
  document.body.style.overflow="";
  currentId = null;
}

function renderStars(){
  const wrap = $("#stars");
  wrap.innerHTML = "";
  const r = rate(currentId);

  for(let i=1;i<=5;i++){
    const b=document.createElement("button");
    b.className = "star" + (i<=r ? " on" : "");
    b.textContent = "★";
    b.onclick = ()=>setRating(i);
    wrap.appendChild(b);
  }
  $("#note").textContent = r ? `Your rating: ${r}/5` : "No rating yet.";
}

function setRating(v){
  const all = get(LS_RATE,{});
  all[currentId] = v;
  set(LS_RATE, all);

  renderStars();
  // refresh list ratings
  if(currentPage) renderList(pageIds());
  // refresh preview
  setFeatured(byId(currentId));
}

function toggleList(){
  const list = get(LS_LIST,[]);
  const i = list.indexOf(currentId);
  if(i>=0) list.splice(i,1);
  else list.unshift(currentId);
  set(LS_LIST, list);

  $("#toggleList").textContent = inList(currentId) ? "✓ In Your Choice (Remove)" : "+ Your Choice";

  // if viewing Your Choice page, refresh list
  if(currentPage === "yourchoice") renderList(get(LS_LIST,[]));
}

function pageIds(){
  if(currentPage === "inspiration") return INSP;
  if(currentPage === "top10") return TOP10;
  if(currentPage === "yourchoice") return get(LS_LIST,[]);
  return [];
}

/* Wire events */
document.querySelectorAll(".choice").forEach(btn=>{
  btn.onclick = () => showPage(btn.dataset.page);
});

$("#backBtn").onclick = goBack;

$("#q").oninput = () => renderList(pageIds());

$("#clearList").onclick = () => {
  set(LS_LIST, []);
  if(currentPage === "yourchoice") renderList([]);
};

$("#toggleList").onclick = toggleList;

document.addEventListener("click", (e)=>{
  if(e.target && e.target.getAttribute && e.target.getAttribute("data-close")) closeModal();
});
document.addEventListener("keydown", (e)=>{
  if(e.key === "Escape") closeModal();
});
