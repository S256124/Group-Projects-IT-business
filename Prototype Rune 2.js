const RECIPES = [
  {id:"r1",  t:"Spicy Tomato Pasta",   d:"Hurtig pasta med tomat og chili.",              time:"25 min",  diff:"Easy",   tags:["Italian","Quick"],       ing:["Pasta","Tomater","Hvidløg","Chili","Olivenolie","Parmesan","Basilikum"], hue:0},
  {id:"r2",  t:"Red Pepper Shakshuka", d:"Æg i krydret tomat- og pebersauce.",            time:"35 min",  diff:"Medium", tags:["One-pan","Vegetarian"],  ing:["Æg","Peberfrugt","Tomater","Løg","Spidskommen","Paprika"], hue:18},
  {id:"r3",  t:"Bibimbap Bowl",        d:"Risret med grøntsager og gochujang.",           time:"45 min",  diff:"Medium", tags:["Bowl","Umami"],          ing:["Ris","Spinat","Gulerod","Svampe","Æg","Gochujang"], hue:330},
  {id:"r4",  t:"Crispy Chicken Wrap",  d:"Sprød chicken wrap med røget sauce.",           time:"30 min",  diff:"Easy",   tags:["Lunch","Comfort"],       ing:["Kylling","Tortillas","Salat","Yoghurt","Paprika"], hue:350},
  {id:"r5",  t:"Garlic Butter Salmon", d:"Laks stegt i hvidløgssmør.",                    time:"20 min",  diff:"Easy",   tags:["Quick","Protein"],       ing:["Laks","Smør","Hvidløg","Citron","Persille"], hue:8},
  {id:"r6",  t:"Smoky Bean Tacos",     d:"Hurtige tacos med bønner og lime.",             time:"20 min",  diff:"Easy",   tags:["Vegetarian","Quick"],    ing:["Bønner","Tacoskaller","Løg","Lime","Spidskommen"], hue:25},
  {id:"r7",  t:"Classic Burger",       d:"Saftig burger med løg og ost.",                 time:"35 min",  diff:"Medium", tags:["Dinner","Comfort"],      ing:["Oksekød","Boller","Løg","Cheddar","Pickles"], hue:345},
  {id:"r8",  t:"Ramen-Style Soup",     d:"Varm nudelsuppe med toppings.",                 time:"30 min",  diff:"Medium", tags:["Soup","Comfort"],        ing:["Nudler","Bouillon","Soja","Ingefær","Æg"], hue:5},
  {id:"r9",  t:"Chocolate Mug Cake",   d:"Varm chokoladekage på få minutter.",            time:"8 min",   diff:"Easy",   tags:["Dessert","Quick"],       ing:["Mel","Kakao","Sukker","Mælk","Smør"], hue:340},
  {id:"r10", t:"Caesar Salad",         d:"Sprød salat med klassisk dressing.",            time:"15 min",  diff:"Easy",   tags:["Salad","Classic"],       ing:["Romaine","Croutoner","Parmesan","Hvidløg","Citron"], hue:12},
  {id:"r11", t:"Paneer Tikka Skillet", d:"Krydret paneer med peberfrugt.",                time:"25 min",  diff:"Medium", tags:["Vegetarian","Spiced"],    ing:["Paneer","Peberfrugt","Løg","Yoghurt","Krydderier"], hue:20},
  {id:"r12", t:"Overnight Oats",       d:"Kolde cremede havregryn med bær.",              time:"10 min",  diff:"Easy",   tags:["Breakfast","No-cook"],   ing:["Havregryn","Mælk","Yoghurt","Bær","Honning"], hue:0},
];

const INSP = ["r1","r2","r5","r6","r9","r10","r12","r8"];
const TOP10 = ["r5","r1","r8","r3","r6","r2","r9","r7","r10","r11"];

const LS_RATE = "ff_rate";
const LS_LIST = "ff_list";
const LS_LANG = "ff_lang";
const LS_USERS = "ff_users";
const LS_ACTIVE_USER = "ff_active_user";

let currentId = null;
let currentPage = null;
let currentLang = localStorage.getItem(LS_LANG) || "da";

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const byId = (id) => RECIPES.find(r => r.id === id);

const get = (k, d) => {
  try {
    return JSON.parse(localStorage.getItem(k)) ?? d;
  } catch {
    return d;
  }
};

const set = (k, v) => localStorage.setItem(k, JSON.stringify(v));

const rate = (id) => get(LS_RATE, {})[id] || 0;
const inList = (id) => get(LS_LIST, []).includes(id);

