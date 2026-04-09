let currentId = null;

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
}

function toggleList(){
  const list = get(LS_LIST, []);
  const i = list.indexOf(currentId);

  if(i >= 0) list.splice(i, 1);
  else list.unshift(currentId);

  set(LS_LIST, list);
  $("#toggleList").textContent = inList(currentId) ? t("removeChoice") : t("addChoice");
}

function renderRecipe(){
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const recipe = byId(id);

  if(!recipe){
    $("#recipePage").hidden = true;
    $("#missingRecipe").hidden = false;
    return;
  }

  currentId = id;

  $("#recipePage").hidden = false;
  $("#missingRecipe").hidden = true;

  $("#mPoster").setAttribute("style", posterStyle(recipe));
  $("#mTitle").textContent = recipe.t;
  $("#mDesc").textContent = recipe.d;
  $("#mTime").textContent = recipe.time;
  $("#mDiff").textContent = recipe.diff;
  $("#mTags").textContent = recipe.tags.join(", ");

  const ul = $("#mIng");
  ul.innerHTML = "";

  recipe.ing.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });

  $("#toggleList").textContent = inList(currentId) ? t("removeChoice") : t("addChoice");
  renderStars();
}

function applyPageLanguage(){
  $("#backBtn").textContent = t("back");
  $("#ingredientsTitle").textContent = t("ingredients");
  $("#ratingTitle").textContent = t("rating");

  const missingTitle = $("#missingRecipe h2");
  const missingText = $("#missingRecipe p");

  if(missingTitle) missingTitle.textContent = t("recipeNotFound");
  if(missingText) missingText.textContent = t("recipeMissingText");

  if(currentId){
    $("#toggleList").textContent = inList(currentId) ? t("removeChoice") : t("addChoice");
    renderStars();
  }
}

$("#backBtn").onclick = () => {
  window.location.href = "index.html";
};

$("#toggleList").onclick = toggleList;

applyPageLanguage();
renderRecipe();
