let currentId = null;

function renderStars(){
  const wrap = $("#stars");
  if(!wrap || !currentId) return;

  wrap.innerHTML = "";

  const currentRating = rate(currentId);

  for(let i = 1; i <= 5; i++){
    const b = document.createElement("button");
    b.className = "star" + (i <= currentRating ? " on" : "");
    b.textContent = "★";
    b.type = "button";
    b.onclick = () => setRating(i);
    wrap.appendChild(b);
  }

  const note = $("#note");
  if(note){
    note.textContent = currentRating
      ? `${t("yourRating")} ${currentRating}/5`
      : t("noRating");
  }
}

function setRating(v){
  if(!currentId) return;

  const all = get(LS_RATE, {});
  all[currentId] = v;
  set(LS_RATE, all);
  renderStars();
}

function toggleList(){
  if(!currentId) return;

  const list = get(LS_LIST, []);
  const i = list.indexOf(currentId);

  if(i >= 0) {
    list.splice(i, 1);
  } else {
    list.unshift(currentId);
  }

  set(LS_LIST, list);

  const toggleBtn = $("#toggleList");
  if(toggleBtn){
    toggleBtn.textContent = inList(currentId) ? t("removeChoice") : t("addChoice");
  }
}

function renderRecipe(){
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const recipe = byId(id);

  const recipePage = $("#recipePage");
  const missingRecipe = $("#missingRecipe");

  if(!recipe){
    if(recipePage) recipePage.hidden = true;
    if(missingRecipe) missingRecipe.hidden = false;
    currentId = null;
    return;
  }

  currentId = id;

  if(recipePage) recipePage.hidden = false;
  if(missingRecipe) missingRecipe.hidden = true;

  const poster = $("#mPoster");
  if(poster){
    poster.innerHTML = "";
    poster.style.background = "none";

    const img = document.createElement("img");
    img.src = recipe.img;
    img.alt = recipe.t;
    img.className = "recipeImage";
    poster.appendChild(img);
  }

  if($("#mTitle")) $("#mTitle").textContent = recipe.t;
  if($("#mDesc")) $("#mDesc").textContent = recipe.d;
  if($("#mTime")) $("#mTime").textContent = recipe.time;
  if($("#mDiff")) $("#mDiff").textContent = recipe.diff;
  if($("#mTags")) $("#mTags").textContent = recipe.tags.join(", ");

  const ingList = $("#mIng");
if(ingList){
  ingList.innerHTML = "";

  const currentIngredients =
    recipe.ing &&
    recipe.ing[currentLang]
      ? recipe.ing[currentLang]
      : (recipe.ing && recipe.ing.da ? recipe.ing.da : []);

  currentIngredients.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    ingList.appendChild(li);
  });
}

  const stepsList = $("#mSteps");
if(stepsList){
  stepsList.innerHTML = "";

  const currentSteps =
    recipe.steps &&
    recipe.steps[currentLang]
      ? recipe.steps[currentLang]
      : (recipe.steps && recipe.steps.da ? recipe.steps.da : []);

  currentSteps.forEach(step => {
    const li = document.createElement("li");
    li.textContent = step;
    stepsList.appendChild(li);
  });
}

  const toggleBtn = $("#toggleList");
  if(toggleBtn){
    toggleBtn.textContent = inList(currentId) ? t("removeChoice") : t("addChoice");
  }

  renderStars();
}

function applyPageLanguage(){
  if($("#backBtn")) $("#backBtn").textContent = t("back");
  if($("#ingredientsTitle")) $("#ingredientsTitle").textContent = t("ingredients");
  if($("#howToTitle")) $("#howToTitle").textContent = currentLang === "da" ? "Sådan gør du" : "How to make";
  if($("#ratingTitle")) $("#ratingTitle").textContent = t("rating");

  const missingTitle = $("#missingRecipe h2");
  const missingText = $("#missingRecipe p");

  if(missingTitle) missingTitle.textContent = t("recipeNotFound");
  if(missingText) missingText.textContent = t("recipeMissingText");

  if(currentId){
    const toggleBtn = $("#toggleList");
    if(toggleBtn){
      toggleBtn.textContent = inList(currentId) ? t("removeChoice") : t("addChoice");
    }
    renderStars();
  }
}

if($("#backBtn")){
  $("#backBtn").onclick = () => {
    window.location.href = "index.html";
  };
}

if($("#toggleList")){
  $("#toggleList").onclick = toggleList;
}

applyPageLanguage();
renderRecipe();