const TEXT = {
  da: {
    chooseTitle: "Vælg en sektion",
    inspiration: "Inspiration",
    inspirationSub: "Idéer til at komme i gang",
    top10: "Top 10",
    top10Sub: "Mest populære opskrifter",
    yourchoice: "Your Choice",
    yourchoiceSub: "Dine gemte opskrifter",
    frontText: "Klar til at finde en opskrift? Søg efter navn eller ingredienser.",
    frontPlaceholder: "Søg efter opskrifter...",
    frontButton: "Søg",
    sectionPlaceholder: "Søg i denne sektion...",
    clear: "Clear",
    preview: "Preview:",
    previewDefault: "Hold musen over en opskrift for at se preview",
    noResults: "Ingen opskrifter fundet.",
    back: "← Tilbage til forsiden",
    ingredients: "Ingredienser",
    rating: "Vurdering",
    noRating: "Ingen vurdering endnu.",
    yourRating: "Din vurdering:",
    addChoice: "+ Your Choice",
    removeChoice: "✓ In Your Choice (Remove)",
    noSavedTitle: "Ingen gemte opskrifter",
    noSavedDesc: "Gem en opskrift for at se den her.",
    searchResults: "Søgeresultater",
    noSearchTitle: "Ingen resultater",
    noSearchDesc: "Prøv at søge efter en anden opskrift eller ingrediens.",
    userLoggedOut: "Ikke logget ind",
    userLoggedIn: "Logget ind som",
    email: "E-mail",
    password: "Adgangskode",
    createProfile: "Opret profil",
    login: "Log ind",
    logout: "Log ud",
    createSuccess: "Profil oprettet.",
    loginSuccess: "Du er nu logget ind.",
    loginFail: "Forkert e-mail eller adgangskode.",
    createFail: "E-mail findes allerede.",
    fillFields: "Udfyld e-mail og adgangskode.",
    loggedOutMessage: "Du er logget ud."
  },
  en: {
    chooseTitle: "Choose a section",
    inspiration: "Inspiration",
    inspirationSub: "Ideas to get started",
    top10: "Top 10",
    top10Sub: "Most popular recipes",
    yourchoice: "Your Choice",
    yourchoiceSub: "Your saved recipes",
    frontText: "Ready to find a recipe? Search by name or ingredients.",
    frontPlaceholder: "Search recipes...",
    frontButton: "Search",
    sectionPlaceholder: "Search in this section...",
    clear: "Clear",
    preview: "Preview:",
    previewDefault: "Hover a recipe to preview it",
    noResults: "No recipes found.",
    back: "← Back to front page",
    ingredients: "Ingredients",
    rating: "Rating",
    noRating: "No rating yet.",
    yourRating: "Your rating:",
    addChoice: "+ Your Choice",
    removeChoice: "✓ In Your Choice (Remove)",
    noSavedTitle: "No saved recipes",
    noSavedDesc: "Save a recipe to see it here.",
    searchResults: "Search Results",
    noSearchTitle: "No results",
    noSearchDesc: "Try searching for another recipe or ingredient.",
    userLoggedOut: "Not logged in",
    userLoggedIn: "Logged in as",
    email: "E-mail",
    password: "Password",
    createProfile: "Create profile",
    login: "Log in",
    logout: "Log out",
    createSuccess: "Profile created.",
    loginSuccess: "You are now logged in.",
    loginFail: "Wrong e-mail or password.",
    createFail: "E-mail already exists.",
    fillFields: "Fill in e-mail and password.",
    loggedOutMessage: "You are logged out."
  }
};

function t(key){
  return TEXT[currentLang][key] || key;
}

/* ---------- language ---------- */
function updateFlagButton(){
  $("#langBtn").textContent = currentLang === "da" ? "🇩🇰" : "🇬🇧";
}

function toggleLangDropdown(){
  const dd = $("#langDropdown");
  dd.hidden = !dd.hidden;
}

function closeLangDropdown(){
  $("#langDropdown").hidden = true;
}

/* ---------- user ---------- */
function getUsers(){
  return get(LS_USERS, []);
}

function setUsers(users){
  set(LS_USERS, users);
}

function getActiveUser(){
  return localStorage.getItem(LS_ACTIVE_USER) || "";
}

function setActiveUser(email){
  localStorage.setItem(LS_ACTIVE_USER, email);
}

function clearActiveUser(){
  localStorage.removeItem(LS_ACTIVE_USER);
}

function toggleUserDropdown(){
  const dd = $("#userDropdown");
  dd.hidden = !dd.hidden;
}

function closeUserDropdown(){
  $("#userDropdown").hidden = true;
}

function updateUserUI(){
  const activeUser = getActiveUser();
  const status = $("#userStatus");
  const message = $("#userMessage");
  const button = $("#accountBtn");

  if(activeUser){
    status.textContent = `${t("userLoggedIn")} ${activeUser}`;
  } else {
    status.textContent = t("userLoggedOut");
  }

  if(button){
    button.textContent = t("login");
  }

  if(!message.textContent){
    message.textContent = "";
  }
}

function createProfile(){
  const email = $("#emailInput").value.trim();
  const password = $("#passwordInput").value.trim();
  const message = $("#userMessage");

  if(!email || !password){
    message.textContent = t("fillFields");
    return;
  }

  const users = getUsers();
  const exists = users.find(u => u.email === email);

  if(exists){
    message.textContent = t("createFail");
    return;
  }

  users.push({ email, password });
  setUsers(users);
  message.textContent = t("createSuccess");
}

function loginUser(){
  const email = $("#emailInput").value.trim();
  const password = $("#passwordInput").value.trim();
  const message = $("#userMessage");

  if(!email || !password){
    message.textContent = t("fillFields");
    return;
  }

  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);

  if(!user){
    message.textContent = t("loginFail");
    return;
  }

  setActiveUser(email);
  message.textContent = t("loginSuccess");
  updateUserUI();
}

function logoutUser(){
  clearActiveUser();
  $("#userMessage").textContent = t("loggedOutMessage");
  updateUserUI();
}

/* ---------- recipes ---------- */
function posterStyle(r){
  const h = r.hue || 0;
  return `background:
    linear-gradient(135deg, rgba(229,9,20,.75), rgba(0,0,0,.35)),
    radial-gradient(420px 160px at 30% 20%, hsla(${h},90%,60%,.22), transparent 60%);`;
}

function setFeatured(r){
  $("#fTitle").textContent = r.t;
  $("#fDesc").textContent = r.d;
  $("#fTime").textContent = r.time;
  $("#fDiff").textContent = r.diff;
  $("#fRate").textContent = "★ " + (rate(r.id) ? `${rate(r.id)}/5` : "—");
}

function escapeHtml(s){
  return String(s).replace(/[&<>"]/g, c => ({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    '"':"&quot;"
  }[c]));
}

function makeItem(r){
  const item = document.createElement("li");
  item.className = "item";

  item.innerHTML = `
    <div class="poster" style="${posterStyle(r)}"></div>
    <div>
      <p class="itTitle">${escapeHtml(r.t)}</p>
      <p class="itMeta">${escapeHtml(r.time)} • ${escapeHtml(r.diff)} • ${escapeHtml(r.tags.join(", "))}</p>
    </div>
    <p class="itRate">★ ${rate(r.id) ? rate(r.id) + "/5" : "—"}</p>
  `;

  item.onclick = () => openRecipe(r.id);
  item.onmouseenter = () => setFeatured(r);

  return item;
}

function renderList(ids){
  const searchValue = ($("#q").value || "").trim().toLowerCase();

  const recipes = ids
    .map(byId)
    .filter(Boolean)
    .filter(r => {
      if(!searchValue) return true;
      const text = (r.t + " " + r.d + " " + r.tags.join(" ") + " " + r.ing.join(" ")).toLowerCase();
      return text.includes(searchValue);
    });

  const list = $("#list");
  list.innerHTML = "";

  recipes.forEach(r => list.appendChild(makeItem(r)));

  $("#empty").textContent = t("noResults");
  $("#empty").hidden = recipes.length > 0;
}

function showPage(page){
  currentPage = page;

  $("#choose").hidden = true;
  $("#section").hidden = false;
  $("#q").value = "";

  if(page === "inspiration"){
    $("#sectionTitle").textContent = t("inspiration");
    $("#clearList").hidden = true;
    renderList(INSP);
    setFeatured(byId(INSP[0]));
  }

  if(page === "top10"){
    $("#sectionTitle").textContent = t("top10");
    $("#clearList").hidden = true;
    renderList(TOP10);
    setFeatured(byId(TOP10[0]));
  }

  if(page === "yourchoice"){
    $("#sectionTitle").textContent = t("yourchoice");
    $("#clearList").hidden = false;
    $("#clearList").textContent = t("clear");

    const listIds = get(LS_LIST, []);
    renderList(listIds);

    const first = listIds.map(byId).filter(Boolean)[0];
    if(first){
      setFeatured(first);
    } else {
      $("#fTitle").textContent = t("noSavedTitle");
      $("#fDesc").textContent = t("noSavedDesc");
      $("#fTime").textContent = "—";
      $("#fDiff").textContent = "—";
      $("#fRate").textContent = "★ —";
    }
  }

  closeLangDropdown();
  closeUserDropdown();
}

function goBack(){
  $("#section").hidden = true;
  $("#choose").hidden = false;
  $("#list").innerHTML = "";
  $("#empty").hidden = true;
  $("#q").value = "";

  const front = $("#frontSearch");
  if(front) front.value = "";

  currentPage = null;
  closeLangDropdown();
  closeUserDropdown();
}

function runFrontSearch(){
  const input = $("#frontSearch");
  if(!input) return;

  const value = input.value.trim().toLowerCase();
  if(!value) return;

  const results = RECIPES
    .filter(r => {
      const text = (
        r.t + " " +
        r.d + " " +
        r.tags.join(" ") + " " +
        r.ing.join(" ")
      ).toLowerCase();

      return text.includes(value);
    })
    .map(r => r.id);

  currentPage = "search";

  $("#choose").hidden = true;
  $("#section").hidden = false;
  $("#sectionTitle").textContent = t("searchResults");
  $("#clearList").hidden = true;
  $("#q").value = "";

  const list = $("#list");
  list.innerHTML = "";

  results.map(byId).filter(Boolean).forEach(r => {
    list.appendChild(makeItem(r));
  });

  $("#empty").textContent = t("noResults");
  $("#empty").hidden = results.length > 0;

  const first = results.map(byId).filter(Boolean)[0];
  if(first){
    setFeatured(first);
  } else {
    $("#fTitle").textContent = t("noSearchTitle");
    $("#fDesc").textContent = t("noSearchDesc");
    $("#fTime").textContent = "—";
    $("#fDiff").textContent = "—";
    $("#fRate").textContent = "★ —";
  }

  closeLangDropdown();
  closeUserDropdown();
}

/* ---------- recipe modal ---------- */
function openRecipe(id){
  const r = byId(id);
  if(!r) return;

  currentId = id;

  $("#mPoster").setAttribute("style", posterStyle(r));
  $("#mTitle").textContent = r.t;
  $("#mDesc").textContent = r.d;
  $("#mTime").textContent = r.time;
  $("#mDiff").textContent = r.diff;
  $("#mTags").textContent = r.tags.join(", ");

  const ul = $("#mIng");
  ul.innerHTML = "";

  r.ing.forEach(x => {
    const li = document.createElement("li");
    li.textContent = x;
    ul.appendChild(li);
  });

  $("#toggleList").textContent = inList(id) ? t("removeChoice") : t("addChoice");

  renderStars();

  $("#recipeModal").classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeRecipeModal(){
  $("#recipeModal").classList.remove("show");
  document.body.style.overflow = "";
  currentId = null;
}

function renderStars(){
  const wrap = $("#stars");
  wrap.innerHTML = "";

  const currentRating = rate(currentId);

  for(let i = 1; i <= 5; i++){
    const b = document.createElement("button");
    b.className = "star" + (i <= currentRating ? " on" : "");
    b.textContent = "★";
    b.onclick = () => setRating(i);
    wrap.appendChild(b);
  }

  $("#note").textContent = currentRating
    ? `${t("yourRating")} ${currentRating}/5`
    : t("noRating");
}

function setRating(v){
  const all = get(LS_RATE, {});
  all[currentId] = v;
  set(LS_RATE, all);

  renderStars();

  if(currentPage === "inspiration") renderList(INSP);
  if(currentPage === "top10") renderList(TOP10);
  if(currentPage === "yourchoice") renderList(get(LS_LIST, []));
  if(currentPage === "search") runFrontSearch();

  const recipe = byId(currentId);
  if(recipe) setFeatured(recipe);
}

function toggleList(){
  const list = get(LS_LIST, []);
  const i = list.indexOf(currentId);

  if(i >= 0) list.splice(i, 1);
  else list.unshift(currentId);

  set(LS_LIST, list);

  $("#toggleList").textContent = inList(currentId) ? t("removeChoice") : t("addChoice");

  if(currentPage === "yourchoice"){
    renderList(get(LS_LIST, []));
  }
}

/* ---------- text ---------- */
function applyLanguage(){
  document.documentElement.lang = currentLang;
  updateFlagButton();

  $("#chooseTitle").textContent = t("chooseTitle");

  const choices = $$(".choice");
  if(choices[0]){
    choices[0].querySelector(".choiceTag").textContent = t("inspiration").toUpperCase();
    choices[0].querySelector(".choiceSub").textContent = t("inspirationSub");
  }
  if(choices[1]){
    choices[1].querySelector(".choiceTag").textContent = t("top10").toUpperCase();
    choices[1].querySelector(".choiceSub").textContent = t("top10Sub");
  }
  if(choices[2]){
    choices[2].querySelector(".choiceTag").textContent = t("yourchoice").toUpperCase();
    choices[2].querySelector(".choiceSub").textContent = t("yourchoiceSub");
  }

  $(".frontSearchText").textContent = t("frontText");
  $("#frontSearch").placeholder = t("frontPlaceholder");
  $("#frontSearchBtn").textContent = t("frontButton");

  $("#q").placeholder = t("sectionPlaceholder");
  $("#clearList").textContent = t("clear");
  $("#backBtn").textContent = t("back");

  $("#feature").querySelector("p span").textContent = t("preview");
  if(!currentPage){
    $("#fDesc").textContent = t("previewDefault");
  }

  const boxTitles = $$(".box h4");
  if(boxTitles[0]) boxTitles[0].textContent = t("ingredients");
  if(boxTitles[1]) boxTitles[1].textContent = t("rating");

  $("#toggleList").textContent = currentId && inList(currentId) ? t("removeChoice") : t("addChoice");

  $("#emailInput").placeholder = t("email");
  $("#passwordInput").placeholder = t("password");
  $$(".userLabel")[0].textContent = t("email");
  $$(".userLabel")[1].textContent = t("password");
  $("#createProfileBtn").textContent = t("createProfile");
  $("#loginBtn").textContent = t("login");
  $("#logoutBtn").textContent = t("logout");
  $("#accountBtn").textContent = t("login");

  if(currentPage === "inspiration") $("#sectionTitle").textContent = t("inspiration");
  if(currentPage === "top10") $("#sectionTitle").textContent = t("top10");
  if(currentPage === "yourchoice") $("#sectionTitle").textContent = t("yourchoice");
  if(currentPage === "search") $("#sectionTitle").textContent = t("searchResults");

  updateUserUI();
}

/* ---------- events ---------- */
document.querySelectorAll(".choice").forEach(btn => {
  btn.onclick = () => showPage(btn.dataset.page);
});

$("#backBtn").onclick = goBack;
$("#homeLogo").onclick = goBack;

$("#q").oninput = () => {
  if(currentPage === "inspiration") renderList(INSP);
  if(currentPage === "top10") renderList(TOP10);
  if(currentPage === "yourchoice") renderList(get(LS_LIST, []));
};

$("#clearList").onclick = () => {
  set(LS_LIST, []);
  if(currentPage === "yourchoice"){
    renderList([]);
    $("#fTitle").textContent = t("noSavedTitle");
    $("#fDesc").textContent = t("noSavedDesc");
    $("#fTime").textContent = "—";
    $("#fDiff").textContent = "—";
    $("#fRate").textContent = "★ —";
  }
};

$("#toggleList").onclick = toggleList;

$("#frontSearchForm").addEventListener("submit", (e) => {
  e.preventDefault();
  runFrontSearch();
});

/* language */
$("#langBtn").onclick = (e) => {
  e.stopPropagation();
  closeUserDropdown();
  toggleLangDropdown();
};

document.querySelectorAll(".langOption").forEach(btn => {
  btn.onclick = () => {
    currentLang = btn.dataset.lang;
    localStorage.setItem(LS_LANG, currentLang);
    applyLanguage();
    closeLangDropdown();
  };
});

/* user */
$("#accountBtn").onclick = (e) => {
  e.stopPropagation();
  closeLangDropdown();
  toggleUserDropdown();
};

$("#createProfileBtn").onclick = createProfile;
$("#loginBtn").onclick = loginUser;
$("#logoutBtn").onclick = logoutUser;

document.addEventListener("click", (e) => {
  if(e.target && e.target.getAttribute){
    if(e.target.getAttribute("data-close")) closeRecipeModal();
  }

  if(!e.target.closest(".langWrap")){
    closeLangDropdown();
  }

  if(!e.target.closest(".userWrap")){
    closeUserDropdown();
  }
});

document.addEventListener("keydown", (e) => {
  if(e.key === "Escape"){
    closeRecipeModal();
    closeLangDropdown();
    closeUserDropdown();
  }
});

applyLanguage();
